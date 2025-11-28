const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const BlogPost = require('../models/BlogPost');
const Contact = require('../models/Contact');
const User = require('../models/User');
const Event = require('../models/Event');
const Newsletter = require('../models/Newsletter');
const Comment = require('../models/Comment');

// @route   GET /api/analytics
// @desc    Get comprehensive analytics data
// @access  Admin & Editor
router.get('/', protect, authorize('editor'), async (req, res) => {
  try {
    const { range = '30d' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate = new Date();

    switch (range) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Blog Posts Stats
    const totalPosts = await BlogPost.countDocuments();
    const publishedPosts = await BlogPost.countDocuments({ published: true });
    const draftPosts = await BlogPost.countDocuments({ published: false });
    const recentPosts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('title views likes createdAt')
      .lean();

    // Comments Stats
    const totalComments = await Comment.countDocuments();
    const approvedComments = await Comment.countDocuments({ approved: true });
    const pendingComments = await Comment.countDocuments({ approved: false });

    // Messages Stats
    const totalMessages = await Contact.countDocuments();
    const unreadMessages = await Contact.countDocuments({ read: false });
    const recentMessages = await Contact.countDocuments({
      createdAt: { $gte: startDate },
    });

    // Users Stats
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminCount = await User.countDocuments({ role: 'admin' });
    const editorCount = await User.countDocuments({ role: 'editor' });
    const userCount = await User.countDocuments({ role: 'user' });

    // Subscribers Stats
    const totalSubscribers = await Newsletter.countDocuments();
    const activeSubscribers = await Newsletter.countDocuments({ subscribed: true });
    const recentSubscribers = await Newsletter.countDocuments({
      createdAt: { $gte: startDate },
    });

    // Events Stats
    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({
      startDate: { $gte: now },
    });
    const pastEvents = await Event.countDocuments({
      startDate: { $lt: now },
    });

    // Add comments count to recent posts
    const postsWithComments = await Promise.all(
      recentPosts.map(async (post) => {
        const commentCount = await Comment.countDocuments({
          postId: post._id,
          approved: true,
        });
        return {
          ...post,
          comments: commentCount,
        };
      })
    );

    // User growth data (monthly)
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 },
    ]);

    // Subscriber growth data (monthly)
    const subscriberGrowth = await Newsletter.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 },
    ]);

    // Format growth data
    const formatGrowthData = (data) => {
      return data.map((item) => ({
        month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
        count: item.count,
      }));
    };

    // Engagement metrics
    const totalViews = recentPosts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalLikes = recentPosts.reduce((sum, post) => sum + (post.likes || 0), 0);
    const avgEngagement = recentPosts.length > 0
      ? ((totalLikes + totalComments) / recentPosts.length).toFixed(2)
      : 0;

    // Response object
    const analytics = {
      // Blog stats
      totalPosts,
      publishedPosts,
      draftPosts,
      recentPosts: postsWithComments,

      // Comments stats
      totalComments,
      approvedComments,
      pendingComments,

      // Messages stats
      totalMessages,
      unreadMessages,
      recentMessages,

      // Users stats
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      adminCount,
      editorCount,
      userCount,

      // Subscribers stats
      totalSubscribers,
      activeSubscribers,
      recentSubscribers,

      // Events stats
      totalEvents,
      upcomingEvents,
      pastEvents,

      // Growth data
      userGrowth: formatGrowthData(userGrowth),
      subscriberGrowth: formatGrowthData(subscriberGrowth),

      // Engagement metrics
      totalViews,
      totalLikes,
      avgEngagement,

      // Metadata
      dateRange: {
        start: startDate,
        end: now,
        range,
      },
    };

    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/analytics/dashboard
// @desc    Get quick dashboard stats
// @access  Admin & Editor
router.get('/dashboard', protect, authorize('editor'), async (req, res) => {
  try {
    const totalPosts = await BlogPost.countDocuments();
    const totalMessages = await Contact.countDocuments({ read: false });
    const totalUsers = await User.countDocuments();
    const totalSubscribers = await Newsletter.countDocuments({ subscribed: true });

    res.json({
      posts: totalPosts,
      messages: totalMessages,
      users: totalUsers,
      subscribers: totalSubscribers,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
