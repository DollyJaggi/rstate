# Rstate - Indian Real Estate Platform

A modern, full-stack Indian real estate platform built with React, Firebase, and AI-powered features.

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion
- **Backend:** Firebase (Firestore, Auth, Storage, Realtime Database, Cloud Functions)
- **State:** Context API
- **Maps:** Google Maps API (@react-google-maps/api)
- **Payments:** Razorpay
- **Notifications:** Firebase Cloud Messaging
- **AI:** Smart recommendations, fraud detection, price estimation

## Features

- Multi-role dashboards (Buyer, Seller, Broker, Builder, Admin)
- Property CRUD with image/video upload
- Advanced search with filters (city, type, BHK, price, amenities)
- Real-time chat (Firebase RTDB)
- Google Maps integration
- AI property recommendations & fraud detection
- Payment gateway (Razorpay)
- Push notifications
- Dark/light mode
- Mobile-first responsive design
- SEO optimized with lazy loading

## Project Structure

```
rstate/
├── client/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── auth/          # Login, Register, OTP
│   │   │   ├── property/      # Property cards, forms
│   │   │   ├── chat/          # Chat interface
│   │   │   ├── dashboard/     # Dashboard widgets
│   │   │   ├── maps/          # Google Maps components
│   │   │   ├── admin/         # Admin panel components
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   └── common/        # Loading, ProtectedRoute
│   │   ├── contexts/          # React Context providers
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Page components
│   │   │   └── dashboard/     # Dashboard pages
│   │   ├── services/          # Firebase, AI services
│   │   ├── utils/             # Helpers, constants
│   │   ├── data/              # Sample/demo data
│   │   ├── styles/            # Global CSS
│   │   ├── App.jsx            # Router
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── server/
│   └── functions/             # Firebase Cloud Functions
│       ├── index.js           # API endpoints
│       └── package.json
├── firebase.json              # Firebase config
├── firestore.rules            # Security rules
├── firestore.indexes.json     # Firestore indexes
├── database.rules.json        # RTDB security rules
├── storage.rules              # Storage security rules
└── .env.example               # Environment template
```

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase account with project
- Google Maps API key
- Razorpay account

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repo-url>
cd rstate
cd client
npm install
cd ../server/functions
npm install
```

2. **Set up Firebase:**
- Create a Firebase project at https://console.firebase.google.com
- Enable Authentication (Email/Password, Google, Phone)
- Create Firestore database
- Create Realtime Database
- Enable Storage
- Get your Firebase config from Project Settings > General > Your apps > Web

3. **Configure environment:**
- Copy `.env.example` to `client/.env`
- Fill in all Firebase config values
- Add Google Maps API key
- Add Razorpay key ID

4. **Deploy Firebase:**
```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

5. **Run development server:**
```bash
cd client
npm run dev
```

The app will be available at http://localhost:3000

### Firebase Cloud Functions Configuration

```bash
firebase functions:config:set razorpay.key_id="your_key_id"
firebase functions:config:set razorpay.key_secret="your_key_secret"
```

## Deployment

### Frontend (Vercel)

```bash
cd client
npm run build
# Deploy the dist/ folder to Vercel
```

### Firebase

```bash
firebase deploy --only hosting   # Deploy hosting
firebase deploy --only functions  # Deploy cloud functions
firebase deploy --only firestore  # Deploy security rules & indexes
```

## Key Features Implementation

### Authentication
- Email/password registration with role selection
- Google OAuth login
- Phone OTP verification via Firebase Auth
- Protected routes with role-based access control

### Property Management
- Multi-step property listing form
- Image upload to Firebase Storage
- Property search with compound filters
- Featured/Verified/Urgent tags

### AI Features
- `aiService.getRecommendations()` - Personalized property suggestions
- `aiService.estimatePrice()` - ML-based price estimation
- `aiService.detectFraud()` - Fraud detection engine
- `aiService.rankLeads()` - Lead scoring system

### Real-time Chat
- Firebase Realtime Database for instant messaging
- Chat list with last message preview
- Message read status

### Payment Integration
- Razorpay payment order creation
- Payment verification webhook
- Subscription plan management

## License

MIT
