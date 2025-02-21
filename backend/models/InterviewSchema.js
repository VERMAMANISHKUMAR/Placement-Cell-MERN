// models/Interview.js
const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batch: { type: String, required: true },
  interviewerName: { type: String, required: true },
  interviewTime: { type: Date, required: true },
  link: { type: String, required: true },
  students: { type: Array, default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
