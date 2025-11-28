# Pastor Sola Olukoya Ministry Website

A comprehensive, modern, and feature-rich website for Pastor Sola Olukoya's ministry, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🌟 Features

### Frontend
- **Modern Tech Stack**: Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion
- **Responsive Design**: Fully responsive across all devices
- **Dynamic Animations**: Smooth page transitions and interactive elements using Framer Motion
- **Custom Theme**: Brand colors (#0c0c69 primary, #fcba03 secondary)

### Pages
1. **Home Page** - Hero section with mission/vision, quick links, latest posts, and testimonials
2. **About Pastor** - Biography, core beliefs, ministry history, published books, and team
3. **SATGO Office** - 12 initiative cards with interactive modals showcasing youth programs
4. **Blog/Devotional** - Masonry grid layout with category filters
5. **Contact** - Contact form with map integration
6. **Books** - E-commerce section for published books with payment integration
7. **Admin Dashboard** - Content management system

### Backend
- **Node.js/Express** server
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with bcrypt password hashing
- **RESTful API** for blog posts, contact forms, and user management
- **Email Integration** with Nodemailer

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd pso
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/pastor-ministry

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=contact@pastorsolaolukoya.com

# API
API_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000

# Payment (Paystack)
PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run the development servers**

Terminal 1 - Frontend (Next.js):
```bash
npm run dev
```

Terminal 2 - Backend (Express):
```bash
npm run server:dev
```

The frontend will run on http://localhost:3000
The backend will run on http://localhost:5000

## 📁 Project Structure

```
pso/
├── app/                      # Next.js app directory
│   ├── about/               # About page
│   ├── admin/               # Admin dashboard
│   ├── blog/                # Blog listing page
│   ├── books/               # Books e-commerce page
│   ├── contact/             # Contact page
│   ├── satgo/               # SATGO initiatives page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── about/              # About page components
│   ├── admin/              # Admin components
│   ├── blog/               # Blog components
│   ├── books/              # Books components
│   ├── contact/            # Contact components
│   ├── home/               # Home page components
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── satgo/              # SATGO components
│   └── ui/                 # Reusable UI components
├── lib/                     # Utility functions and data
│   ├── api/                # API client functions
│   ├── db/                 # Database utilities
│   ├── utils/              # Helper functions
│   └── satgoData.ts        # SATGO initiatives data
├── server/                  # Backend Express server
│   ├── config/             # Server configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── index.js            # Server entry point
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
│   ├── images/             # Image files
│   └── videos/             # Video files
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: #0c0c69 (Deep Indigo) - Headers, backgrounds
- **Secondary**: #fcba03 (Bright Gold) - Buttons, accents, links
- **Text**: #ffffff (White) - Main text on dark backgrounds

### Typography
- **Headings**: Inter (sans-serif)
- **Body**: Inter (sans-serif)
- **Special**: Merriweather (serif) for quotes/testimonials

## 🔐 Admin Dashboard

### Creating an Admin User

1. **Start the backend server**
```bash
npm run server:dev
```

2. **Register an admin user** via API:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "securepassword123",
    "role": "admin"
  }'
```

3. **Login** at http://localhost:3000/admin/login

### Admin Features
- Create, edit, and publish blog posts
- Manage contact form submissions
- User management
- Content moderation

## 🌐 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend (Railway/Render)
1. Create a new project
2. Connect your GitHub repository
3. Add environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create a free cluster at mongodb.com/atlas
2. Get your connection string
3. Update MONGODB_URI in .env

## 📚 SATGO Initiatives

The website showcases 12 key youth initiatives:
1. YAYA Worldwide - Youth and Young Adults
2. PSF Worldwide - Living Seed
3. RCF - Redeemed Christian Fellowship
4. RCCF - Redeemed Christian Corpers' Fellowship
5. TEENS & SUPERTEENS
6. LEGACY CHURCHES
7. SHIFT - Talent Hunt
8. RISE - Skills and Empowerment
9. International Youth Convention (IYC)
10. CRM - Christ the Redeemer's Ministries
11. YAYA Initiatives
12. E-Library - Digital Resources

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run server` - Start backend server
- `npm run server:dev` - Start backend with nodemon

### Adding a New Page
1. Create folder in `app/` directory
2. Add `page.tsx` for the route
3. Create components in `components/[page-name]/`
4. Update navigation in `Navbar.tsx`

### Adding a New API Route
1. Create route file in `server/routes/`
2. Define endpoints and controllers
3. Register route in `server/index.js`

## 🎯 Key Features to Implement Next

- [ ] Payment integration (Paystack/Flutterwave)
- [ ] Blog post commenting system
- [ ] Social media sharing
- [ ] Email newsletter subscription
- [ ] Live streaming integration
- [ ] Event calendar
- [ ] Donation/giving platform
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Analytics dashboard

## 📝 Content Management

### Blog Posts
Posts support:
- Rich text content
- Categories (Devotional, Teaching, Prophetic, General)
- Featured images
- Tags
- Draft/Published status
- Read time calculation

### Categories
- **Devotional**: Daily devotionals and spiritual reflections
- **Teaching**: In-depth biblical teachings
- **Prophetic**: Prophetic messages and insights
- **General**: General updates and news

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by Pastor Sola Olukoya Ministry.

## 📧 Support

For support, email: support@pastorsolaolukoya.com

## 🙏 Acknowledgments

- Pastor Sola Olukoya for the vision
- The ministry team for content and guidance
- All contributors and developers

---

**Built with faith and excellence** ✨

For more information, visit: [www.pastorsolaolukoya.com](https://www.pastorsolaolukoya.com)
