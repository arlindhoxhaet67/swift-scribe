/* Filename: ComplexCode.js
   Description: This code demonstrates a complex JavaScript application for managing a virtual bookstore.
*/

// Book class representing a book object
class Book {
  constructor(title, author, price) {
    this.title = title;
    this.author = author;
    this.price = price;
  }

  getInfo() {
    return `${this.title} by ${this.author}. Price: ${this.price}`;
  }
}

// Store class representing the virtual bookstore
class Store {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  findBooksByAuthor(author) {
    return this.books.filter(book => book.author === author);
  }

  findBooksByTitle(title) {
    return this.books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  }

  findBooksByPriceRange(minPrice, maxPrice) {
    return this.books.filter(book => book.price >= minPrice && book.price <= maxPrice);
  }
}

// Instantiate bookstore and add books
const bookstore = new Store("My Virtual Bookstore");

const book1 = new Book("The Catcher in the Rye", "J.D. Salinger", 15.99);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 12.99);
const book3 = new Book("1984", "George Orwell", 14.99);

bookstore.addBook(book1);
bookstore.addBook(book2);
bookstore.addBook(book3);

// Search and display results
console.log(`--- Books by Author ---`);
const booksByAuthor = bookstore.findBooksByAuthor("J.D. Salinger");
booksByAuthor.forEach(book => console.log(book.getInfo()));

console.log(`--- Books by Title ---`);
const booksByTitle = bookstore.findBooksByTitle("kill");
booksByTitle.forEach(book => console.log(book.getInfo()));

console.log(`--- Books by Price Range ---`);
const booksByPriceRange = bookstore.findBooksByPriceRange(10, 15);
booksByPriceRange.forEach(book => console.log(book.getInfo()));

// Output sample:
// --- Books by Author ---
// The Catcher in the Rye by J.D. Salinger. Price: 15.99
// --- Books by Title ---
// To Kill a Mockingbird by Harper Lee. Price: 12.99
// --- Books by Price Range ---
// The Catcher in the Rye by J.D. Salinger. Price: 15.99
// To Kill a Mockingbird by Harper Lee. Price: 12.99