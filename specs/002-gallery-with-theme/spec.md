# Feature Specification: Pottery Gallery with Global Theme Toggle

**Feature Number**: 002
**Branch**: `002-gallery-with-theme`
**Date**: 2025-10-05
**Status**: Approved (from Bolt.new prototype)
**Dependencies**: 001-initial-project-setup

---

## Overview

Build a production-quality pottery gallery component with responsive grid layout and a **global site-wide light/dark theme system**. The gallery displays pottery pieces from content collections with warm earthy aesthetics in both themes, featuring skeleton loaders, smooth animations, and full accessibility support.

---

## User Stories

### As a visitor:
1. I want to see all pottery pieces in a responsive grid so I can browse the collection on any device
2. I want smooth loading states when images load so the experience feels polished
3. I want to toggle between light and dark themes so I can view in my preferred mode
4. I want the theme to persist across page reloads so I don't have to re-select it
5. I want hover feedback on cards so I know they're clickable
6. I want keyboard navigation support so I can browse without a mouse

### As the artist:
1. I want new pottery pieces to automatically appear in the gallery when I add markdown files
2. I want the theme toggle to work site-wide, not just on the gallery page
3. I want the gallery to match the warm, handcrafted aesthetic of my work

### As a developer:
1. I want the theme system to be maintainable and extensible
2. I want comprehensive tests to ensure features work correctly
3. I want the implementation to follow constitutional principles

---

## Acceptance Criteria

### Gallery Layout
- [ ] Gallery displays all pottery pieces from `src/content/pieces/` collection
- [ ] Responsive grid: 1 column mobile (<640px), 2 columns tablet (640-1024px), 3 columns desktop (>1024px)
- [ ] Each card shows: square 1:1 image, title in Georgia serif, technique badges, description (max 3 lines)
- [ ] Cards have 12px rounded corners, white/dark backgrounds, soft shadows
- [ ] Grid gap is 32px, card padding is 24px, container max-width 1200px centered
- [ ] Page has 64px top/bottom padding

### Theme System
- [ ] Theme toggle button visible in top-right of all pages (fixed position)
- [ ] Toggle shows Sun icon in dark mode, Moon icon in light mode
- [ ] Button has proper ARIA labels and keyboard accessibility
- [ ] Theme preference persists in localStorage as `pottery-theme`
- [ ] Theme applies to entire site (all pages, not just gallery)
- [ ] Smooth 300ms color transitions when switching themes
- [ ] Default theme is light mode on first visit

### Light Theme Colors
- [ ] Page background: #faf8f5 (warm cream)
- [ ] Card background: #ffffff (white)
- [ ] Title text: #3d2f24 (dark earth)
- [ ] Body text: #6b5544 (fired clay)
- [ ] Badge background: #d4c4b0 (warm tan)
- [ ] Badge text: #3d2f24 (dark earth)

### Dark Theme Colors
- [ ] Page background: #1a1410 (dark earth)
- [ ] Card background: #2d2419 (dark clay)
- [ ] Title text: #f5f1ea (light clay)
- [ ] Body text: #d4c4b0 (warm tan)
- [ ] Badge background: #3d2f24 with #d4c4b0 text

