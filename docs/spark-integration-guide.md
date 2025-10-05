# GitHub Spark Integration Guide

**Purpose**: Use GitHub Spark to visually design UI components before formal SDD implementation.

---

## When to Use Spark

Use Spark for **visual iteration** on:
- Gallery layouts and card designs
- Color palette refinement
- Typography hierarchy
- Hover states and interactions
- Responsive breakpoints
- Component spacing and proportions

**Do NOT use Spark for**:
- Backend logic
- Content collections
- Build configuration
- Test writing

---

## Current Foundation (What Spark Can Build On)

### ✅ Established Systems

**Color Palette** (from `tailwind.config.cjs`):
```javascript
colors: {
  clay: {
    50: '#faf8f5',   // cream
    100: '#f5f1ea',  // light clay
    300: '#d4c4b0',  // warm tan
    500: '#9c8671',  // terracotta
    700: '#6b5544',  // fired clay
    900: '#3d2f24',  // dark earth
  },
  glaze: {
    blue: '#7fa5a3',   // celadon
    green: '#8b9d83',  // sage
    cream: '#f0ebe3',  // matte white
  }
}
```

**Typography** (from `tailwind.config.cjs`):
```javascript
fontFamily: {
  serif: ['Georgia', 'Times New Roman', 'serif'],    // Headers
  sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],  // Body
}
```

**Responsive Breakpoints** (Tailwind defaults):
- Mobile: `< 768px`
- Tablet: `768px - 1023px`
- Desktop: `≥ 1024px`

---

## Example Pottery Data for Spark

Copy this example to test designs in Spark:

```json
{
  "pieces": [
    {
      "id": "piece-01",
      "title": "Earth Vessel",
      "date": "2025-03-15",
      "techniques": ["hand-building", "slip decoration", "reduction firing"],
      "colors": ["terracotta", "cream", "rust"],
      "textures": ["rough", "organic"],
      "description": "Hand-built vessel inspired by ancient earthenware forms. Features natural clay texture with slip decoration in warm earth tones. The organic shape and earth colors create a grounding, timeless piece.",
      "featured": true,
      "mainImage": "https://placeholder.com/600x600",
      "detailImages": [
        "https://placeholder.com/600x600",
        "https://placeholder.com/600x600"
      ]
    },
    {
      "id": "piece-02",
      "title": "Spiral Form",
      "date": "2025-02-10",
      "techniques": ["wheel-throwing", "carving", "glazing"],
      "colors": ["celadon", "sage green"],
      "textures": ["smooth", "glossy"],
      "description": "Wheel-thrown form with carved spiral patterns. Celadon glaze creates a smooth, glossy finish that highlights the intricate surface details.",
      "featured": false,
      "mainImage": "https://placeholder.com/600x600",
      "detailImages": []
    },
    {
      "id": "piece-03",
      "title": "Textured Bowl",
      "date": "2025-01-20",
      "techniques": ["hand-building", "pit firing"],
      "colors": ["charcoal", "cream", "rust"],
      "textures": ["rough", "crackled"],
      "description": "Hand-built bowl with natural texture from pit firing. The firing process created unique color variations and crackle patterns.",
      "featured": false,
      "mainImage": "https://placeholder.com/600x600",
      "detailImages": []
    }
  ]
}
```

---

## Prompts for Spark

### Phase 1: Gallery Layout

**Prompt**:
```
Create a responsive pottery gallery for a high school ceramic artist.

DESIGN REQUIREMENTS:
- 3 pottery pieces in a masonry/grid layout
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Earthy aesthetic with warm clay colors

COLOR PALETTE (use these exact colors):
- Background: #faf8f5 (cream)
- Cards: #ffffff (white)
- Text: #3d2f24 (dark earth)
- Accent: #9c8671 (terracotta)
- Hover: #6b5544 (fired clay)

TYPOGRAPHY:
- Headers: Georgia serif font
- Body: System UI sans-serif font
- Minimum font size: 16px

EACH POTTERY CARD SHOULD SHOW:
- Square image placeholder (aspect-ratio 1:1)
- Title (large serif font)
- Techniques as small rounded badges
- Description (3 lines max with ellipsis)

HOVER EFFECT:
- Gentle shadow increase
- Smooth transition (300ms)

SPACING:
- Card gap: 2rem (32px)
- Card padding: 1.5rem (24px)
- Section margins: 3rem (48px)

DATA: Use the JSON data provided above.
```

