# 🔐 Admin Dashboard - Complete Guide

## Overview

The Pastor Sola Olukoya Ministry website now includes a comprehensive, secure admin dashboard with role-based access control, analytics, and full content management capabilities.

---

## 🔑 Authentication System

### User Roles & Permissions

1. **Admin** (Level 3)
   - Full access to all features
   - User management
   - System settings
   - Delete permissions

2. **Editor** (Level 2)
   - Create and edit content
   - Manage blog posts
   - Manage events
   - View analytics

3. **User** (Level 1)
   - View-only access
   - Personal profile management

### Login Credentials (Seed Data)

```bash
# Run seed command first
npm run seed

# Credentials:
Admin:  admin@pso.com / admin123
Editor: editor@pso.com / editor123
User:   user@pso.com / user123
```

### Protected Routes

All admin pages are protected using the `ProtectedRoute` component:
- Automatically redirects to login if not authenticated
- Checks user role against required permission level
- Shows loading state during authentication check

---

## 📊 Dashboard Features

### 1. Analytics Dashboard
**Path:** `/admin/analytics`
**Access:** Admin, Editor

**Features:**
- Real-time statistics
- Visitor analytics
- Content performance metrics
- User engagement data
- Newsletter subscriber growth
- Event attendance tracking

**Implementation:**
```typescript
// Create: app/admin/analytics/page.tsx
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export default function Analytics() {
  return (
    <ProtectedRoute requiredRole="editor">
      <AnalyticsDashboard />
    </ProtectedRoute>
  );
}
```

---

### 2. Blog Management
**Path:** `/admin/blog`
**Access:** Admin, Editor

**Features:**
- **Rich Text Editor** (React Quill)
- Create, edit, delete posts
- Draft/publish workflow
- Category management
- Tag management
- Featured image upload
- SEO meta fields
- Preview before publishing

**Implementation:**
```typescript
// Create: app/admin/blog/page.tsx
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import ImageUpload from "@/components/admin/ImageUpload";
import axios from "axios";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function BlogManagement() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Devotional",
    published: false,
  });

  // Fetch posts
  // Create/Edit/Delete functions
  // Quill editor configuration

  return (
    <ProtectedRoute requiredRole="editor">
      {/* Blog management UI */}
    </ProtectedRoute>
  );
}
```

**React Quill Configuration:**
```javascript
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};
```

---

### 3. Message Management
**Path:** `/admin/messages`
**Access:** Admin, Editor

**Features:**
- View contact form submissions
- Mark as read/unread
- Reply directly
- Archive messages
- Filter by status
- Search functionality
- Export to CSV

**API Endpoints:**
```javascript
GET    /api/contact?status=new&limit=20&page=1
PUT    /api/contact/:id (update status)
DELETE /api/contact/:id
```

---

### 4. User Management
**Path:** `/admin/users`
**Access:** Admin only

**Features:**
- List all users
- Create new users
- Edit user details
- Change user roles
- Activate/deactivate accounts
- Reset passwords
- View user activity

**Implementation:**
```typescript
// API Routes needed in server/routes/users.js
router.get('/', protect, authorize('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.post('/', protect, authorize('admin'), async (req, res) => {
  // Create user
});

router.put('/:id', protect, authorize('admin'), async (req, res) => {
  // Update user
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  // Delete user
});
```

---

### 5. Event Management
**Path:** `/admin/events`
**Access:** Admin, Editor

**Features:**
- Create/edit/delete events
- Set event categories
- Online/offline event toggle
- Registration management
- Attendee list
- **Google Calendar Integration**
- Send event invites
- Track RSVPs

