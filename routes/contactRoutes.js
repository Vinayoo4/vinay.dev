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
  body('name').notEmpty(),
  body('email').isEmail(),
  body('message').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const newMessage = new ContactMessage(req.body);
  await newMessage.save();
  res.status(201).json({ success: true, message: 'Message sent successfully' });
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