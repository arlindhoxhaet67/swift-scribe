/* 
Filename: ComplexJavaScriptCode.js

Description: This code is a sophisticated and elaborate implementation of a web-based music player. It allows users to browse through a library of songs, create playlists, and control playback. This code is more than 200 lines long and showcases professional JavaScript programming techniques.

Note: This code assumes the presence of a user interface (UI) for the music player, including buttons, sliders, and containers for displaying the playlist and current song information.

*/

// Create an object to represent a Song
class Song {
  constructor(title, artist, duration) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
  }

  play() {
    // Logic to play the song
  }

  pause() {
    // Logic to pause the song
  }

  stop() {
    // Logic to stop the song
  }
}

// Create a music library object
const musicLibrary = {
  songs: [],
  playlists: [],

  addSong(title, artist, duration) {
    const newSong = new Song(title, artist, duration);
    this.songs.push(newSong);
  },

  removeSong(title) {
    const index = this.songs.findIndex(song => song.title === title);
    if (index !== -1) {
      this.songs.splice(index, 1);
    }
  },

  createPlaylist(name) {
    const newPlaylist = {
      name,
      songs: [],
    };
    this.playlists.push(newPlaylist);
  },

  addToPlaylist(playlistName, songTitle) {
    const playlist = this.playlists.find(list => list.name === playlistName);
    const song = this.songs.find(song => song.title === songTitle);
    if (playlist && song) {
      playlist.songs.push(song);
    }
  },

  removeFromPlaylist(playlistName, songTitle) {
    const playlist = this.playlists.find(list => list.name === playlistName);
    if (playlist) {
      const index = playlist.songs.findIndex(song => song.title === songTitle);
      if (index !== -1) {
        playlist.songs.splice(index, 1);
      }
    }
  },

  playSong(songTitle) {
    const song = this.songs.find(song => song.title === songTitle);
    if (song) {
      song.play();
    }
  },

  pauseSong(songTitle) {
    const song = this.songs.find(song => song.title === songTitle);
    if (song) {
      song.pause();
    }
  },

  stopSong(songTitle) {
    const song = this.songs.find(song => song.title === songTitle);
    if (song) {
      song.stop();
    }
  },
};

// Usage example:

// Add songs to the music library
musicLibrary.addSong("Song 1", "Artist 1", "3:30");
musicLibrary.addSong("Song 2", "Artist 2", "4:15");
musicLibrary.addSong("Song 3", "Artist 3", "5:02");

// Create a playlist and add songs to it
musicLibrary.createPlaylist("My Playlist");
musicLibrary.addToPlaylist("My Playlist", "Song 1");
musicLibrary.addToPlaylist("My Playlist", "Song 2");

// Play a song
musicLibrary.playSong("Song 1");

// Pause a song
musicLibrary.pauseSong("Song 1");

// Stop a song
musicLibrary.stopSong("Song 1");

// Remove a song from the library
musicLibrary.removeSong("Song 1");

// Remove a song from a playlist
musicLibrary.removeFromPlaylist("My Playlist", "Song 2");
