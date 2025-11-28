const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  meetingLink: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Service', 'Conference', 'Training', 'Youth Event', 'Special Program'],
    default: 'Service',
  },
  registrationRequired: {
    type: Boolean,
    default: false,
  },
  maxAttendees: {
    type: Number,
  },
  attendees: [{
    name: String,
    email: String,
    phone: String,
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', eventSchema);
