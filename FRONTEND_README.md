# Acad EduOS - Student Portal Frontend

A modern, responsive Next.js 15 student portal frontend built with React 19, TypeScript, shadcn/ui components, and Tailwind CSS v4. This is part of the comprehensive Acad EduOS Institute ERP system.

## Features

### 7 Core Pages

1. **Dashboard** - At-a-glance overview with key metrics, recent grades, attendance visualization, upcoming deadlines, and announcements
2. **Grades** - Comprehensive grade tracking with GPA summaries, semester selection, and detailed grade history
3. **Attendance** - Attendance tracking by course with progress indicators and filterable records
4. **Fees** - Financial information including balance tracking, payment history, and fee status
5. **Profile** - Student profile with editable personal and emergency contact information
6. **Announcements** - Priority-filtered announcements with rich formatting and attachments
7. **Login** - Secure authentication interface with demo credentials

### Design & UX

- ✅ **Responsive Design** - Seamless experience from mobile (320px) to desktop (1920px)
- ✅ **Mobile-First Architecture** - Collapsible sidebar on mobile, expandable on desktop
- ✅ **Dark Mode Support** - Full support via `prefers-color-scheme` (infrastructure in place)
- ✅ **Accessibility (WCAG AA)** - Semantic HTML, ARIA labels, keyboard navigation
- ✅ **Professional Theme** - Indigo/blue education-focused color palette
- ✅ **Smooth Animations** - Sidebar transitions, loading states, interactive elements

### Technical Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript 5.7
- **UI Components**: shadcn/ui + Radix UI primitives
- **Styling**: Tailwind CSS v4 + oklch color system
- **Data Visualization**: Recharts for charts and graphs
- **Icons**: Lucide React (24px default)
- **Notifications**: Sonner (toast notifications)
- **Authentication**: Custom JWT-based context provider
- **State Management**: React Context + localStorage

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm, npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/srinu2003/acad-edu-os.git
cd acad-edu-os

# Install dependencies
pnpm install
# or npm install | yarn install | bun install

# Create environment file
cp .env.example .env.local
```

### Development

```bash
# Start development server with Turbopack
pnpm dev