### Phase 2: Piece Detail View

**Prompt**:
```
Create a pottery piece detail page with earthy aesthetic.

LAYOUT:
- Two-column layout on desktop
- Left: Large image with thumbnail gallery below
- Right: Title, metadata, description, process notes

COLORS: Use the clay palette from Gallery phase

COMPONENTS:
- Image gallery with main image + thumbnails
- Technique badges (same style as gallery)
- Color swatches showing actual pottery colors
- "Back to Gallery" button

TYPOGRAPHY:
- H1: Georgia serif, 3rem
- Body: System sans, 1.125rem
- Process notes: Slightly smaller, 1rem

DATA: Use the "Earth Vessel" object from the JSON above.
```

### Phase 3: Hero Section

**Prompt**:
```
Create a hero section for pottery portfolio homepage.

DESIGN:
- Center-aligned
- Large serif "Mol_Art" title (5rem)
- Subtitle: "Handcrafted Ceramic Art" (1.25rem)
- Subtle cream background (#faf8f5)
- Generous whitespace (4rem padding)

OPTIONAL:
- Featured pottery piece faintly in background
- Subtle texture overlay (like canvas/clay)

COLORS: Clay palette from previous phases
FONTS: Georgia for title, system sans for subtitle
```

---

## Design Principles (Article VII: Earthy Aesthetic)

**Spark designs should embody**:

✅ **Warm Earth Tones**
- Terracotta, cream, warm tans (not cool grays/blues)
- Muted saturation (not neon or vibrant)
- Natural color progression

✅ **Organic Shapes**
- Rounded corners (8px minimum)
- Soft shadows (not harsh)
- Gentle curves (not sharp angles)

✅ **Generous Whitespace**
- Let pottery "breathe" on the page
- Minimum 2rem between sections
- Avoid cramped layouts

✅ **Handcrafted Feel**
- Serif fonts for personality
- Subtle texture hints (if possible)
- Avoid overly "digital" aesthetics

✅ **Accessibility**
- Minimum 16px font size
- Color contrast ≥ 4.5:1
- Touch targets ≥ 44px

---

## Exporting from Spark to Astro

After designing in Spark:

### 1. Extract Component Structure
```astro
---
// src/components/PotteryCard.astro
interface Props {
  piece: {
    title: string;
    techniques: string[];
    description: string;
    mainImage: string;
  };
}

const { piece } = Astro.props;
---

<!-- Copy HTML structure from Spark -->
<article class="...">
  <!-- Spark-designed layout goes here -->
</article>
```

### 2. Extract Styles
Spark generates inline styles or classes. Convert to Tailwind utilities:

**Spark might output**:
```html
<div style="background-color: #faf8f5; padding: 32px;">
```

**Convert to Tailwind**:
```html
<div class="bg-clay-50 p-8">
```

### 3. Map Colors
| Spark Color | Tailwind Utility |
|-------------|------------------|
| `#faf8f5` | `bg-clay-50` or `text-clay-50` |
| `#f5f1ea` | `bg-clay-100` |
| `#d4c4b0` | `bg-clay-300` |
| `#9c8671` | `bg-clay-500` (main terracotta) |
| `#6b5544` | `bg-clay-700` |
| `#3d2f24` | `bg-clay-900` (dark text) |

### 4. Create Specification
After Spark design is approved, create formal spec:

