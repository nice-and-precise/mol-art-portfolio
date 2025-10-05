# Feature 003: Implementation Plan

**Phase**: Phase 1 - Planning
**Status**: In Progress
**Date**: 2025-10-05
**Dependencies**: Feature 002 (Gallery & Theme System)

---

## Overview

This document provides the detailed implementation plan for Feature 003: Detail Pages & Gallery Enhancements. Following the SDD methodology, this plan will guide test creation (Phase 2) and implementation (Phase 3).

---

## Technology Decisions

### Routing Strategy: Astro Dynamic Routes

**Decision**: Use Astro's `getStaticPaths()` for static site generation (SSG)

**Implementation**:
```typescript
// src/pages/gallery/[slug].astro
export async function getStaticPaths() {
  const pieces = await getCollection('pieces');
  return pieces.map(piece => ({
    params: { slug: piece.slug },
    props: { piece },
  }));
}
```

**Rationale**:
- ✅ Fully static (no SSR needed)
- ✅ SEO-friendly (each page pre-rendered)
- ✅ Fast performance (no runtime data fetching)
- ✅ Works with GitHub Pages deployment

**Slug Generation**:
- From: `pieces/piece-01-earth-vessel.md`
- To: `/gallery/earth-vessel`
- Astro automatically extracts slug from file path

### State Management: URL Query Params + Vanilla JS

**Decision**: No state management library, use URL as source of truth

**Implementation**:
```javascript
// Read state from URL
const params = new URLSearchParams(window.location.search);
const technique = params.get('technique');
const color = params.get('color');
const sort = params.get('sort') || 'date-desc';

// Update state
params.set('technique', 'hand-building');
history.pushState(null, '', `?${params.toString()}`);

// Trigger filter update
filterGallery();
```

**Rationale**:
- ✅ Shareable/bookmarkable URLs
- ✅ Browser back/forward works correctly
- ✅ No library dependencies (Article I: Simplicity)
- ✅ Easy to test (just parse URL strings)

### Lightbox Implementation: Custom Vanilla JS

**Decision**: Build custom lightbox component (no library)

**Rationale**:
- ✅ Full control over styling (matches clay theme)
- ✅ Learning opportunity
- ✅ Only ~100 lines of code
- ✅ No dependencies (Article I: Simplicity)
- ❌ Library alternative (GLightbox): Saves time but adds dependency

**Features**:
- Modal overlay with backdrop blur
- Image centering with max-width
- Previous/Next navigation
- Keyboard support (arrows, ESC)
- Focus trap for accessibility
- Close on backdrop click

### Component Structure

**New Components**:
1. `src/components/GalleryFilters.astro` - Filter/sort controls
2. `src/components/ImageGallery.astro` - Lightbox viewer
3. `src/components/PieceMetadata.astro` - Metadata display

**New Scripts**:
1. `src/scripts/gallery-filters.ts` - Filtering/sorting logic
2. `src/scripts/lightbox.ts` - Image gallery logic

**New Pages**:
1. `src/pages/gallery/[slug].astro` - Detail page template

---

## File Structure

```
mol-art-portfolio/
├── src/
│   ├── components/
│   │   ├── GalleryFilters.astro        # NEW: Filter/sort controls
│   │   ├── ImageGallery.astro          # NEW: Lightbox component
│   │   ├── PieceMetadata.astro         # NEW: Metadata display
│   │   ├── ThemeToggle.astro           # Existing
│   │   └── (others...)
│   │
│   ├── pages/
│   │   ├── gallery/
│   │   │   ├── [slug].astro            # NEW: Dynamic detail page
│   │   │   └── index.astro             # MODIFY: Add filters/sort
│   │   ├── index.astro                 # Existing
│   │   └── (others...)
│   │
│   ├── scripts/
│   │   ├── gallery-filters.ts          # NEW: Filter/sort logic
│   │   ├── lightbox.ts                 # NEW: Lightbox logic
│   │   └── theme.ts                    # Existing
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro            # Existing (no changes)
│   │
│   └── content/
│       ├── config.ts                   # Existing (schema already has aiDescription)
│       └── pieces/
│           └── piece-01-earth-vessel.md # Existing (has detailImages array)
│
├── tests/
│   ├── unit/
│   │   ├── gallery-filters.test.ts     # NEW: Filter logic tests
│   │   ├── lightbox.test.ts            # NEW: Lightbox tests
│   │   └── (existing tests...)
│   │
│   └── integration/
│       ├── detail-page.test.ts         # NEW: Detail page rendering
│       ├── gallery-filtering.test.ts   # NEW: Filter integration
│       └── (existing tests...)
│
└── specs/
    └── 003-detail-pages-and-enhancements/
        ├── README.md                   # ✅ Done
        ├── spec.md                     # ✅ Done
        ├── diagrams.md                 # ✅ Done
        ├── ai-integration-research.md  # ✅ Done
        ├── plan.md                     # ← WE ARE HERE
        └── tasks.md                    # Next step
```

