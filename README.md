# Jharkhand Property - Real Estate Platform

A comprehensive full-stack real estate platform built with Next.js, specifically designed for the Jharkhand market.

## Features

### Core Features
- **User Side (Buyer/Tenant)**
  - OTP + Aadhaar optional signup/login
  - Advanced property search with filters
  - Map-based property view
  - Property details with photos, videos, price info
  - Save/Wishlist functionality
  - Book site visits
  - Chat with owner/agent
  - Loan EMI calculator

- **Agent/Broker Panel**
  - Add/edit property listings
  - Lead management (track buyers)
  - Appointment scheduler
  - Commission tracking
  - Analytics (views, conversions)

- **Admin Panel**
  - Verify listings
  - Manage users & agents
  - Handle payments
  - RERA compliance checking
  - Analytics dashboard

### Jharkhand-Specific Features
- **Hyperlocal Focus** (Ranchi, Jamshedpur, Dhanbad, etc.)
- **Properties within 1-5 km radius**
- **Local Filters** (near school/hospital/railway station, near mining/industrial areas)
- **Land & Plot Verification** (upload registry, khata papers)
- **Plot & Land Focus** (plot size calculator, road access info, land type)
- **Direct Owner Mode** (hide number, chat only)
- **Local Society Reviews** (area rating, water/electricity/safety scores)

### Advanced Features
- AI Property Recommendation
- Virtual Property Tour (360° view, video walkthrough)
- Price Intelligence (area trends, past sale prices)
- Voice Search (Hindi & English support)
- Smart Alerts (new listings, price drops)

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **UI Components**: Custom component library with Lucide icons
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Database**: Prisma with SQLite (can be changed to PostgreSQL)
- **Authentication**: NextAuth.js with JWT

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client:
```bash
npm run db:generate
```

3. Push schema to database:
```bash
npm run db:push
```

4. Start development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
jharkhand-real-estate/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── admin/         # Admin dashboard
│   │   ├── agent/         # Agent dashboard
│   │   ├── api/           # API routes
│   │   ├── auth/          # Auth pages (login, register)
│   │   ├── properties/    # Properties listing
│   │   └── property/      # Property detail
│   ├── components/        # React components
│   │   └── ui/           # UI components (Button, Card, etc.)
│   ├── lib/              # Utilities and data
│   └── types/            # TypeScript types
├── public/               # Static assets
└── package.json
```

## Revenue Model

- **Featured Listings**: ₹499–₹1999
- **Agent Subscription Tiers**: Free, Basic, Professional, Enterprise
- **Lead Generation**: Quality-tiered lead sales
- **Home Loan Referrals**: Commission from partner banks
- **Property Verification**: Paid verification services

## Deployment

The application can be deployed to Vercel or any Node.js hosting platform.

```bash
npm run build
npm start
```

## License

MIT