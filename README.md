# Campus Carbon Footprint Mapper - IIT Roorkee

A comprehensive web application for monitoring, analyzing, and reducing carbon emissions across IIT Roorkee campus.

## Features

### 🎯 Dashboard
- **Overview**: Real-time campus emissions metrics with statistics and top emitters
- **Simulation**: Live time-based simulation showing emissions throughout the day
- **Map Analytics**: Interactive campus map with building-level emissions data

### 🏆 Department Rankings
- Performance comparison across campus departments
- Sustainability scoring and leaderboards
- Track improvements and green certifications

### 💬 Chat
- AI-powered sustainability assistant
- **Recommendations History**: Track all sustainability recommendations and implementation status

### ℹ️ About
- **Project**: Mission, vision, features, and milestones
- **Team**: Meet the multidisciplinary team
- **Contact**: Get in touch with office hours and contact form

## Tech Stack

- **React 18** with TypeScript
- **React Router v6** for multilevel routing
- **Framer Motion** for smooth transitions and animations
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Supabase** for backend (database ready)
- **Vite** for blazing-fast development

## Architecture

### Routing Structure
```
/
├── dashboard/
│   ├── overview
│   ├── simulation
│   └── map-analytics
├── rankings
├── chat/
│   ├── (index)
│   └── history
└── about/
    ├── (index - project)
    ├── team
    └── contact
```

### Key Components

- **Layout.tsx**: Main application layout with navigation
- **Navigation.tsx**: Top navigation with mobile drawer
- **DashboardLayout.tsx**: Nested layout for dashboard tabs
- **ChatLayout.tsx**: Nested layout for chat sections
- **AboutLayout.tsx**: Nested layout for about pages

### Transitions

All route transitions use Framer Motion with:
- Fade in/out animations
- Smooth tab switching with layoutId
- Staggered children animations for lists and cards

### Mobile Responsive

- Collapsible navigation on mobile
- Touch-friendly controls
- Responsive grid layouts
- Overflow-x scrolling for tab navigation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Database Schema

The application is ready for Supabase integration with schemas for:
- Buildings (emissions, energy, metadata)
- Commutes (user transport logging)
- Scenarios (what-if planning)
- Chat messages (AI conversations)
- Recommendations (sustainability suggestions)

## Design System

- **Color Palette**: Neutral grays with emerald green accents
- **Typography**: System fonts, tracking-tight for headings
- **Spacing**: 8px baseline grid
- **Borders**: Subtle white/10 opacity for dark theme
- **Shadows**: Subtle with backdrop blur for depth

## Future Enhancements

- MapmyIndia/Mappls integration for live campus map
- Real-time IoT sensor data integration
- Advanced analytics with Chart.js
- User authentication with Supabase Auth
- Progressive Web App (PWA) support
- Export functionality (CSV, PDF reports)

## License

This project is part of IIT Roorkee's sustainability initiative.
