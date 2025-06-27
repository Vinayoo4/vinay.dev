const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create an index on room_id for faster queries
ChatMessageSchema.index({ room_id: 1 });

// Create a compound index on created_at and room_id for sorted queries
ChatMessageSchema.index({ room_id: 1, created_at: 1 });

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);