### Interactive Features
- [ ] Hover state: shadow grows from `shadow-md` to `shadow-lg`, card scales to 1.02, 2px terracotta (#9c8671) border appears
- [ ] Click state: card scales to 0.98 briefly (150ms) before action
- [ ] All transitions are 300ms smooth
- [ ] Cards are fully clickable and keyboard navigable
- [ ] Focus-visible state shows terracotta outline for keyboard users

### Loading States
- [ ] Images show skeleton loader with shimmer animation while loading
- [ ] Skeleton color: #d4c4b0 (light) or #3d2f24 (dark)
- [ ] Shimmer animation is 2s linear infinite
- [ ] Images fade in when loaded

### Page Load Animation
- [ ] Cards fade in sequentially on page load
- [ ] Animation: fade from opacity 0 + translateY(20px) to opacity 1 + translateY(0)
- [ ] Duration: 600ms ease-out per card
- [ ] Stagger: 100ms delay between each card

### Accessibility
- [ ] All images have descriptive alt text from frontmatter
- [ ] Technique badges have `role="list"` and `role="listitem"`
- [ ] Cards have `role="button"`, `tabIndex={0}`, proper ARIA labels
- [ ] Keyboard navigation: Enter/Space activates cards
- [ ] Screen reader text: "Click to view full details" (visually hidden)
- [ ] Theme toggle has `aria-label` and `aria-pressed` states
- [ ] Color contrast meets WCAG AA standards in both themes

### Performance
- [ ] Images use lazy loading (`loading="lazy"`)
- [ ] Images are optimized (Unsplash auto-format for prototype, Sharp processing in future)
- [ ] No layout shift during image loading (aspect-ratio preserved)
- [ ] Theme toggle doesn't cause flash of unstyled content (FOUC)

### Content Integration
- [ ] Gallery dynamically loads from `getCollection('pieces')`
- [ ] Supports all frontmatter fields: title, techniques, description, mainImage
- [ ] Works with any number of pottery pieces (3 minimum for testing)
- [ ] Gracefully handles missing optional fields

---

## Non-Functional Requirements

### Browser Support
- Last 2 versions of Chrome, Firefox, Safari, Edge
- Mobile Safari (iOS 14+)
- Chrome on Android

### Performance Targets
- First Contentful Paint (FCP): <1.8s
- Largest Contentful Paint (LCP): <2.5s
- Cumulative Layout Shift (CLS): <0.1
- Total Blocking Time (TBT): <200ms

### Accessibility Standards
- WCAG 2.1 AA compliance
- Keyboard navigable (all interactive elements)
- Screen reader compatible
- Touch targets ≥44px on mobile

### Code Quality
- TypeScript strict mode enabled
- All components tested (unit + integration)
- ESLint/Prettier formatting
- Proper semantic HTML

---

## Technical Architecture

### Components
1. **Gallery.astro**: Main gallery component (static)
2. **ThemeToggle.astro**: Theme toggle button with client-side script
3. **BaseLayout.astro**: Updated with theme class and global styles
4. **theme.ts**: Client-side theme management script

### Data Flow
```
content/pieces/*.md
  → getCollection('pieces')
  → Gallery.astro renders cards
  → ThemeToggle client script manages localStorage
  → HTML class toggles between light/dark
  → CSS variables apply theme colors
```

### Theme Implementation Strategy
- CSS custom properties for theme colors
- `<html>` or `<body>` gets `data-theme="light|dark"` attribute
- Client-side script reads localStorage on page load
- Script applied inline in `<head>` to prevent FOUC
- Theme toggle component uses Astro client directives (`client:load`)

---

## Out of Scope

This feature does NOT include:
- [ ] Individual pottery detail pages (future feature)
- [ ] Filtering/sorting gallery items
- [ ] Search functionality
- [ ] Image zoom/lightbox
- [ ] Pagination
- [ ] AI-generated descriptions
- [ ] Image optimization with Sharp (using Unsplash URLs for now)
- [ ] Custom font loading (using Georgia serif from system fonts)

---

## Dependencies

### Required
- Astro 4.15.0+ (already installed)
- Tailwind CSS 3.4.0+ (already configured)
- Content collections configured (from spec 001)

### New Dependencies
- `astro-icon` or inline SVG for Sun/Moon icons
- OR use Lucide icons as static imports

---

## Risks & Mitigations

### Risk 1: Flash of Unstyled Content (FOUC)
**Risk**: Theme toggle could cause flash when page loads
**Mitigation**: Inline script in `<head>` applies theme before render

### Risk 2: Constitutional Article I Violation
**Risk**: Theme system might count as 4th component
**Mitigation**: Theme is CSS + vanilla JS (no framework), doesn't count as component

### Risk 3: Dark Theme Complexity
**Risk**: Dark theme wasn't in original constitution
**Mitigation**: Document as enhancement, ensure it's toggle-able (defaults to light)

### Risk 4: Content Collection Integration
**Risk**: Gallery might not work if no content exists
**Mitigation**: Keep example piece from spec 001, document minimum 1 piece required

---

## Constitutional Gates Checklist

### Article I: Simplicity First
- [ ] Still using only 3 components: Astro, React, Tailwind ✅
- [ ] Theme system is vanilla JS + CSS (no additional framework) ✅
- [ ] No state management library needed ✅

### Article II: Content as Data
- [ ] Gallery reads from content collections ✅
- [ ] All pottery data in markdown files ✅
- [ ] No database required ✅

### Article III: Test-First Development
- [ ] Tests will be written before implementation ✅
- [ ] All acceptance criteria are testable ✅
- [ ] RED → GREEN cycle will be followed ✅

### Article IV: Performance Budget
- [ ] Lighthouse performance targets defined ✅
- [ ] Lazy loading implemented ✅
- [ ] No runtime overhead from theme system ✅

### Article V: AI Progressive Enhancement
- [ ] N/A for this feature (no AI in gallery) ✅

### Article VI: High Schooler Maintainability
- [ ] Artist can add pottery by creating markdown files ✅
- [ ] Theme toggle is simple on/off switch ✅
- [ ] Code is well-commented and clear ✅

### Article VII: Earthy Aesthetic
- [ ] Color palette matches clay/glaze tones in both themes ✅
- [ ] Georgia serif typography preserved ✅
- [ ] Generous whitespace maintained ✅

### Article VIII: Observable & Testable
- [ ] Gallery can be tested via build output ✅
- [ ] Theme state can be inspected in localStorage ✅
- [ ] CLI commands can verify functionality ✅

### Article IX: Amendment Process
- [ ] Dark theme documented as enhancement ✅
- [ ] Constitutional compliance verified ✅

---

## Success Criteria

### Feature is complete when:
1. ✅ All acceptance criteria passing
2. ✅ All tests passing (100% of test cases)
3. ✅ Gallery matches Bolt.new prototype visually
4. ✅ Theme toggle works on all pages
5. ✅ Artist can add pottery pieces via markdown
6. ✅ Lighthouse scores ≥90 across all metrics
7. ✅ Accessibility audit passes (aXe/WAVE)
8. ✅ Code reviewed and approved
9. ✅ Documentation updated
10. ✅ Deployed to preview environment

### Visual Comparison
- Compare production gallery to Bolt.new prototype screenshots
- Verify color palette matches exactly in both themes
- Confirm hover/click states match Bolt design
- Validate responsive breakpoints match specification

---

## Approval

**Specification Status**: ✅ **APPROVED** (based on Bolt.new prototype)

**Approved by**: User (via Bolt.new design iteration)

**Date**: 2025-10-05

**Next Step**: Generate implementation plan (`/plan`)

---

## Notes

- This spec is derived from the working Bolt.new prototype
- Dark theme is a NEW feature (enhancement beyond original spec 001)
- Global theme system is better UX than component-level theme
- Theme preference persistence improves user experience
- All Bolt features preserved: loaders, animations, accessibility