---

## Data Model

### Content Schema (Existing - No Changes Needed)

```typescript
// src/content/config.ts - Already defined
const piecesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    techniques: z.array(z.string()).min(1),
    colors: z.array(z.string()).min(1),
    textures: z.array(z.string()).optional(),
    description: z.string(),
    aiDescription: z.string().optional().default(''),  // ← Already exists
    featured: z.boolean().default(false),
    mainImage: z.string(),
    detailImages: z.array(z.string()).optional().default([]),  // ← Already exists
  }),
});
```

**Perfect!** Schema already supports:
- ✅ `detailImages` array for lightbox
- ✅ `aiDescription` for future AI integration
- ✅ `featured` for filtering

### Filter State Interface

```typescript
// src/scripts/gallery-filters.ts
interface FilterState {
  techniques: string[];      // Selected techniques
  colors: string[];          // Selected colors
  featured: boolean | null;  // null = show all, true = featured only
  sort: SortOption;          // How to sort results
}

type SortOption =
  | 'date-desc'    // Newest first (default)
  | 'date-asc'     // Oldest first
  | 'title-asc'    // A-Z
  | 'title-desc'   // Z-A
  | 'featured';    // Featured first, then by date

interface FilterOptions {
  availableTechniques: string[];  // All unique techniques from content
  availableColors: string[];      // All unique colors from content
}
```

### Lightbox State Interface

```typescript
// src/scripts/lightbox.ts
interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  images: LightboxImage[];
}

interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}
```

---

## Component Design

### 1. GalleryFilters.astro

**Purpose**: UI controls for filtering and sorting the gallery

**Props**:
```typescript
interface Props {
  allTechniques: string[];  // Unique techniques from all pieces
  allColors: string[];      // Unique colors from all pieces
}
```

**Rendered HTML Structure**:
```html
<div class="gallery-filters">
  <!-- Filter Section -->
  <div class="filter-section">
    <label>Technique</label>
    <div class="filter-pills">
      <button data-technique="hand-building">hand-building</button>
      <button data-technique="wheel-throwing">wheel-throwing</button>
      <!-- ... -->
    </div>
  </div>

  <div class="filter-section">
    <label>Color</label>
    <div class="filter-pills">
      <button data-color="terracotta">terracotta</button>
      <button data-color="celadon">celadon</button>
      <!-- ... -->
    </div>
  </div>

  <div class="filter-section">
    <label>
      <input type="checkbox" id="featured-only" />
      Featured Only
    </label>
  </div>

  <!-- Sort Section -->
  <div class="sort-section">
    <label for="sort-select">Sort By</label>
    <select id="sort-select">
      <option value="date-desc">Newest First</option>
      <option value="date-asc">Oldest First</option>
      <option value="title-asc">Title A-Z</option>
      <option value="title-desc">Title Z-A</option>
      <option value="featured">Featured First</option>
    </select>
  </div>

  <!-- Active Filters -->
  <div class="active-filters">
    <span class="filter-count">2 filters active</span>
    <button class="clear-filters">Clear All</button>
  </div>
</div>
```

**Styling**:
- Sticky on scroll (optional)
- Pill buttons with clay colors
- Active state: terracotta border
- Responsive: Stack vertically on mobile

### 2. ImageGallery.astro

**Purpose**: Display detail images as thumbnails, open lightbox on click

**Props**:
```typescript
interface Props {
  images: string[];  // Array of image paths from detailImages
  mainImage: string; // Main image (shown first)
  title: string;     // For alt text
}
```

