const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const ContactMessage = require('../models/ContactMessage');

/**
 * @route   POST /api/contact
 * @desc    Submit a new contact message
 * @access  Public
 */
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newMessage = new ContactMessage(req.body);
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages (protected route for admin)
 * @access  Private/Admin
 */
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied. Admin only.' });
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.status(200).json(messages);
});

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete a contact message
 * @access  Private/Admin
 */
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied. Admin only.' });
  const message = await ContactMessage.findById(req.params.id);
  if (!message) return res.status(404).json({ message: 'Message not found' });
  await message.deleteOne();
  res.status(200).json({ success: true, message: 'Message deleted successfully' });
});

module.exports = router;