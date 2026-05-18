# Project Overview: NRSC Live Vote

NRSC Live Vote is a real-time election dashboard designed for student council elections. It provides a visually rich, interactive experience for tracking vote counts, candidate performance, and overall election statistics.

## Tech Stack
- **Framework:** Next.js (App Router, React 19)
- **Backend/Realtime:** Supabase (PostgreSQL + Realtime Subscriptions)
- **Styling:** Tailwind CSS 4, Custom CSS (Glassmorphism effect)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Typography:** Sarabun (Google Fonts)

## Core Architecture
The project follows a modern real-time architecture where data is managed in Supabase and pushed to clients instantly.

- **Public Dashboard (`src/app/page.tsx`):** The main entry point. It subscribes to Supabase `postgres_changes` events to update the UI in real-time as votes are counted.
- **Admin Interface (`src/app/admin/page.tsx`):** A protected route (PIN-based access) that allows election officials to update vote counts, candidate info, and system settings.
- **Data Layer:**
    - `src/lib/supabase.ts`: Client initialization.
    - `src/types/election.ts`: Domain models (`PartyData`, `SpecialVote`, `Settings`, `Booth`).
    - `supabase/schema.sql`: SQL definitions for tables and realtime publications.

## Key Features
- **Real-time Vote Tracking:** Live updates for valid votes, invalid votes, and voter turnout.
- **Battle Section:** Visual comparison between the top two candidates.
- **Scoreboard:** Comprehensive breakdown of all votes, including special categories (spoiled, abstain).
- **Admin Controls:** Update votes, change candidate photos (integrated with Supabase Storage), and toggle "Live" mode.
- **Responsive Design:** Optimized for both large screens (dashboards) and mobile devices.

## Building and Running

### Development
```bash
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

### Database Setup
1. Create a Supabase project.
2. Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor.
3. Configure environment variables (refer to `.env.example` if available, or use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Enable Supabase Realtime for the `parties`, `election_settings`, `special_votes`, and `booths` tables.

### Admin Access
- **Path:** `/admin`
- **Default PIN:** `2569` (Configurable in `src/app/admin/page.tsx`)

## Development Conventions
- **Client-Side Heavy:** The dashboard and admin pages are `"use client"` components to handle real-time state and animations.
- **Styling:** Uses a combination of Tailwind utility classes and a `<FontStyle />` component for global CSS and glassmorphism effects.
- **Utilities:** `src/lib/utils.ts` contains shared calculation logic (e.g., percentages) and animation variants.
- **Testing:** Currently no automated tests are implemented (TODO).