**Rendered HTML**:
```html
<div class="image-gallery">
  <div class="thumbnail-grid">
    <button class="thumbnail" data-index="0">
      <img src="main.jpg" alt="Earth Vessel - main view" />
    </button>
    <button class="thumbnail" data-index="1">
      <img src="detail-1.jpg" alt="Earth Vessel - detail" />
    </button>
    <!-- ... -->
  </div>
</div>

<!-- Lightbox Modal (hidden by default) -->
<div id="lightbox" class="lightbox" aria-hidden="true">
  <div class="lightbox-backdrop"></div>
  <div class="lightbox-content">
    <button class="lightbox-close" aria-label="Close">×</button>
    <button class="lightbox-prev" aria-label="Previous">‹</button>
    <img class="lightbox-image" src="" alt="" />
    <button class="lightbox-next" aria-label="Next">›</button>
    <div class="lightbox-caption"></div>
  </div>
</div>
```

**Client Script**: `src/scripts/lightbox.ts`

### 3. PieceMetadata.astro

**Purpose**: Display pottery piece metadata in sidebar

**Props**:
```typescript
interface Props {
  date: Date;
  techniques: string[];
  colors: string[];
  textures?: string[];
}
```

**Rendered HTML**:
```html
<aside class="piece-metadata">
  <div class="metadata-section">
    <h3>Details</h3>
    <dl>
      <dt>Date</dt>
      <dd>{formatDate(date)}</dd>

      <dt>Techniques</dt>
      <dd>
        <span class="badge">hand-building</span>
        <span class="badge">slip decoration</span>
      </dd>

      <dt>Colors</dt>
      <dd>
        <span class="color-swatch" style="background: terracotta"></span>
        <span class="color-swatch" style="background: cream"></span>
      </dd>

      <dt>Textures</dt>
      <dd>rough, organic</dd>
    </dl>
  </div>
</aside>
```

### 4. Detail Page ([slug].astro)

**Layout Structure**:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import PieceMetadata from '../../components/PieceMetadata.astro';
import ImageGallery from '../../components/ImageGallery.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const pieces = await getCollection('pieces');
  return pieces.map(piece => ({
    params: { slug: piece.slug },
    props: { piece },
  }));
}

const { piece } = Astro.props;
const { Content } = await piece.render();
---

<BaseLayout title={`${piece.data.title} - Mol_Art`}>
  <!-- Back Button -->
  <a href="/gallery" class="back-button">← Back to Gallery</a>

  <!-- Hero Section -->
  <section class="hero">
    <img src={piece.data.mainImage} alt={piece.data.title} />
    <div class="hero-overlay">
      <h1>{piece.data.title}</h1>
    </div>
  </section>

  <!-- Main Content + Sidebar -->
  <div class="detail-layout">
    <main class="content">
      <!-- Description -->
      <section>
        <p class="lead">{piece.data.description}</p>
      </section>

      <!-- Markdown Content (Story, Process Notes) -->
      <section class="markdown-content">
        <Content />
      </section>

      <!-- AI Perspective (if exists) -->
      {piece.data.aiDescription && (
        <section class="ai-section">
          <h2>AI Perspective</h2>
          <p>{piece.data.aiDescription}</p>
          <small>Generated by Claude AI</small>
        </section>
      )}
    </main>

    <!-- Sidebar -->
    <aside>
      <PieceMetadata {...piece.data} />
    </aside>
  </div>

  <!-- Image Gallery -->
  <ImageGallery
    images={piece.data.detailImages}
    mainImage={piece.data.mainImage}
    title={piece.data.title}
  />
</BaseLayout>
```

---

## Client-Side Scripts

### gallery-filters.ts

**Responsibilities**:
1. Read filter/sort state from URL on page load
2. Apply filters to gallery cards (hide/show)
3. Apply sorting (reorder DOM)
4. Update URL when filters change
5. Handle "Clear All" button

**Key Functions**:
```typescript
// Initialize filters from URL
export function initFilters(): void

// Apply filters to gallery
export function filterGallery(state: FilterState): void

// Update URL without page reload
export function updateURL(state: FilterState): void

// Get all available filter options from DOM
export function getFilterOptions(): FilterOptions

