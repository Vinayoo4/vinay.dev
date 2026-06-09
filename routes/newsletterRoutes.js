const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const auth = require('../middleware/auth');

const subscribeLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many subscription attempts. Please try again later.' },
});

const adminLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

/**
 * @route   POST /api/newsletter
 * @desc    Subscribe to newsletter
 * @access  Public
 */
router.post('/', subscribeLimit, [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { email } = req.body;

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'This email is already subscribed.' });
    }

    const subscription = new Newsletter({ email });
    await subscription.save();
    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ success: false, message: 'Subscription failed. Please try again.' });
  }
});

/**
 * @route   GET /api/newsletter
 * @desc    Get all subscribers (admin only)
 * @access  Private/Admin
 */
router.get('/', adminLimit, auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers' });
  }
});

module.exports = router;
