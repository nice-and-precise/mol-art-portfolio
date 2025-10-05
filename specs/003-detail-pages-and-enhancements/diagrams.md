# Feature 003: Visual Diagrams & Mockups

This document provides visual diagrams to illustrate the Feature 003 implementation.

---

## User Flow Diagram

```mermaid
flowchart TD
    A[Homepage] --> B[Gallery Page]
    B --> C{User Action}

    C -->|Click Card| D[Detail Page]
    C -->|Apply Filter| E[Filtered Gallery]
    C -->|Change Sort| F[Sorted Gallery]

    E --> C
    F --> C

    D --> G{User Action on Detail}
    G -->|Back Button| B
    G -->|Click Image| H[Lightbox Viewer]
    G -->|Browser Back| B

    H -->|Close/ESC| D
    H -->|Arrow Keys| I[Next/Prev Image]
    I --> H

    style A fill:#f5f1ea
    style B fill:#9c8671,color:#fff
    style D fill:#9c8671,color:#fff
    style H fill:#7fa5a3,color:#fff
```

---

## Component Architecture

```mermaid
graph TB
    subgraph Gallery["Gallery Page (index.astro)"]
        GF[GalleryFilters.astro<br/>Filter/Sort Controls]
        GC[Gallery Cards Grid<br/>Existing Component]
    end

    subgraph Detail["Detail Page ([slug].astro)"]
        DH[Hero Section<br/>Large Image + Title]
        PM[PieceMetadata.astro<br/>Date, Techniques, Colors]
        DC[Description Content<br/>Markdown Rendered]
        AI[AI Perspective Section<br/>Conditional]
        IG[ImageGallery.astro<br/>Thumbnail Grid]
    end

    subgraph Scripts["Client Scripts"]
        GFS[gallery-filters.ts<br/>Filtering/Sorting Logic]
        LB[lightbox.ts<br/>Image Viewer Logic]
    end

    GF --> GFS
    IG --> LB
    GC -.clicks.-> Detail

    style GF fill:#d4c4b0
    style GFS fill:#8b9d83
    style IG fill:#d4c4b0
    style LB fill:#8b9d83
    style AI fill:#7fa5a3,color:#fff
```

---

## Data Flow: Gallery Filtering

```mermaid
sequenceDiagram
    participant User
    participant FilterUI as Filter Controls
    participant Script as gallery-filters.ts
    participant URL as Browser URL
    participant DOM as Gallery Grid

    User->>FilterUI: Selects "hand-building"
    FilterUI->>Script: Filter change event
    Script->>Script: Update filter state
    Script->>URL: pushState(?technique=hand-building)
    Script->>DOM: Filter pieces array
    DOM->>DOM: Hide non-matching cards
    DOM->>User: Show filtered results (fade animation)

    User->>FilterUI: Selects "terracotta" color
    FilterUI->>Script: Add color filter
    Script->>URL: pushState(?technique=hand-building&color=terracotta)
    Script->>DOM: Apply both filters (AND logic)
    DOM->>User: Show pieces matching BOTH filters

    User->>FilterUI: Clicks "Clear Filters"
    FilterUI->>Script: Clear all filters
    Script->>URL: pushState(/gallery)
    Script->>DOM: Show all cards
    DOM->>User: Full gallery visible
```

---

## Page Layout: Detail Page

```
┌─────────────────────────────────────────────────────────────┐
│ [← Back to Gallery]                      [🌙 Theme Toggle] │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ╔════════════════════════════════════════════════════════╗ │
│  ║                                                         ║ │
│  ║              HERO IMAGE (16:9)                          ║ │
│  ║                                                         ║ │
│  ║         Gradient Overlay with Title                    ║ │
│  ╚════════════════════════════════════════════════════════╝ │
│                                                              │
├──────────────────────┬──────────────────────────────────────┤
│                      │  METADATA SIDEBAR                   │
│  MAIN CONTENT        │  ┌────────────────────────────────┐ │
│  (60% width)         │  │ 📅 Date: March 15, 2025       │ │
│                      │  ├────────────────────────────────┤ │
│  📝 Description      │  │ 🔧 Techniques:                │ │
│  (From frontmatter)  │  │ [hand-building] [slip decor]  │ │
│                      │  ├────────────────────────────────┤ │
│  ───────────────     │  │ 🎨 Colors:                    │ │
│                      │  │ ⬛ terracotta  ⬛ cream        │ │
│  📖 Story Behind     │  ├────────────────────────────────┤ │
│  (Markdown content)  │  │ 🖐️ Textures:                  │ │
│                      │  │ rough, organic                 │ │
│  ───────────────     │  └────────────────────────────────┘ │
│                      │                    (40% width)      │
│  🔬 Process Notes    │                                      │
│  (Markdown content)  │                                      │
│                      │                                      │
│  ───────────────     │                                      │
│                      │                                      │
│  🤖 AI Perspective   │                                      │
│  (If aiDescription   │                                      │
│   exists)            │                                      │
│                      │                                      │
├──────────────────────┴──────────────────────────────────────┤
│                                                              │
│  🖼️ IMAGE GALLERY                                           │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                          │
│  │ IMG │ │ IMG │ │ IMG │ │ IMG │  (Click to enlarge)      │
│  └─────┘ └─────┘ └─────┘ └─────┘                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Gallery Filter UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│  GALLERY                                                     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │ FILTERS & SORT                              [2 active]│   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ 🔧 Technique: [All ▼] [hand-building] [wheel-throwing]   │
│  │ 🎨 Color: [All ▼] [terracotta] [cream] [celadon]         │
│  │ ⭐ [✓] Featured Only                                     │
│  │                                                          │
│  │ 📊 Sort: [Newest First ▼]   [Clear Filters]            │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Showing 3 of 12 pieces                                      │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │  CARD   │  │  CARD   │  │  CARD   │                     │
│  │  ✓✓✓    │  │  ✓✓✓    │  │  ✓✓✓    │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │  (More  │  │  cards  │  │  ...)   │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Lightbox Interaction States

```mermaid
stateDiagram-v2
    [*] --> Closed: Page loads
    Closed --> Opening: Click thumbnail
    Opening --> Open: Fade in (300ms)

    Open --> ViewingImage: Display image
    ViewingImage --> NextImage: Right arrow / Click right
    ViewingImage --> PrevImage: Left arrow / Click left
    NextImage --> ViewingImage: Load next
    PrevImage --> ViewingImage: Load previous

    ViewingImage --> Closing: ESC / Click X / Click outside
    Closing --> Closed: Fade out (300ms)
    Closed --> [*]

    note right of Open
        Focus trapped
        Body scroll locked
        Keyboard active
    end note
