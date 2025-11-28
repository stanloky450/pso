const express = require('express');
const Comment = require('../models/Comment');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/comments/:postId
// @desc    Get all approved comments for a post
// @access  Public
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
      approved: true,
    }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/comments
// @desc    Create a new comment
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { postId, name, email, comment, parentId } = req.body;

    const newComment = await Comment.create({
      postId,
      name,
      email,
      comment,
      parentId,
      approved: false, // Requires admin approval
    });

    res.status(201).json({
      message: 'Comment submitted successfully. It will appear after approval.',
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/comments/admin/pending
// @desc    Get all pending comments
// @access  Private (Admin)
router.get('/admin/pending', protect, authorize('admin'), async (req, res) => {
  try {
    const comments = await Comment.find({ approved: false })
      .populate('postId', 'title')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/comments/:id/approve
// @desc    Approve a comment
// @access  Private (Admin)
router.put('/:id/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