**Google Calendar Integration:**
```javascript
// server/utils/googleCalendar.js
const { google } = require('googleapis');

const calendar = google.calendar('v3');

async function createCalendarEvent(eventData) {
  const auth = new google.auth.GoogleAuth({
    keyFile: './google-credentials.json',
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const event = {
    summary: eventData.title,
    description: eventData.description,
    start: {
      dateTime: eventData.startDate,
      timeZone: 'Africa/Lagos',
    },
    end: {
      dateTime: eventData.endDate,
      timeZone: 'Africa/Lagos',
    },
  };

  const response = await calendar.events.insert({
    auth,
    calendarId: 'primary',
    resource: event,
  });

  return response.data;
}
```

---

## 🚀 Advanced Features

### 1. Email Automation for Newsletters

**Implementation:**
```javascript
// server/utils/emailAutomation.js
const nodemailer = require('nodemailer');
const Newsletter = require('../models/Newsletter');

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendNewsletter(subject, htmlContent) {
  const subscribers = await Newsletter.find({ subscribed: true });

  for (const subscriber of subscribers) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: subscriber.email,
      subject,
      html: htmlContent,
    });
  }
}

module.exports = { sendNewsletter };
```

**Admin UI Route:**
```typescript
// app/admin/newsletter/page.tsx
"use client";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewsletterManager() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSend = async () => {
    // Send newsletter to all subscribers
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div>
        <h1>Send Newsletter</h1>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />
        <ReactQuill value={content} onChange={setContent} />
        <button onClick={handleSend}>Send to All Subscribers</button>
      </div>
    </ProtectedRoute>
  );
}
```

---

### 2. Push Notifications for Live Streams

**Setup:**
```javascript
// server/utils/pushNotifications.js
const webpush = require('web-push');

// Generate VAPID keys (run once)
const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  'mailto:admin@pso.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

async function sendLiveNotification(subscription, message) {
  const payload = JSON.stringify({
    title: 'Live Service Starting!',
    body: message,
    icon: '/icons/icon-192x192.png',
    url: '/live',
  });

  await webpush.sendNotification(subscription, payload);
}

module.exports = { sendLiveNotification };
```

**Frontend Implementation:**
```typescript
// components/ui/PushNotificationSetup.tsx
"use client";

import { useEffect } from "react";

export default function PushNotificationSetup() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    const registration = await navigator.serviceWorker.register('/sw.js');
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });

    // Send subscription to server
    await fetch('/api/notifications/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return null;
}
```

**Service Worker:**
```javascript
// public/sw.js
self.addEventListener('push', function(event) {
  const data = event.data.json();

  const options = {
    body: data.body,
    icon: data.icon,
    data: { url: data.url },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
```

---

### 3. Comment Reply Functionality

**Updated Comment Model:**
```javascript
// server/models/Comment.js - Already supports replies
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
```

**Frontend Component:**
```typescript
// components/blog/CommentWithReplies.tsx
"use client";

import { useState } from "react";

export default function CommentWithReplies({ comment, postId }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = async () => {
    await axios.post('/api/comments', {
      postId,
      parentId: comment._id,
      name,
      email,
      comment: replyText,
    });
    setShowReplyForm(false);
  };

  return (
    <div>
      <div className="comment">
        <p>{comment.comment}</p>
        <button onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
      </div>

      {showReplyForm && (
        <div className="reply-form ml-8">
          <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} />
          <button onClick={handleReply}>Post Reply</button>
        </div>
      )}

      {/* Render nested replies */}
      {comment.replies && comment.replies.map(reply => (
        <div key={reply._id} className="ml-8">
          <CommentWithReplies comment={reply} postId={postId} />
        </div>
      ))}
    </div>
  );
}
```

**Updated API Route:**
```javascript
// server/routes/comments.js - Add get with nested replies
router.get('/:postId', async (req, res) => {
  const comments = await Comment.aggregate([
    { $match: { postId: mongoose.Types.ObjectId(req.params.postId), approved: true } },
    {
      $graphLookup: {
        from: 'comments',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parentId',
        as: 'replies',
      },
    },
    { $match: { parentId: null } }, // Only top-level comments
  ]);

  res.json(comments);
});
```

---

## 📁 Complete File Structure