// Sort pieces array
export function sortPieces(pieces: Element[], sort: SortOption): Element[]
```

### lightbox.ts

**Responsibilities**:
1. Open lightbox when thumbnail clicked
2. Display correct image
3. Handle prev/next navigation
4. Handle keyboard events (arrows, ESC)
5. Trap focus within lightbox
6. Lock body scroll when open

**Key Functions**:
```typescript
// Initialize lightbox event listeners
export function initLightbox(images: LightboxImage[]): void

// Open lightbox at specific index
export function openLightbox(index: number): void

// Close lightbox
export function closeLightbox(): void

// Navigate to next/previous image
export function nextImage(): void
export function prevImage(): void

// Handle keyboard events
export function handleKeyboard(event: KeyboardEvent): void
```

---

## Styling Approach

### CSS Variables (Theme Support)

Extend existing theme CSS variables:

```css
:root[data-theme="light"] {
  --bg-page: #faf8f5;
  --bg-card: #ffffff;
  --text-title: #3d2f24;
  --text-body: #6b5544;
  --color-accent: #9c8671;
  --color-badge: #d4c4b0;

  /* NEW for lightbox */
  --lightbox-backdrop: rgba(0, 0, 0, 0.85);
  --lightbox-bg: #ffffff;
}

:root[data-theme="dark"] {
  --bg-page: #1a1410;
  --bg-card: #2d2419;
  --text-title: #f5f1ea;
  --text-body: #d4c4b0;
  --color-accent: #9c8671;
  --color-badge: #3d2f24;

  /* NEW for lightbox */
  --lightbox-backdrop: rgba(0, 0, 0, 0.95);
  --lightbox-bg: #2d2419;
}
```

### Responsive Breakpoints

```css
/* Mobile: < 640px */
.detail-layout {
  display: block;
}

