const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    required: true, 
    trim: true,
  },
  file: {
    type: String, 
    required: true,
  }
});

const User = mongoose.model('User', userSchema);
const File = mongoose.model('File', audioSchema);

module.exports = User
