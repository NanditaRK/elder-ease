// backend/models/User.js
export {};

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['user', 'caregiver'], default: 'user' },
});

module.exports = mongoose.model('User', userSchema);
