# Feature Specification: Detail Pages & Gallery Enhancements

**Feature Number**: 003
**Branch**: `003-detail-pages-and-enhancements`
**Date**: 2025-10-05
**Status**: Planning
**Dependencies**: 002-gallery-with-theme

---

## Overview

Enhance the pottery portfolio with individual detail pages for each piece, gallery filtering/sorting capabilities, and image gallery viewers. This feature completes the core viewing experience and lays groundwork for future AI description integration (Article V).

**Scope**:
1. **Detail Pages**: Dynamic routes for individual pottery pieces with full markdown content
2. **Gallery Filtering**: Filter by technique, color, and featured status
3. **Gallery Sorting**: Sort by date, title, or featured status
4. **Image Gallery**: Lightbox viewer for detail images on piece pages
5. **AI Preparation**: Structure for future AI-generated descriptions (no API integration yet)

---

## User Stories

### As a visitor:
1. I want to click a pottery card to see full details so I can learn more about each piece
2. I want to view multiple images of a piece so I can see details and textures
3. I want to filter the gallery by technique so I can find pieces made with specific methods
4. I want to filter by color so I can find pieces with specific color palettes
5. I want to sort pieces by date, title, or featured status so I can browse in my preferred order
6. I want smooth transitions when navigating between gallery and detail pages
7. I want to easily return to the gallery from a detail page
8. I want to read the artist's story and process notes for each piece

### As the artist (Mol_Art):
1. I want detail pages to automatically generate from markdown files with no coding required
2. I want to add multiple detail images by just listing them in frontmatter
3. I want to write story and process notes in markdown that appears on detail pages
4. I want to mark pieces as "featured" to highlight my best work
5. I want filtering to help visitors discover pieces by their interests

### As a developer:
1. I want to use Astro's dynamic routes (`[slug].astro`) for detail pages
2. I want filtering/sorting to work with vanilla JavaScript (no libraries)
3. I want the image gallery to be accessible and keyboard-navigable
4. I want tests for routing, filtering, sorting, and accessibility
5. I want to structure the code for future AI description integration

---

## Acceptance Criteria

### Detail Pages (`/gallery/[slug]`)

#### Routing & Navigation
- [ ] Detail page accessible at `/gallery/[piece-slug]` (e.g., `/gallery/earth-vessel`)
- [ ] Clicking gallery card navigates to detail page
- [ ] "Back to Gallery" button returns to gallery with preserved filter/sort state (if possible)
- [ ] Browser back button works correctly
- [ ] Direct URL access works (e.g., sharing a link)
- [ ] 404 page shown for non-existent pieces

#### Content Display
- [ ] Hero section: Large image (aspect ratio 16:9 or original), title overlay on gradient
- [ ] Metadata section: Date, techniques (badges), colors (swatches), textures (tags)
- [ ] Main description from frontmatter displayed prominently
- [ ] Full markdown content rendered (Story, Process Notes sections)
- [ ] If `aiDescription` exists and is not empty, show it in a special "AI Perspective" section
- [ ] If no `aiDescription`, don't show the AI section at all

#### Image Gallery
- [ ] Detail images displayed as thumbnail grid (2-4 columns depending on screen size)
- [ ] Clicking thumbnail opens lightbox viewer with full-size image
- [ ] Lightbox features: Close button (X), keyboard ESC to close, click outside to close
- [ ] Left/right arrows to navigate between images in lightbox
- [ ] Keyboard navigation: Arrow keys for prev/next, ESC to close
- [ ] Accessibility: Focus trap in lightbox, proper ARIA labels
- [ ] Smooth fade-in/out transitions (300ms)

#### Layout & Design
- [ ] Responsive: Single column mobile, two-column desktop (60% content, 40% sidebar for metadata)
- [ ] Maximum content width: 1200px, centered
- [ ] Consistent theme support (light/dark themes)
- [ ] Typography: Georgia serif for headings, system sans for body
- [ ] Color palette: Clay colors from constitution
- [ ] Spacing: Consistent with gallery page