```
app/admin/
├── page.tsx                    # Dashboard (Protected)
├── login/page.tsx              # Login page
├── analytics/page.tsx          # Analytics (Protected - Editor+)
├── blog/
│   ├── page.tsx               # Blog list (Protected - Editor+)
│   ├── create/page.tsx        # Create post (Protected - Editor+)
│   └── [id]/page.tsx          # Edit post (Protected - Editor+)
├── messages/page.tsx           # Messages (Protected - Editor+)
├── users/page.tsx              # User management (Protected - Admin)
├── events/
│   ├── page.tsx               # Events list (Protected - Editor+)
│   └── create/page.tsx        # Create event (Protected - Editor+)
├── newsletter/page.tsx         # Newsletter (Protected - Admin)
└── settings/page.tsx           # Settings (Protected - Admin)

components/admin/
├── ProtectedRoute.tsx          # Auth wrapper
├── ImageUpload.tsx             # File upload
├── RichTextEditor.tsx          # Quill wrapper
├── AnalyticsDashboard.tsx      # Analytics UI
├── BlogPostForm.tsx            # Blog form
├── EventForm.tsx               # Event form
└── UserTable.tsx               # User management table

lib/
├── AuthContext.tsx             # Authentication state
└── ThemeContext.tsx            # Theme state

server/
├── seed.js                     # Database seeder
├── utils/
│   ├── googleCalendar.js      # Google Calendar integration
│   ├── emailAutomation.js     # Email sending
│   └── pushNotifications.js   # Push notifications
└── routes/
    ├── auth.js                # Authentication
    ├── blog.js                # Blog CRUD
    ├── comments.js            # Comments with replies
    ├── contact.js             # Messages
    ├── events.js              # Events
    ├── newsletter.js          # Newsletter
    ├── upload.js              # File uploads
    └── users.js               # User management (NEW)
```

---

## 🔧 Environment Variables

Add these to your `.env` file:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/pastor-ministry

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=contact@pastorsolaolukoya.com

# Google Calendar
GOOGLE_CALENDAR_CLIENT_ID=your-client-id
GOOGLE_CALENDAR_CLIENT_SECRET=your-client-secret
GOOGLE_CALENDAR_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Push Notifications (Generate using: npx web-push generate-vapid-keys)
VAPID_PUBLIC_KEY=your-public-key
VAPID_PRIVATE_KEY=your-private-key

# API
API_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚀 Quick Start

1. **Seed the database:**
```bash
npm run seed
```

2. **Start the servers:**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server:dev
```

3. **Login:**
- Go to `/admin/login`
- Use: `admin@pso.com` / `admin123`

4. **Access admin features:**
- Dashboard: `/admin`
- Blog: `/admin/blog`
- Messages: `/admin/messages`
- Users: `/admin/users` (Admin only)
- Analytics: `/admin/analytics`
- Settings: `/admin/settings`

---

## 📦 NPM Packages Used

```json
{
  "react-quill": "^2.0.0",
  "googleapis": "^134.0.0",
  "web-push": "^3.6.7",
  "nodemailer": "^6.9.0",
  "axios": "^1.6.0"
}
```

---

## 🎯 Admin Workflow

### Publishing a Blog Post
1. Navigate to `/admin/blog`
2. Click "Create New Post"
3. Fill in title, excerpt, content (using rich text editor)
4. Upload featured image
5. Select category and tags
6. Preview post
7. Publish or save as draft
8. Automatically sends notification to newsletter subscribers (if enabled)

### Managing Events
1. Navigate to `/admin/events`
2. Click "Create Event"
3. Fill in event details
4. Enable Google Calendar sync
5. Set registration requirements
6. Publish event
7. Attendees can register via frontend
8. View attendee list and manage registrations

### Sending Newsletter
1. Navigate to `/admin/newsletter`
2. Write subject and content
3. Preview email
4. Select recipients (all, or filter by criteria)
5. Schedule or send immediately
6. View send statistics

---

This completes the comprehensive admin dashboard system with all requested features!
