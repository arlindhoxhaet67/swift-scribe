/* 
Filename: AdvancedWebApp.js

This code is an advanced web application that performs various tasks 
like handling user authentication, managing user profiles, and implementing 
a real-time chat feature using web sockets. It also includes error handling, 
database interactions, and complex logic.

Note: This code is purely for demonstration purposes and may not execute 
successfully without the required dependencies and setup.

Author: Your Name
Date: MM/DD/YYYY
*/

// Import required packages
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// ... other required imports for your specific application

// Initialize the web application and socket server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to the database
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define mongoose schema and models for users and messages collection
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Define routes and middleware for user authentication
app.use(express.json());

// User registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists in the database
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Generate a JSON Web Token (JWT) for the new user
        const token = jwt.sign({ userId: newUser._id }, 'my-secret-key');

        res.json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// User login endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a JSON Web Token (JWT) for the authenticated user
        const token = jwt.sign({ userId: user._id }, 'my-secret-key');

        res.json({ message: 'User authenticated successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Chat functionality using web sockets
io.on('connection', (socket) => {
    // Handle new chat messages
    socket.on('chatMessage', async (messageData) => {
        try {
            const decodedToken = jwt.verify(messageData.token, 'my-secret-key');

            // Find the user associated with the provided token
            const user = await User.findById(decodedToken.userId);
            if (!user) {
                return socket.emit('error', 'Invalid token');
            }

            // Create a new message and save it to the database
            const newMessage = new Message({ sender: user._id, content: messageData.content });
            await newMessage.save();

            // Broadcast the message to all connected clients
            io.emit('chatMessage', {
                sender: user.username,
                content: messageData.content,
                timestamp: newMessage.timestamp
            });
        } catch (error) {
            socket.emit('error', 'Invalid token');
        }
    });

    // Handle client disconnections
    socket.on('disconnect', () => {
        // Perform necessary cleanups or logging
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ... other routes and logic for your web application