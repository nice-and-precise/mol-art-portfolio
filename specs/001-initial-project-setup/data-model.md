# Data Model: Pottery Content Schema

**Feature**: Initial Project Setup
**Created**: 2025-10-04

---

## Overview

The pottery portfolio uses a **markdown-based content system** where each pottery piece is a standalone markdown file with frontmatter metadata. This aligns with Article II (Content as Data) - no database, no server, just files.

---

## Entity: Pottery Piece

### Storage Location
```
src/content/pieces/piece-{id}-{slug}.md
```

**Examples**:
- `src/content/pieces/piece-01-earth-vessel.md`
- `src/content/pieces/piece-02-spiral-form.md`
- `src/content/pieces/piece-03-textured-bowl.md`

---

## Frontmatter Schema

### Zod Schema Definition

This schema will be defined in `src/content/config.ts`:

```typescript
import { z, defineCollection } from 'astro:content';

const piecesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string(),
    date: z.coerce.date(),
    techniques: z.array(z.string()).min(1),
    colors: z.array(z.string()).min(1),

    // Optional fields
    textures: z.array(z.string()).optional(),
    description: z.string(),
    aiDescription: z.string().optional().default(''),
    featured: z.boolean().default(false),

    // Image references (to be used with Astro's image optimization)
    mainImage: z.string(),
    detailImages: z.array(z.string()).optional().default([]),
  }),
});

export const collections = {
  'pieces': piecesCollection,
};
```

---

## Field Definitions

### `title` (Required)
**Type**: String
**Description**: The name of the pottery piece
**Example**: `"Earth Vessel"`
**Validation**: Must be non-empty string
**Usage**: Displayed as heading, used in page title, SEO meta tags

---

### `date` (Required)
**Type**: Date (coerced from string)
**Description**: When the piece was created
**Example**: `"2025-03-15"` or `"2025-03-15T00:00:00Z"`
**Validation**: Must be valid ISO 8601 date string
**Usage**: Sorting pieces chronologically, "Created on" display

---

### `techniques` (Required)
**Type**: Array of strings
**Description**: Ceramic techniques used to create the piece
**Example**: `["hand-building", "slip decoration", "reduction firing"]`
**Validation**: Must have at least 1 technique
**Usage**: Filtering by technique, displaying "Techniques Used" section

**Common Values**:
- `"hand-building"`
- `"wheel-throwing"`
- `"slip decoration"`
- `"sgraffito"`
- `"glazing"`
- `"reduction firing"`
- `"oxidation firing"`
- `"raku"`
- `"pit firing"`
- `"carving"`

---

### `colors` (Required)
**Type**: Array of strings
**Description**: Dominant colors in the piece
**Example**: `["terracotta", "cream", "rust"]`
**Validation**: Must have at least 1 color
**Usage**: Visual search by color, color palette display

**Format**: Use descriptive color names or hex codes
**Examples**:
- Descriptive: `"terracotta"`, `"sage green"`, `"charcoal"`
- Hex codes: `"#9c8671"`, `"#f0ebe3"`, `"#3d2f24"`

**Note**: Future feature will auto-extract colors from images, but manual definition is fallback

---

### `textures` (Optional)
**Type**: Array of strings
**Description**: Surface textures of the piece
**Example**: `["rough", "organic", "glossy"]`
**Validation**: Optional, defaults to empty array
**Usage**: Visual search by texture, tactile description

**Common Values**:
- `"smooth"`
- `"rough"`
- `"glossy"`
- `"matte"`
- `"organic"`
- `"geometric"`
- `"crackled"`

---

### `description` (Required)
**Type**: String (multiline markdown)
**Description**: Human-written description of the piece
**Example**:
```markdown
Hand-built vessel inspired by ancient earthenware forms.
Features natural clay texture with slip decoration in warm earth tones.
```
**Validation**: Must be non-empty string
**Usage**:
- Fallback if AI description generation fails (Article V)
- Displayed on piece detail page
- Used for SEO meta descriptions

**Guidelines for Artist**:
- 2-4 sentences
- Describe inspiration, technique, or story
- Use plain language (no jargon)

---