```

---

## URL State Management

```
Example URL patterns:

1. Gallery (default)
   /gallery

2. Gallery (filtered by technique)
   /gallery?technique=hand-building

3. Gallery (multiple filters + sort)
   /gallery?technique=hand-building&color=terracotta&sort=date-desc

4. Gallery (featured only)
   /gallery?featured=true

5. Detail page (direct link)
   /gallery/earth-vessel

6. Detail page (from filtered gallery - browser back preserves filters)
   Navigate: /gallery?technique=hand-building
   → Click card → /gallery/earth-vessel
   → Browser back → /gallery?technique=hand-building (preserved!)
```

---

## AI Description Integration (Future)

```mermaid
flowchart LR
    A[npm run build] --> B[prebuild script]
    B --> C{Read all pieces}

    C --> D{Check each piece}
    D -->|Has aiDescription| E[Skip - use existing]
    D -->|Empty aiDescription| F[Call Claude API]

    F --> G{API Success?}
    G -->|Yes| H[Write AI text to frontmatter]
    G -->|No| I[Log error, use manual description]

    E --> J[Continue build]
    H --> J
    I --> J

    J --> K[Generate static pages]
    K --> L[Deploy to GitHub Pages]

    style F fill:#7fa5a3,color:#fff
    style H fill:#9c8671,color:#fff
    style I fill:#d4c4b0
```

**Build-time AI Integration Strategy** (Article V compliance):
- No runtime API calls (keeps site static and fast)
- Falls back to manual description if AI fails
- Artist can override by editing markdown
- API key stored in `.env` (gitignored)
- Build script: `scripts/generate-ai-descriptions.js`

---

## Accessibility Features

```mermaid
mindmap
  root((Accessibility<br/>WCAG 2.1 AA))
    Keyboard Navigation
      Tab through filters
      Enter to apply
      Arrow keys in lightbox
      ESC to close lightbox
      Focus visible outlines
    Screen Readers
      ARIA labels on controls
      Alt text on images
      Semantic HTML
      Live regions for filter results
    Visual
      4.5:1 contrast ratio
      No color-only indicators
      Focus indicators
      Sufficient text size
    Motor
      Large click targets 44x44px
      No hover-only actions
      Works without mouse
```

---

## Performance Optimization

```mermaid
graph TD
    A[User clicks card] --> B{Image loaded?}
    B -->|No| C[Show skeleton loader]
    B -->|Yes| D[Navigate immediately]

    C --> E[Load image in background]
    E --> F[Image cached]
    F --> D

    D --> G[Detail page]
    G --> H[Lazy load detail images]
    H --> I[Load on viewport intersection]

    style C fill:#f5f1ea
    style F fill:#9c8671,color:#fff
```

**Optimization Techniques**:
- Lazy loading with `loading="lazy"`
- Intersection Observer for detail images
- Image caching via browser
- CSS containment for animations
- Debounced filter inputs (if search added later)

---

## Testing Strategy

```mermaid
graph LR
    subgraph Unit Tests
        U1[Filter logic]
        U2[Sort logic]
        U3[URL parsing]
        U4[Lightbox state]
    end

    subgraph Integration Tests
        I1[Detail page rendering]
        I2[Filter + Sort together]
        I3[Navigation flow]
        I4[Lightbox keyboard nav]
    end

    subgraph E2E Tests
        E1[Gallery → Detail → Back]
        E2[Apply filters → Share URL]
        E3[Lightbox full flow]
    end

    U1 --> I1
    U2 --> I2
    U3 --> I2
    U4 --> I4

    I1 --> E1
    I2 --> E2
    I4 --> E3

    style Unit Tests fill:#d4c4b0
    style Integration Tests fill:#9c8671,color:#fff
    style E2E Tests fill:#7fa5a3,color:#fff
```

---

**Next Step**: User reviews this spec and approves before moving to Phase 1 (Planning).
