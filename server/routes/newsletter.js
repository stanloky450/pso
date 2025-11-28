const express = require('express');
const Newsletter = require('../models/Newsletter');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });

    if (existing) {
      if (existing.subscribed) {
        return res.status(400).json({ message: 'Already subscribed to newsletter' });
      } else {
        // Resubscribe
        existing.subscribed = true;
        existing.subscribedAt = Date.now();
        existing.unsubscribedAt = null;
        await existing.save();
        return res.json({ message: 'Successfully resubscribed to newsletter!' });
      }
    }

    // Create new subscription
    await Newsletter.create({ email, name });

    res.status(201).json({
      message: 'Successfully subscribed to newsletter!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const subscription = await Newsletter.findOne({ email });

    if (!subscription) {
      return res.status(404).json({ message: 'Email not found in newsletter' });
    }

    subscription.subscribed = false;
    subscription.unsubscribedAt = Date.now();
    await subscription.save();

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/newsletter
// @desc    Get all subscribers
// @access  Private (Admin)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { subscribed = true, limit = 50, page = 1 } = req.query;

    const query = { subscribed: subscribed === 'true' };

    const subscribers = await Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Newsletter.countDocuments(query);

    res.json({
      subscribers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