/* Tablet: 640px - 1024px */
@media (min-width: 640px) {
  .thumbnail-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Desktop: > 1024px */
@media (min-width: 1024px) {
  .detail-layout {
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 3rem;
  }

  .thumbnail-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## Accessibility Implementation

### ARIA Labels

```html
<!-- Filter Pills -->
<button
  role="button"
  aria-pressed="false"
  aria-label="Filter by hand-building technique"
  data-technique="hand-building"
>
  hand-building
</button>

<!-- Lightbox -->
<div
  id="lightbox"
  role="dialog"
  aria-modal="true"
  aria-labelledby="lightbox-title"
  aria-hidden="true"
>
  <h2 id="lightbox-title" class="sr-only">Image Gallery</h2>
  <!-- ... -->
</div>
```

### Focus Management

**Lightbox Focus Trap**:
```typescript
function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate through focusable elements |
| `Enter` / `Space` | Activate button/link |
| `Escape` | Close lightbox, clear filters |
| `Arrow Left` | Previous image in lightbox |
| `Arrow Right` | Next image in lightbox |

---

## Performance Optimizations

### Image Loading Strategy

```html
<!-- Gallery: Lazy load thumbnails -->
<img src="image.jpg" loading="lazy" />

<!-- Detail page: Eager load hero image, lazy load others -->
<img src="hero.jpg" loading="eager" />  <!-- Above fold -->
<img src="detail-1.jpg" loading="lazy" />  <!-- Below fold -->
```

### CSS Containment

```css
.pottery-card {
  contain: layout style paint;  /* Isolate repaints */
}

.lightbox-content {
  contain: layout;  /* Optimize lightbox rendering */
}
```

### Debouncing (If Needed for Search)

```typescript
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Usage: const debouncedFilter = debounce(filterGallery, 300);
```

---

## Testing Strategy

### Test Files to Create

1. **Unit Tests**:
   - `tests/unit/gallery-filters.test.ts` (~25 tests)
   - `tests/unit/lightbox.test.ts` (~15 tests)

2. **Integration Tests**:
   - `tests/integration/detail-page.test.ts` (~30 tests)
   - `tests/integration/gallery-filtering.test.ts` (~20 tests)

### Test Coverage Goals

| Category | Tests | Focus Areas |
|----------|-------|-------------|
| Filter Logic | 25 | URL parsing, filter application, sorting |
| Lightbox | 15 | Open/close, navigation, keyboard |
| Detail Page | 30 | Rendering, routing, content display |
| Gallery Integration | 20 | Filters + cards, URL state, animations |
| **TOTAL NEW** | **~90** | Comprehensive coverage |

**Total After Feature 003**: 168 (current) + 90 (new) = **~258 tests**

---

## Implementation Order

Following TDD (Test-Driven Development):

### Step 1: Filtering & Sorting (Simpler, No New Routes)
1. Write tests for `gallery-filters.ts`
2. Implement filter logic
3. Write tests for filter UI integration
4. Add `GalleryFilters.astro` component
5. Update `gallery/index.astro` to use filters
6. Verify all filter tests pass

### Step 2: Detail Pages (New Routes)
1. Write tests for detail page rendering
2. Create `[slug].astro` template
3. Implement `PieceMetadata.astro` component
4. Test routing, content rendering, SEO tags
5. Verify all detail page tests pass

### Step 3: Image Gallery & Lightbox (Most Complex)
1. Write tests for `lightbox.ts`
2. Implement lightbox logic
3. Write tests for `ImageGallery.astro`
4. Create `ImageGallery.astro` component
5. Test keyboard nav, focus trap, accessibility
6. Verify all lightbox tests pass

### Step 4: Integration & Polish
1. Test full user flows (gallery → filter → detail → lightbox)
2. Accessibility audit (screen reader, keyboard-only)
3. Performance testing (Lighthouse)
4. Cross-browser testing
5. Documentation updates

---

## Migration Path

### Changes to Existing Files

**src/pages/gallery/index.astro**:
```diff
---
import BaseLayout from '../layouts/BaseLayout.astro';
+import GalleryFilters from '../components/GalleryFilters.astro';
import { getCollection } from 'astro:content';

const pieces = await getCollection('pieces');
const sortedPieces = pieces.sort((a, b) =>
  b.data.date.getTime() - a.data.date.getTime()
);

+// Extract unique techniques and colors for filters
+const allTechniques = [...new Set(pieces.flatMap(p => p.data.techniques))];
+const allColors = [...new Set(pieces.flatMap(p => p.data.colors))];
---

<BaseLayout title="Gallery">
+  <GalleryFilters
+    allTechniques={allTechniques}
+    allColors={allColors}
+  />
+
  <div class="gallery-grid">
    {sortedPieces.map((piece) => (
-      <article ... data-piece-id={piece.id}>
+      <article ... data-piece-id={piece.id} data-techniques={JSON.stringify(piece.data.techniques)} data-colors={JSON.stringify(piece.data.colors)} data-featured={piece.data.featured}>
+        <a href={`/gallery/${piece.slug}`}>
          <!-- Card content -->
+        </a>
      </article>
    ))}
  </div>
+
+  <script src="../scripts/gallery-filters.ts"></script>
</BaseLayout>
```

**No changes needed**:
- `src/content/config.ts` (schema already perfect)
- `src/layouts/BaseLayout.astro` (theme system already works)
- `src/scripts/theme.ts` (no conflicts)

---

## Risk Assessment & Mitigation

### Risk 1: URL State Management Complexity
**Risk**: URL params might conflict with browser history
**Mitigation**: Use `history.pushState()` correctly, test back button extensively
**Fallback**: If too complex, use local state only (no URL params)

### Risk 2: Lightbox Accessibility
**Risk**: Focus trap might break with screen readers
**Mitigation**: Follow ARIA Authoring Practices Guide, test with NVDA/VoiceOver
**Fallback**: Link to full-size images in new tab (degraded but accessible)

### Risk 3: Performance with Many Pieces
**Risk**: Filtering 100+ pieces might lag
**Mitigation**: CSS containment, debouncing, virtual scrolling if needed
**Fallback**: Pagination (but not in Feature 003 scope)

### Risk 4: Build Time Increase
**Risk**: Generating many detail pages slows build
**Mitigation**: Monitor build time, optimize if >15 seconds
**Current**: 4.5s for 2 pages → estimate 8-10s for 10-15 pages (acceptable)

---

## Success Criteria (Phase 1)

- [x] Technology decisions documented
- [x] Component structure defined
- [x] File organization planned
- [x] Data model validated (existing schema works!)
- [x] Accessibility strategy defined
- [x] Testing strategy outlined
- [x] Implementation order determined
- [ ] User approval for Phase 1 plan ← **NEXT STEP**

---

**Next Step**: Create detailed task breakdown in `tasks.md`

**Status**: Phase 1 (Planning) - Ready for user review
