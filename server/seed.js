const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Import models
const User = require('./models/User');
const BlogPost = require('./models/BlogPost');
const Event = require('./models/Event');
const Newsletter = require('./models/Newsletter');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pastor-ministry', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await BlogPost.deleteMany({});
    await Event.deleteMany({});
    await Newsletter.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Create Users with different roles
    console.log('👥 Creating users...');

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@pso.com',
      password: 'admin123',
      role: 'admin',
      isActive: true,
    });
    console.log('✅ Admin user created:', adminUser.email);

    const editorUser = await User.create({
      name: 'Editor User',
      email: 'editor@pso.com',
      password: 'editor123',
      role: 'editor',
      isActive: true,
    });
    console.log('✅ Editor user created:', editorUser.email);

    const regularUser = await User.create({
      name: 'Regular User',
      email: 'user@pso.com',
      password: 'user123',
      role: 'user',
      isActive: true,
    });
    console.log('✅ Regular user created:', regularUser.email);
    console.log('');

    // Create Sample Blog Posts
    console.log('📝 Creating blog posts...');

    const blogPosts = [
      {
        title: 'Walking in Purpose: Discovering God\'s Plan for Your Life',
        slug: 'walking-in-purpose',
        excerpt: 'God has a unique plan and purpose for each of us. Learn how to discover and walk in your divine calling with confidence and clarity.',
        content: '<p>God has a unique plan and purpose for each of us...</p>',
        category: 'Devotional',
        author: adminUser._id,
        published: true,
        readTime: '5 min read',
      },
      {
        title: 'The Power of Faith in Difficult Times',
        slug: 'power-of-faith',
        excerpt: 'When challenges arise, our faith becomes our anchor. Explore how to maintain unwavering faith during trials and tribulations.',
        content: '<p>When challenges arise, our faith becomes our anchor...</p>',
        category: 'Teaching',
        author: editorUser._id,
        published: true,
        readTime: '7 min read',
      },
      {
        title: 'Building a Strong Foundation: The Importance of Prayer',
        slug: 'importance-of-prayer',
        excerpt: 'Prayer is the foundation of our relationship with God. Discover how to develop a powerful prayer life that transforms everything.',
        content: '<p>Prayer is the foundation of our relationship with God...</p>',
        category: 'Prophetic',
        author: adminUser._id,
        published: true,
        readTime: '6 min read',
      },
    ];

    for (const post of blogPosts) {
      const created = await BlogPost.create(post);
      console.log(`✅ Blog post created: ${created.title}`);
    }
    console.log('');

    // Create Sample Events
    console.log('📅 Creating events...');

    const events = [
      {
        title: 'Sunday Service - First Service',
        description: 'Join us for our first Sunday service filled with worship, teaching, and powerful encounters with God.',
        startDate: new Date('2025-12-07T08:00:00'),
        endDate: new Date('2025-12-07T10:00:00'),
        location: 'RCCG Jesus Embassy, Lagos',
        isOnline: false,
        category: 'Service',
        registrationRequired: false,
        createdBy: adminUser._id,
      },
      {
        title: 'International Youth Convention 2025',
        description: 'A life-transforming gathering of young people from across the world for worship, teaching, and divine encounters.',
        startDate: new Date('2025-12-15T09:00:00'),
        endDate: new Date('2025-12-17T18:00:00'),
        location: 'Redemption Camp, Lagos-Ibadan Expressway',
        isOnline: true,
        meetingLink: 'https://youtube.com/live/...',
        category: 'Youth Event',
        registrationRequired: true,
        maxAttendees: 10000,
        createdBy: adminUser._id,
      },
      {
        title: 'SHIFT Talent Hunt Auditions',
        description: 'Showcase your God-given talents! Open auditions for singers, dancers, poets, and more.',
        startDate: new Date('2025-12-20T14:00:00'),
        endDate: new Date('2025-12-20T18:00:00'),
        location: 'RCCG Jesus Embassy, Lagos',
        isOnline: false,
        category: 'Special Program',
        registrationRequired: true,
        maxAttendees: 200,
        createdBy: editorUser._id,
      },
    ];

    for (const event of events) {
      const created = await Event.create(event);
      console.log(`✅ Event created: ${created.title}`);
    }
    console.log('');

    // Create Sample Newsletter Subscribers
    console.log('📧 Creating newsletter subscribers...');

    const subscribers = [
      { email: 'subscriber1@example.com', name: 'John Doe', subscribed: true },
      { email: 'subscriber2@example.com', name: 'Jane Smith', subscribed: true },
      { email: 'subscriber3@example.com', name: 'Mike Johnson', subscribed: true },
    ];

    for (const subscriber of subscribers) {
      const created = await Newsletter.create(subscriber);
      console.log(`✅ Subscriber created: ${created.email}`);
    }
    console.log('');

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📋 Summary:');
    console.log(`   - Users: ${await User.countDocuments()}`);
    console.log(`   - Blog Posts: ${await BlogPost.countDocuments()}`);
    console.log(`   - Events: ${await Event.countDocuments()}`);
    console.log(`   - Newsletter Subscribers: ${await Newsletter.countDocuments()}`);
    console.log('');
    console.log('🔐 Login Credentials:');
    console.log('   Admin:  admin@pso.com / admin123');
    console.log('   Editor: editor@pso.com / editor123');
    console.log('   User:   user@pso.com / user123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