### Gallery Filtering & Sorting

#### Filter Controls
- [ ] Filter bar above gallery grid (sticky on scroll, optional)
- [ ] "Filter by Technique" dropdown/pills showing all available techniques
- [ ] "Filter by Color" dropdown/pills showing all available colors
- [ ] "Show Featured Only" toggle checkbox
- [ ] "Clear Filters" button (appears when filters active)
- [ ] Active filter count badge (e.g., "2 filters active")
- [ ] Filters work together (AND logic: show pieces matching ALL selected filters)

#### Sort Controls
- [ ] Sort dropdown: "Newest First" (default), "Oldest First", "Title A-Z", "Title Z-A", "Featured First"
- [ ] Sort persists in URL query param (e.g., `?sort=title-asc`)
- [ ] Changing sort updates URL and gallery immediately

#### Interaction & Performance
- [ ] Filtering/sorting is instant (no page reload)
- [ ] URL reflects current filter/sort state (shareable, bookmarkable)
- [ ] "No results" message shown if filters yield zero pieces
- [ ] Animations: Cards fade out/in when filtering (stagger by 50ms)
- [ ] Accessibility: Filter controls keyboard navigable, screen reader friendly

### AI Description Preparation (No API Integration Yet)

#### Schema & Content
- [ ] `aiDescription` field already exists in schema (optional, default empty string)
- [ ] Detail page template conditionally renders "AI Perspective" section if `aiDescription` present
- [ ] Section clearly labeled as "AI-Generated Perspective" with disclaimer
- [ ] Styling: Subtle different background to distinguish from artist's description

#### Future Integration Hooks
- [ ] Document in spec how AI integration will work (build-time script, not runtime)
- [ ] Create placeholder in detail page for AI content
- [ ] Tests verify AI section appears only when `aiDescription` is non-empty
- [ ] Tests verify fallback to manual description when AI fails

---

## Non-Functional Requirements

### Performance
- [ ] Detail pages load in <1.5s on 3G connection
- [ ] Lighthouse scores remain ≥90 for all metrics
- [ ] Images lazy-loaded appropriately
- [ ] No layout shift (CLS = 0)

### Accessibility (WCAG 2.1 AA)
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible and clear
- [ ] ARIA labels for all controls
- [ ] Color contrast ratio ≥4.5:1 for normal text
- [ ] Screen reader tested (VoiceOver or NVDA)

### SEO
- [ ] Each detail page has unique `<title>` and `<meta description>`
- [ ] Open Graph tags for social sharing (og:image, og:title, og:description)
- [ ] Semantic HTML (article, section, header, nav)
- [ ] Canonical URLs set correctly

### Browser Support
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

---

## Technical Design Notes

### File Structure
```
src/
  pages/
    gallery/
      [slug].astro          # Dynamic detail page
      index.astro           # Gallery (update with filters/sort)
  components/
    GalleryFilters.astro    # Filter/sort controls
    ImageGallery.astro      # Lightbox image viewer
    PieceMetadata.astro     # Metadata display component
  scripts/
    gallery-filters.ts      # Filtering/sorting logic
    lightbox.ts             # Image gallery logic
```

### Dynamic Routing Strategy
- Use Astro's `getStaticPaths()` to generate pages at build time
- Extract slug from `piece.id` (e.g., `pieces/piece-01-earth-vessel.md` → `earth-vessel`)
- Pass piece data as props to detail page template

### State Management (No Libraries)
- Use URL query params for filter/sort state (`?technique=hand-building&sort=date-desc`)
- Use `history.pushState()` to update URL without reload
- Read query params on page load to restore state
- Use vanilla JavaScript event listeners for interactions

### AI Description Future Integration (Article V)
**Build-time approach** (constitutional requirement):
1. Script runs during `npm run build`
2. Reads all piece markdown files
3. For pieces with empty `aiDescription`, calls Claude API
4. Writes AI-generated description back to frontmatter
5. Build continues with updated files
6. No runtime API calls (keeps it static, fast, free)

