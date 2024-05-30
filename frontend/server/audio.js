const mongoose = require('mongoose');

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

const Audio = mongoose.model('Audio', audioSchema);