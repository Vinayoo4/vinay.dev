const express = require('express');
const { body, validationResult } = require('express-validator');
const ChatMessage = require('../models/ChatMessage');
const router = express.Router();

/**
 * @route   GET /api/chat
 * @desc    Get all chat messages
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

/**
 * @route   POST /api/chat
 * @desc    Send a new chat message
 * @access  Public
 */
router.post('/', [
  body('user').notEmpty(),
  body('message').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { user, message } = req.body;
    const newMessage = new ChatMessage({ user, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error('Error saving chat message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

/**
 * @route   GET /api/chat/rooms/list
 * @desc    Get list of available chat rooms (static for now)
 * @access  Public
 */
router.get('/rooms/list', async (req, res) => {
  try {
    const rooms = [
      { id: "general", name: "General", description: "General discussion" },
      { id: "tech", name: "Technology", description: "Tech discussions" },
      { id: "finance", name: "Finance", description: "Financial topics" },
      { id: "design", name: "Design", description: "Design and UI/UX discussions" }
    ];
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch rooms' });
  }
});

module.exports = router;