# Development Quick Reference

## Quick Start
```bash
pnpm install
pnpm dev
# Navigate to http://localhost:3000
# Login: student@example.com / password123
```

## File Structure Quick Reference

| Path | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with providers |
| `app/(dashboard)/layout.tsx` | Dashboard shell with sidebar + header |
| `lib/auth-context.tsx` | Authentication context hook |
| `lib/mock-data.ts` | All mock API data |
| `lib/types.ts` | TypeScript interfaces |
| `lib/utils.ts` | Formatting & helper functions |
| `components/ui/*` | shadcn/ui primitive components |
| `app/globals.css` | Global styles + design tokens |

## Common Tasks

### Add a New Color to Theme
Edit `app/globals.css` and add to `@theme`:
```css
--color-new-color: oklch(60% 0.1 250);
```

### Format Currency or Date
```tsx
import { formatCurrency, formatDate } from "@/lib/utils"

formatCurrency(5000)        // ₹5,000
formatDate("2024-01-15")    // Jan 15, 2024
```

### Add Authentication Check
```tsx
import { useAuth } from "@/lib/auth-context"

const { user, isLoading, logout } = useAuth()
if (!user) redirect("/login")
```

### Create a New Page
1. Create folder: `app/(dashboard)/new-feature/`
2. Add `page.tsx` with `'use client'` at top
3. Import components and use mock data
4. Add route to sidebar in `components/app-sidebar.tsx`

### Add Mock Data
Edit `lib/mock-data.ts` and export new data:
```ts
export const myNewData = {
  // data structure
}
```

## Component Patterns

### Dashboard Stats Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold">Value</div>
    <p className="text-sm text-muted-foreground">Subtitle</p>
  </CardContent>
</Card>
```

### Data Table with Badge Status
```tsx
import { Badge } from "@/components/ui/badge"
import { getGradeColor } from "@/lib/utils"

<Badge className={getGradeColor(grade)}>
  {grade}
</Badge>
```

### Responsive Grid
```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => (
    <Card key={item.id}>
      {/* content */}
    </Card>
  ))}
</div>
```

## Responsive Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)
- **Large**: `xl:` (≥ 1280px)

## Navigation Structure
```
/
├── /login                    (public)
└── /dashboard                (protected)
    ├── /dashboard            (overview)
    ├── /grades              (academics)
    ├── /attendance          (tracking)
    ├── /fees                (finances)
    ├── /profile             (personal)
    └── /announcements       (communications)
```

## Debugging Tips

### Check if auth is working
```tsx
const { user } = useAuth()
console.log("[v0] Current user:", user)
```

### Verify mock data structure
```tsx
import { studentProfile, dashboardStats } from "@/lib/mock-data"
console.log("[v0] Mock data:", { studentProfile, dashboardStats })
```

### Test responsive design
1. Open DevTools (F12)
2. Use Ctrl+Shift+M for device toolbar
3. Test at: 320px (mobile), 768px (tablet), 1024px (desktop)

## TypeScript Types

Key types defined in `lib/types.ts`:
- `User` - Student profile
- `Grade` - Grade record
- `Attendance` - Attendance data
- `FeeRecord` - Fee transaction
- `Announcement` - Announcement item
- `DashboardStats` - Dashboard metrics

## Testing Routes

Test these URLs after starting dev server:
- `http://localhost:3000` → Redirects to dashboard if logged in
- `http://localhost:3000/login` → Login page
- `http://localhost:3000/dashboard` → Dashboard
- `http://localhost:3000/grades` → Grades page
- `http://localhost:3000/attendance` → Attendance
- `http://localhost:3000/fees` → Fees
- `http://localhost:3000/profile` → Profile
- `http://localhost:3000/announcements` → Announcements

## Common Tailwind Classes

| Purpose | Class |
|---------|-------|
| Flex center | `flex items-center justify-center` |
| Grid 3 cols | `grid grid-cols-3 gap-4` |
| Text muted | `text-muted-foreground` |
| Card background | `bg-card` |
| Rounded standard | `rounded-[var(--radius)]` |
| Full width | `w-full` |
| Full height | `h-screen` |
| Padding standard | `p-4 md:p-6` |
| Gap standard | `gap-4` |

## Import Aliases
All imports use `@/` prefix:
- `@/components/*` - React components
- `@/lib/*` - Utilities, types, context
- `@/app/*` - Page components

## Important Notes

1. **No localStorage** - All state uses React Context or URL params
2. **Mock data is exhaustive** - Every API shape is pre-mocked in `lib/mock-data.ts`
3. **Server Components default** - Use `'use client'` only when needed
4. **Shadcn UI as primitives** - Use Radix UI components via shadcn wrapper
5. **Type safety everywhere** - TypeScript strict mode enabled
6. **Accessible by default** - All components are WCAG AA compliant

## Performance Tips

1. **Use `key` prop** when rendering lists
2. **Memoize expensive components** with `React.memo`
3. **Lazy load heavy components** with `dynamic()`
4. **Use image optimization** for any images
5. **Avoid inline functions** in JSX

## Deployment Checklist

- [ ] Test all pages on mobile, tablet, desktop
- [ ] Run TypeScript: `pnpm tsc`
- [ ] Check for console errors and warnings
- [ ] Verify login flow works
- [ ] Test all navigation links
- [ ] Check form submissions
- [ ] Verify data displays correctly
- [ ] Test responsive breakpoints
- [ ] Audit accessibility: Wave browser extension

## Troubleshooting

### Build fails with TypeScript errors
```bash
pnpm tsc --noEmit
```

### Port 3000 already in use
```bash
pnpm dev -- -p 3001
```

### Node modules corrupted
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Styling not applying
1. Check class names are spelled correctly
2. Verify globals.css is imported in layout
3. Check Tailwind config in globals.css
4. Clear `.next` build cache: `rm -rf .next && pnpm dev`
