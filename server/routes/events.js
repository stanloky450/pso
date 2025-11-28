const express = require('express');
const Event = require('../models/Event');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all upcoming events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;

    const query = {
      endDate: { $gte: new Date() }, // Only upcoming/ongoing events
    };

    if (category) {
      query.category = category;
    }

    const events = await Event.find(query)
      .sort({ startDate: 1 })
      .limit(limit * 1)
      .exec();

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Admin/Editor)
router.post('/', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const event = await Event.create(eventData);

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Admin/Editor)
router.put('/:id', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event
// @access  Public
router.post('/:id/register', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!event.registrationRequired) {
      return res.status(400).json({ message: 'Registration not required for this event' });
    }

    // Check if already registered
    const alreadyRegistered = event.attendees.some(
      (attendee) => attendee.email === email
    );

    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check max attendees
    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ message: 'Event is fully booked' });
    }

    event.attendees.push({ name, email, phone });
    await event.save();

    res.json({ message: 'Successfully registered for the event!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