**Fallback strategy**:
- Manual `description` always required (never rely solely on AI)
- If AI fails/unavailable, site still works perfectly
- Artist can override AI description by editing markdown

---

## Constitutional Compliance Checklist

### Article I: Simplicity (≤3 components)
- [ ] No new frameworks (using Astro + React + Tailwind only) ✅
- [ ] No state management libraries (vanilla JS for filtering) ✅
- [ ] No image gallery library (custom lightbox with vanilla JS) ✅

### Article II: Content as Data
- [ ] Detail pages generated from markdown files ✅
- [ ] No database required ✅
- [ ] Artist can add images by editing frontmatter ✅

### Article III: Test-First
- [ ] Tests written BEFORE implementation
- [ ] User approves tests before coding begins
- [ ] RED phase confirmed (tests fail initially)

### Article IV: Performance
- [ ] Lighthouse ≥90 verified after implementation
- [ ] Core Web Vitals remain excellent

### Article V: AI Enhancement (Preparation Only)
- [ ] AI description field exists in schema
- [ ] Detail page supports AI content
- [ ] Build-time integration strategy documented
- [ ] Fallback to manual description works

### Article VI: Maintainability
- [ ] High schooler can add new piece with images by editing markdown
- [ ] Plain language documentation for artist
- [ ] No complex build steps

### Article VII: Earthy Aesthetic
- [ ] Clay color palette used throughout
- [ ] Warm, organic feel maintained

### Article VIII: Observable
- [ ] CLI testable (`npm test`, `npm run build`)
- [ ] No hidden runtime dependencies

### Article IX: Amendments
- [ ] This spec documents all changes
- [ ] Approved before implementation begins

---

## Out of Scope (Future Features)

These are **NOT** included in Feature 003:
- ❌ Actual AI API integration (just structure for it)
- ❌ Search functionality (might be Feature 004)
- ❌ Related pieces suggestions
- ❌ Pagination (not needed with <50 pieces expected)
- ❌ Comments or visitor interaction
- ❌ E-commerce / selling functionality
- ❌ Social media integration beyond Open Graph tags

---

## Success Metrics

- [ ] All 168 existing tests still pass
- [ ] New tests added: ~60-80 tests (detail pages, filtering, sorting, lightbox)
- [ ] Total tests: ~230-250 passing
- [ ] Lighthouse scores: Homepage 100/100/96/100, Gallery 100/99/96/100, Detail page ≥90 all
- [ ] Build time: <10 seconds
- [ ] Detail pages generated: 1 per piece (currently 1, will scale)

---

## Implementation Phases

Following SDD methodology:

### Phase 0: Specification ← **WE ARE HERE**
- Define acceptance criteria
- Get user approval for scope

### Phase 1: Planning
- Design component structure
- Plan test suite
- Research Astro dynamic routes
- Create task breakdown

### Phase 2: Test Creation
- Write all tests (RED phase)
- User approves tests
- Confirm tests fail

### Phase 3: Implementation
- Build detail page template
- Implement filtering/sorting
- Build lightbox component
- Achieve GREEN phase (all tests pass)

### Phase 4: Documentation
- Update README
- Create artist guide for adding images
- Document AI integration plan for future

---

## Questions for User Approval

1. **Scope**: Is this feature set appropriate, or should we split it? (e.g., separate PRs for detail pages vs. filtering)
2. **AI Integration**: Agree to defer actual API integration to future feature? (Just prepare structure now)
3. **Filtering UI**: Prefer dropdowns, pills/tags, or checkboxes for filters?
4. **Image Lightbox**: Build custom or use a minimal library like GLightbox (~10KB)? (Custom = more work, more control)
5. **URL State**: Should filters/sort be in URL query params for shareability?

---

**Status**: Awaiting user review and approval before Phase 1 (Planning)

**Estimated Effort**:
- Planning: 2 hours
- Test Creation: 4 hours
- Implementation: 8-10 hours
- Documentation: 2 hours
- **Total**: ~16-18 hours over 3-5 sessions