# Open browser to http://localhost:3000
```

### Login Credentials

Demo account credentials (mock data):
- **Email**: `student@example.com`
- **Password**: `password123`

### Build & Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Project Structure

```
acad-edu-os/
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Root layout with auth provider
│   ├── page.tsx                  # Root redirect to /dashboard
│   ├── login/
│   │   └── page.tsx              # Login page
│   └── (dashboard)/              # Route group for authenticated pages
│       ├── layout.tsx            # Dashboard layout with sidebar/header
│       ├── dashboard/page.tsx    # Dashboard overview
│       ├── grades/page.tsx       # Grades page
│       ├── attendance/page.tsx  # Attendance tracking
│       ├── fees/page.tsx         # Fee management
│       ├── profile/page.tsx      # Student profile
│       └── announcements/page.tsx # Announcements
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── sheet.tsx            # Mobile sidebar
│   │   ├── tooltip.tsx
│   │   ├── avatar.tsx
│   │   └── ...
│   ├── app-sidebar.tsx          # Main navigation sidebar
│   ├── site-header.tsx          # Top header with user menu
│   ├── login-form.tsx           # Login form component
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── stats-cards.tsx
│   │   ├── attendance-chart.tsx
│   │   ├── recent-grades.tsx
│   │   ├── upcoming-deadlines.tsx
│   │   └── announcements-preview.tsx
│   ├── grades/
│   │   ├── gpa-summary.tsx
│   │   └── grades-table.tsx
│   ├── attendance/
│   │   ├── attendance-overview.tsx
│   │   ├── course-attendance.tsx
│   │   └── attendance-records.tsx
│   ├── fees/
│   │   ├── fee-summary.tsx
│   │   └── fee-table.tsx
│   ├── profile/
│   │   ├── profile-header.tsx
│   │   └── profile-form.tsx
│   └── announcements/
│       └── announcement-card.tsx
├── lib/
│   ├── auth-context.tsx         # Authentication context provider
│   ├── mock-data.ts             # Mock API response data
│   ├── types.ts                 # TypeScript types & interfaces
│   └── utils.ts                 # Utility functions (formatting, helpers)
├── app/
│   └── globals.css              # Global styles + design tokens
├── components.json              # shadcn/ui configuration
├── next.config.mjs              # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS v4 config (in globals.css)
└── package.json                 # Dependencies
```

## Color Palette

The app uses a professional education-focused color system with oklch color values:

- **Primary**: Indigo (#3730a3) - Main brand color
- **Secondary**: Blue (#0ea5e9) - Accent color
- **Success**: Green (#16a34a) - Positive indicators (good attendance)
- **Warning**: Orange (#f97316) - Warning indicators (mid attendance)
- **Destructive**: Red (#dc2626) - Danger/critical indicators (low attendance)
- **Neutral**: Grays (#1f2937 - #f9fafb) - Text, backgrounds, borders

## Mock Data Architecture

All data is generated from `lib/mock-data.ts` and matches the exact structure defined in the repository's API documentation. The data layer is completely swappable - simply replace API calls with real backend endpoints without changing component signatures.

### Mock Data Includes

- Student profile and enrollment information
- Course enrollment with semester details
- Grade records with course-wise breakdown and SGPA trends
- Attendance records per course with daily tracking
- Fee records with payment history and status
- Announcements with priority levels and metadata
- Dashboard statistics and quick stats

## API Integration Ready

The app is structured to easily integrate with the real backend API:

1. **Authentication**: Replace JWT mock in `lib/auth-context.tsx` with real auth API
2. **Data Fetching**: Components use SWR-compatible patterns (ready for real API integration)
3. **API Endpoints**: All mock data shapes exactly match the documented API response formats
4. **Error Handling**: Components include placeholder error states for API failures

## Accessibility Features

- ✅ Semantic HTML structure with `<main>`, `<header>`, `<nav>`
- ✅ ARIA labels and roles for interactive elements
- ✅ Keyboard navigation throughout all pages
- ✅ Focus indicators on all buttons and links
- ✅ Screen reader-only text where needed (`.sr-only` class)
- ✅ Proper heading hierarchy (h1 → h6)
- ✅ Color contrast ≥ 4.5:1 for text
- ✅ Alt text for meaningful images

## Performance Optimizations

- Next.js Image Optimization (via Recharts charts)
- Server-side rendering for fast initial load
- Dynamic imports for heavy components
- Efficient CSS with Tailwind's purging
- Optimized bundle with code splitting

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Environment Variables

```env
# App configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Connect GitHub repository
vercel link

# Deploy
vercel deploy
```

### Other Platforms

```bash
# Build standalone application
pnpm build

# Deploy the `.next/standalone` folder
```

## Extending the Project

### Adding a New Page

1. Create new route folder: `app/(dashboard)/new-page/`
2. Add `page.tsx` with `'use client'` directive
3. Create components in `components/new-page/`
4. Add navigation link in `components/app-sidebar.tsx`
5. Add mock data in `lib/mock-data.ts` if needed

### Styling New Components

```tsx
// Use design tokens and utility classes
<div className="rounded-[var(--radius)] bg-popover p-4 text-foreground">
  Content
</div>

// Use helper functions for formatting
import { formatCurrency, formatDate, getAttendanceColor } from "@/lib/utils"
```

### Adding New UI Components

Use shadcn CLI to add Radix UI components:

```bash
# Add new shadcn component
npx shadcn-ui@latest add <component-name>
```

## Development Guidelines

- Always use TypeScript for new code
- Follow the existing component structure and naming conventions
- Use `'use client'` for interactive components with state/hooks
- Prefer composition over props drilling
- Keep components focused and reusable
- Use semantic HTML and ARIA attributes
- Test responsive design at 320px, 768px, and 1024px

## Contributing

1. Create a feature branch from `main`
2. Make your changes following the style guide
3. Ensure TypeScript passes (`pnpm tsc`)
4. Test on multiple screen sizes
5. Push to GitHub and create a Pull Request

## License

Part of the Acad EduOS project. See repository for license details.

## Support

For issues or questions:
- GitHub Issues: [https://github.com/srinu2003/acad-edu-os/issues](https://github.com/srinu2003/acad-edu-os/issues)
- Documentation: Check `/docs` folder in the main repository

## Next Steps

1. **Backend Integration**: Replace mock data with real API calls
2. **Authentication System**: Integrate with institution's auth system
3. **Real Database**: Connect to PostgreSQL/MySQL backend
4. **Admin Dashboard**: Build admin-facing ERP pages
5. **Mobile App**: Extend to React Native using Expo
6. **Analytics**: Add student engagement tracking and analytics