### `aiDescription` (Optional)
**Type**: String
**Description**: AI-generated artistic description (populated at build time)
**Example**: `"This earthen vessel speaks to the primordial connection..."`
**Validation**: Optional, defaults to empty string
**Usage**: Enhanced description for piece detail page

**Generation Process**:
1. Build script reads `description` field
2. Calls Claude API with prompt: "Write an artistic description of this ceramic piece..."
3. If API succeeds: Populate `aiDescription`
4. If API fails: Use manual `description` (progressive enhancement)

**Note**: This field should **NOT** be manually edited in markdown files. It's auto-generated.

---

### `featured` (Optional)
**Type**: Boolean
**Description**: Whether this piece should be featured prominently
**Example**: `true`
**Validation**: Defaults to `false`
**Usage**:
- Homepage hero section (shows featured pieces)
- "Featured Work" section
- Can mark 1-3 pieces as featured

---

### `mainImage` (Required)
**Type**: String (path to image)
**Description**: Primary image of the pottery piece
**Example**: `"./images/piece-01/main.jpg"`
**Validation**: Must be valid path to image file
**Usage**: Gallery thumbnails, detail page hero image

**File Organization**:
```
src/content/images/
  piece-01/
    main.jpg          ← mainImage points here
    detail-01.jpg
    detail-02.jpg
```

**Supported Formats**: JPEG, PNG, WebP (WebP generated automatically by Sharp)
**Recommended Size**: 2000px wide (will be optimized to multiple sizes)

---

### `detailImages` (Optional)
**Type**: Array of strings (paths to images)
**Description**: Additional detail shots of the piece
**Example**: `["./images/piece-01/detail-01.jpg", "./images/piece-01/detail-02.jpg"]`
**Validation**: Optional, defaults to empty array
**Usage**: Detail page image carousel/gallery

**Guidelines**:
- 2-4 detail images per piece
- Different angles, close-ups of texture, glazing details
- Same format/size recommendations as mainImage

---

## Example Pottery Piece

### File: `src/content/pieces/piece-01-earth-vessel.md`

```markdown
---
title: "Earth Vessel"
date: "2025-03-15"
techniques: ["hand-building", "slip decoration", "reduction firing"]
colors: ["terracotta", "cream", "rust"]
textures: ["rough", "organic"]
description: "Hand-built vessel inspired by ancient earthenware forms. Features natural clay texture with slip decoration in warm earth tones. The organic shape and earth colors create a grounding, timeless piece."
featured: true
mainImage: "./images/piece-01/main.jpg"
detailImages:
  - "./images/piece-01/detail-texture.jpg"
  - "./images/piece-01/detail-glaze.jpg"
---

## Story Behind the Piece

This vessel was created during my exploration of ancient pottery techniques.
I wanted to capture the warmth and earthiness of traditional ceramics while
bringing my own modern sensibility to the form.

The slip decoration was applied in layers, creating depth and visual interest
that changes as light moves across the surface.

## Process Notes

- Built using pinch and coil techniques
- Bisque fired to cone 04
- Slip decoration applied before glaze firing
- Reduction fired to cone 6
- Total creation time: 3 weeks
```

---

## Validation Rules

### Build-Time Validation

Astro content collections automatically validate frontmatter against the Zod schema:

**Valid Example** ✅
```yaml
title: "Earth Vessel"
date: "2025-03-15"
techniques: ["hand-building"]
colors: ["terracotta"]
description: "A hand-built vessel..."
mainImage: "./images/piece-01/main.jpg"
```

**Invalid Example** ❌
```yaml
title: "Earth Vessel"
# Missing date field
techniques: []  # Empty array not allowed
colors: ["terracotta"]
# Missing description
# Missing mainImage
```

**Error Message**:
```
Error: Content collection frontmatter invalid in piece-01-earth-vessel.md
- Missing required field: date
- techniques: Array must contain at least 1 element
- Missing required field: description
- Missing required field: mainImage
```

---

## TypeScript Type Inference

Astro automatically generates TypeScript types from the Zod schema:

```typescript
// Auto-generated type (available in .astro and .tsx files)
type PotteryPiece = {
  title: string;
  date: Date;
  techniques: string[];
  colors: string[];
  textures?: string[];
  description: string;
  aiDescription?: string;
  featured: boolean;
  mainImage: string;
  detailImages: string[];
}

// Usage in Astro page
import { getCollection } from 'astro:content';

const pieces = await getCollection('pieces');
// pieces has type: Array<{ data: PotteryPiece, slug: string, ... }>

pieces.forEach(piece => {
  console.log(piece.data.title);  // TypeScript knows this is a string
  console.log(piece.data.techniques);  // TypeScript knows this is string[]
});
```

---

## Relationships (Future)

Currently, pottery pieces are **standalone entities** with no relationships.

**Potential Future Relationships**:
- **Collections**: Group pieces by theme, year, or series
- **Tags**: Cross-cutting categorization beyond techniques
- **Related Pieces**: "You might also like" suggestions

These would be added in future feature specifications following the SDD process.

---

## Migration & Evolution

### Adding New Fields

To add a field to the schema:

1. Update `src/content/config.ts` with new Zod field
2. Mark as `optional()` initially to avoid breaking existing content
3. Update template in `docs/adding-new-piece.md`
4. Gradually populate field for existing pieces
5. Once all pieces have field, make it required if needed

**Example**: Adding `glaze` field
```typescript
// In src/content/config.ts
schema: z.object({
  // ... existing fields ...
  glaze: z.string().optional(),  // Start optional
})
```

### Removing Fields

To remove a field:

1. Mark as `optional()` first
2. Deploy and verify no errors
3. Remove from schema
4. Clean up existing markdown files

---

## CLI Validation Command

### `npm run validate-content`

**Purpose**: Validate all pottery pieces against schema before building

**Implementation** (future):
```bash
# Script checks:
# 1. All markdown files have valid frontmatter
# 2. All required images exist
# 3. No orphaned images (images with no corresponding markdown)
# 4. Date formats are correct
# 5. Colors follow naming convention
```

**Output Example**:
```
🎨 Validating pottery content...

  ✓ piece-01-earth-vessel.md - Valid
  ✓ piece-02-spiral-form.md - Valid
  ✗ piece-03-textured-bowl.md - Missing required field: mainImage

❌ 1 error found. Fix and run again.
```

---

## Artist-Friendly Template

### Template: `src/content/pieces/_template.md`

```markdown
---
title: "Name of Your Piece"
date: "YYYY-MM-DD"
techniques:
  - "technique 1"
  - "technique 2"
colors:
  - "color 1"
  - "color 2"
textures:
  - "texture 1"
description: "Write 2-4 sentences describing your piece. What inspired it? What techniques did you use? What story does it tell?"
featured: false
mainImage: "./images/piece-XX/main.jpg"
detailImages:
  - "./images/piece-XX/detail-01.jpg"
  - "./images/piece-XX/detail-02.jpg"
---

## Story Behind the Piece

[Optional: Tell the story of creating this piece]

## Process Notes

[Optional: Technical notes about your process]
```

**Instructions for Artist** (in `docs/adding-new-piece.md`):
1. Copy `_template.md` to new file: `piece-04-your-piece-name.md`
2. Fill in all fields with `---` at top
3. Add your story and process notes below
4. Save images to `images/piece-04/`
5. Run `npm run validate-content` to check
6. Build and deploy!

---

## Summary

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `title` | String | ✅ | Piece name |
| `date` | Date | ✅ | Creation date |
| `techniques` | String[] | ✅ | Ceramic techniques used |
| `colors` | String[] | ✅ | Dominant colors |
| `textures` | String[] | ❌ | Surface textures |
| `description` | String | ✅ | Human-written description |
| `aiDescription` | String | ❌ | AI-generated description |
| `featured` | Boolean | ❌ | Show on homepage |
| `mainImage` | String | ✅ | Primary image path |
| `detailImages` | String[] | ❌ | Additional image paths |

**Total Required Fields**: 6
**Total Optional Fields**: 4

This schema provides **type safety** (Zod validation), **flexibility** (optional fields), and **artist-friendliness** (clear structure, helpful errors).
