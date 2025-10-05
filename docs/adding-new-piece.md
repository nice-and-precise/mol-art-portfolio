# Adding New Pottery Pieces

This guide shows you how to add new pottery pieces to your portfolio.

## Step 1: Create the Markdown File

1. Go to `src/content/pieces/` folder
2. Create a new file: `piece-02-your-piece-name.md`
3. Copy this template:

```markdown
---
title: "Your Piece Title"
date: "YYYY-MM-DD"
techniques:
  - "technique 1"
  - "technique 2"
colors:
  - "color 1"
  - "color 2"
textures:
  - "texture 1"
description: "Write 2-4 sentences describing your piece."
featured: false
mainImage: "./images/piece-02/main.jpg"
detailImages:
  - "./images/piece-02/detail-01.jpg"
---

## Story Behind the Piece

Tell the story of creating this piece.

## Process Notes

- Technical details
- Firing notes
- Creation time
```

## Step 2: Add Your Images

1. Create folder: `src/content/images/piece-02/`
2. Add your photos:
   - `main.jpg` - Main photo of the piece
   - `detail-01.jpg` - Close-up details (optional)
   - `detail-02.jpg` - More details (optional)

**Image Tips**:
- Use high-quality JPG images
- Recommended size: 2000px wide
- Keep file sizes under 5MB

## Step 3: Fill in the Details

### Title
The name of your pottery piece.

### Date
When you finished the piece (format: YYYY-MM-DD)
Example: `"2025-03-15"`

### Techniques
List the ceramic techniques you used:
- `"hand-building"`
- `"wheel-throwing"`
- `"slip decoration"`
- `"sgraffito"`
- `"reduction firing"`
- etc.

### Colors
Describe the dominant colors:
- `"terracotta"`
- `"cream"`
- `"celadon"`
- `"charcoal"`
- etc.

### Textures (Optional)
Surface textures:
- `"smooth"`
- `"rough"`
- `"glossy"`
- `"matte"`
- etc.

### Description
Write 2-4 sentences about your piece. This is important - if AI description fails, this is what visitors will see.

### Featured
Set to `true` if you want this piece on the homepage.
Set to `false` for regular pieces.

## Step 4: Check Your Work

Run this command to check for errors:

```bash
npm run build
```

If you see errors, they'll tell you exactly what to fix.

## Step 5: See Your Changes

```bash
# Start the development server
npm run dev

# Open http://localhost:4321
```

Your new piece should appear on the homepage AND in the gallery at `/gallery`!

## Step 6: Deploy

When you're happy with how it looks:

```bash
npm run deploy
```

Your changes will be live on GitHub Pages in about 2 minutes.

## Common Mistakes

### ❌ Forgot to add images
**Error**: "Image not found"
**Fix**: Make sure image files exist in `src/content/images/piece-XX/`

### ❌ Missing required field
**Error**: "Missing required field: techniques"
**Fix**: Add the missing field to your frontmatter (between the `---` lines)

### ❌ Empty array
**Error**: "Array must contain at least 1 element"
**Fix**: Add at least one item to `techniques` and `colors`

### ❌ Wrong date format
**Error**: "Invalid date"
**Fix**: Use YYYY-MM-DD format, like `"2025-03-15"`

## Viewing Your Gallery

Your pottery pieces appear in two places:

1. **Homepage** (`/`): Shows featured pieces
2. **Gallery** (`/gallery`): Shows ALL pieces in a responsive grid

The gallery has:
- Responsive layout (1 column on phone, 2 on tablet, 3 on desktop)
- Smooth loading animations
- Technique badges for each piece
- Light and dark theme support

## Theme Toggle

The site has a light/dark theme toggle in the top-right corner:
- **Moon icon** = Click for dark mode
- **Sun icon** = Click for light mode

Your preference is saved automatically!

## Need Help?

If something isn't working:
1. Check the error message - it usually tells you exactly what's wrong
2. Make sure all required fields are filled in
3. Check that image paths match your actual image files
4. Ask for help!
