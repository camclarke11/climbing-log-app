const mongoose = require('mongoose');

const climbSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: String,
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Climb', climbSchema);
