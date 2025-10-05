# Bolt Gallery Export - Implementation Notes

**Date**: 2025-10-05
**Bolt Version**: 3
**Status**: Ready for Astro implementation

## Features Implemented in Bolt

### Core Features
- ✅ Responsive grid layout (1/2/3 columns)
- ✅ Light/dark theme toggle with localStorage
- ✅ Warm earthy color palette (both themes)
- ✅ Georgia serif typography for titles
- ✅ Technique pill badges
- ✅ 3-line description ellipsis

### Polish Features
- ✅ Skeleton loaders with shimmer animation
- ✅ Sequential fade-in on page load (100ms stagger)
- ✅ Hover effects: shadow growth + 2px terracotta border
- ✅ Click feedback: scale to 0.98
- ✅ Smooth 300ms transitions on all interactions
- ✅ Full keyboard navigation support
- ✅ ARIA labels and semantic HTML
- ✅ Focus-visible states with terracotta outline

## Key Components

### PotteryGallery.tsx
- Main gallery component with all features
- Uses `useTheme` hook for theme management
- Hardcoded sample data (3 pottery pieces)
- Lucide React icons (Sun/Moon)

### useTheme.ts
- Custom hook for theme state
- localStorage persistence
- Toggle function

## Color Palette

### Light Theme
- Background: #faf8f5 (warm cream)
- Cards: #ffffff (white)
- Title: #3d2f24 (dark earth)
- Body: #6b5544 (fired clay)
- Badges: #d4c4b0 (warm tan)
- Accent: #9c8671 (terracotta)

### Dark Theme
- Background: #1a1410 (dark earth)
- Cards: #2d2419 (dark clay)
- Title: #f5f1ea (light clay)
- Body: #d4c4b0 (warm tan)
- Badges: #3d2f24 bg / #d4c4b0 text
- Accent: #9c8671 (terracotta)

## Astro Implementation Requirements

### Must Adapt
1. **React → Astro component**: Convert to `.astro` file
2. **Hardcoded data → Content collections**: Use `getCollection('pieces')`
3. **useTheme hook → Client-side script**: Theme toggle as Alpine.js or vanilla JS
4. **Lucide React → Astro Icons**: Use `astro-icon` or inline SVG
5. **Inline styles → Tailwind classes**: Convert to our existing config

### Must Preserve
1. All color hex values (both themes)
2. Spacing values (32px gaps, 24px padding, etc.)
3. Animation timings (300ms transitions, 100ms stagger)
4. Hover/focus/active states
5. Accessibility features (ARIA, keyboard nav)
6. Responsive breakpoints (640px, 1024px)

### Must Test
1. Theme toggle persistence (localStorage)
2. Image loading states
3. Responsive grid at all breakpoints
4. Keyboard navigation
5. Screen reader compatibility
6. Smooth animations in both themes

## Constitutional Compliance

- ✅ **Article I (Simplicity)**: Uses Astro + React island for theme toggle only
- ✅ **Article II (Content as Data)**: Will integrate with content collections
- ✅ **Article III (Test-First)**: Tests will be written before implementation
- ✅ **Article VI (Maintainability)**: Simple, clear code with comments
- ✅ **Article VII (Earthy Aesthetic)**: Warm earth tones, Georgia serif
- ✅ **Article VIII (Observable)**: Can be tested via CLI commands

## Next Steps (SDD Workflow)

1. **Specification**: Define gallery component from Bolt design
2. **Planning**: Architecture for Astro + theme toggle
3. **Tasks**: Break into implementable steps
4. **Tests**: Write tests for all features
5. **Implementation**: Build in Astro with content collections
6. **Verification**: Compare to Bolt prototype

## Notes

- Dark theme is a NEW feature (not in original constitution)
- May need constitutional amendment for theme complexity
- Consider if theme toggle should be global or per-component
- Theme state management: Alpine.js vs Nano Stores vs vanilla JS
