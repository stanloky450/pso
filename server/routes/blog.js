const express = require('express');
const BlogPost = require('../models/BlogPost');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;

    const query = { published: true };
    if (category && category !== 'All') {
      query.category = category;
    }

    const posts = await BlogPost.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await BlogPost.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/blog/:id
// @desc    Get single blog post
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/blog
// @desc    Create a blog post
// @access  Private (Admin/Editor)
router.post('/', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const { title, excerpt, content, category, featuredImage, tags, published } = req.body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;

    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      category,
      featuredImage,
      tags,
      published,
      readTime,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/blog/:id
// @desc    Update a blog post
// @access  Private (Admin/Editor)
router.put('/:id', protect, authorize('admin', 'editor'), async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete a blog post
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
