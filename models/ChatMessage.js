const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  room: { type: String, default: 'general', index: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a compound index on room and created_at for sorted queries
ChatMessageSchema.index({ room: 1, createdAt: 1 });

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);