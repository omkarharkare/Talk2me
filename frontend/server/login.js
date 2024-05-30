const mongoose = require('mongoose');

const login = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  audio: {
    data: Buffer, // Store the audio file data as a Buffer
    contentType: String // Specify the content type of the audio file
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', login);

module.exports = User