```bash
# In conversation
/specify Gallery component based on Spark prototype:
- Responsive grid layout (1/2/3 columns)
- Card design with image, title, badges, description
- Hover effects with shadow transition
- Earthy color palette applied
```

Then follow normal SDD flow: plan → tasks → tests → implement.

---

## Constitutional Compliance Checklist for Spark Designs

Before translating Spark design to production:

- [ ] **Article I**: Design doesn't require new libraries (beyond Astro/React/Tailwind)
- [ ] **Article VI**: Design simple enough for artist to understand and modify
- [ ] **Article VII**: Uses clay color palette (not arbitrary colors)
- [ ] **Article VII**: Earthy aesthetic maintained (organic, warm, handcrafted feel)
- [ ] **Article VIII**: Components can be tested via CLI (visual regression tests)

---

## Iteration Workflow with Spark

```
┌─────────────────┐
│  1. Design in   │
│  GitHub Spark   │ ← Iterate quickly on visuals
└────────┬────────┘
         │
         ↓ (Designer happy with prototype)
┌─────────────────┐
│  2. Screenshot  │
│  & Document     │ ← Save Spark output, take screenshots
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  3. /specify    │
│  Component      │ ← Create formal specification
└────────┬────────┘
         │
         ↓ (Human approves spec)
┌─────────────────┐
│  4. Extract &   │
│  Implement      │ ← Build production component in Astro
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  5. Compare to  │
│  Spark Mockup   │ ← Ensure fidelity to design
└─────────────────┘
```

---

## Example: Spark → Astro Translation

### Spark Generates:
```html
<div class="pottery-card">
  <img src="..." alt="..." />
  <h2>Earth Vessel</h2>
  <div class="badges">
    <span>hand-building</span>
    <span>slip decoration</span>
  </div>
  <p>Hand-built vessel...</p>
</div>

<style>
.pottery-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.badges span {
  background: #d4c4b0;
  padding: 8px 12px;
  border-radius: 16px;
}
</style>
```

### Translate to Astro + Tailwind:
```astro
---
interface Props {
  piece: PotteryPiece;
}
const { piece } = Astro.props;
---

<article class="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
  <img src={piece.mainImage} alt={piece.title} class="aspect-square w-full" />
  <h2 class="text-2xl font-serif font-bold text-clay-900 mt-4">
    {piece.title}
  </h2>
  <div class="flex flex-wrap gap-2 mt-2">
    {piece.techniques.map(tech => (
      <span class="bg-clay-300 text-clay-900 px-3 py-2 rounded-full text-sm">
        {tech}
      </span>
    ))}
  </div>
  <p class="text-clay-700 mt-3 line-clamp-3">
    {piece.description}
  </p>
</article>
```

---

## Files to Reference in Spark

**Give Spark these files for context**:
1. `tailwind.config.cjs` - For color palette and fonts
2. `src/content/pieces/piece-01-earth-vessel.md` - For real data example
3. This guide - For design principles

**Spark can use**:
- Color codes directly (#faf8f5, etc.)
- Font families (Georgia, system-ui)
- Spacing values (in px or rem)
- Sample content from markdown

---

## Next Steps

### Ready to Start with Spark:

1. **Open GitHub Spark**
2. **Use Phase 1 Prompt** (Gallery Layout)
3. **Paste example JSON data**
4. **Iterate** until design feels right
5. **Screenshot final design**
6. **Return to SDD**: `/specify Gallery component from Spark prototype`

Then we'll follow the standard SDD process to build the production version!

---

## Success Criteria

Spark design is ready when:
- ✅ Artist says "wow" at the visual design
- ✅ Colors match clay palette exactly
- ✅ Typography feels artisanal (serif headers)
- ✅ Layout is responsive (mobile → tablet → desktop)
- ✅ Spacing feels generous (pottery has room to breathe)
- ✅ Design feels handcrafted, not generic

**Then we specify, test, and implement!**
