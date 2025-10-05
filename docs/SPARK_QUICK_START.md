# 🎨 Spark Quick Start - Copy & Paste Ready

## Step 1: Copy This Color Palette

```javascript
// Clay Colors (warm earth tones)
cream: #faf8f5
light-clay: #f5f1ea
warm-tan: #d4c4b0
terracotta: #9c8671  // ← Main brand color
fired-clay: #6b5544
dark-earth: #3d2f24

// Glaze Colors (accent tones)
celadon: #7fa5a3
sage: #8b9d83
matte-white: #f0ebe3
```

---

## Step 2: Copy This Sample Data

```json
[
  {
    "title": "Earth Vessel",
    "techniques": ["hand-building", "slip decoration", "reduction firing"],
    "description": "Hand-built vessel inspired by ancient earthenware forms. Features natural clay texture with slip decoration in warm earth tones.",
    "image": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop"
  },
  {
    "title": "Spiral Form",
    "techniques": ["wheel-throwing", "carving", "glazing"],
    "description": "Wheel-thrown form with carved spiral patterns. Celadon glaze creates a smooth, glossy finish.",
    "image": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=600&fit=crop"
  },
  {
    "title": "Textured Bowl",
    "techniques": ["hand-building", "pit firing"],
    "description": "Hand-built bowl with natural texture from pit firing. Unique color variations and crackle patterns.",
    "image": "https://images.unsplash.com/photo-1615485736962-3f8a6f73e7a6?w=600&h=600&fit=crop"
  }
]
```

---

## Step 3: Copy This Spark Prompt

**FOR GALLERY LAYOUT**:

```
Create a pottery gallery for a ceramic artist portfolio.

LAYOUT:
- Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Each pottery piece is a card with:
  • Square image (1:1 aspect ratio)
  • Title in Georgia serif font, large and bold
  • Small rounded badges for techniques (like pill buttons)
  • Description text (max 3 lines with ellipsis)

COLORS (use exactly these):
- Page background: #faf8f5
- Card background: #ffffff
- Card borders: none (use shadow instead)
- Title text: #3d2f24
- Body text: #6b5544
- Badge background: #d4c4b0
- Badge text: #3d2f24

HOVER EFFECTS:
- Card shadow grows on hover (smooth 300ms transition)
- Subtle scale increase (1.02)

SPACING:
- Gap between cards: 32px
- Card padding: 24px
- Rounded corners: 12px

FONTS:
- Titles: Georgia, serif
- Everything else: system-ui, sans-serif
- Min size: 16px

Make it feel warm, earthy, and handcrafted - like the pottery itself.

Use this data: [paste JSON from Step 2]
```

---

## Step 4: What to Look For

### ✅ Good Signs:
- Warm, cream background (not stark white)
- Georgia serif titles (artisanal feel)
- Generous spacing (not cramped)
- Soft shadows (not harsh)
- Earthy color harmony

### ❌ Red Flags:
- Cool grays or blues (should be warm tones)
- Sans-serif titles (should be serif)
- Tight spacing (pottery needs to breathe)
- Neon or vibrant colors (should be muted)
- Generic corporate feel (should be handcrafted)

---

## Step 5: Iterate in Spark

Try these variations:

**"Make the titles bigger and more prominent"**

**"Add more whitespace between cards"**

**"Change hover effect to lift the card slightly"**

**"Make the technique badges smaller and more subtle"**

**"Try a masonry layout instead of grid"**

---

## Step 6: When You're Happy

1. **Take screenshot** of final design
2. **Copy HTML/CSS** that Spark generated
3. **Return to Claude Code** and say:

   > "I designed the gallery in Spark. Ready to create the specification and implement it."

4. Then we'll follow SDD:
   - `/specify` Gallery component from Spark prototype
   - `/plan` Implementation approach
   - `/tasks` Break into executable steps
   - **Test-first** Write tests, then implement
   - **Verify** Compare production to Spark mockup

---

## Alternative Prompts

### For Hero Section:
```
Create a hero section for pottery portfolio homepage.

- Large centered title: "Mol_Art" in Georgia serif (5rem/80px)
- Subtitle: "Handcrafted Ceramic Art" (1.25rem/20px)
- Cream background: #faf8f5
- Dark earth text: #3d2f24
- Very generous whitespace (padding: 64px top/bottom)
- Optional: subtle texture overlay

Should feel peaceful and artisanal.
```

### For Detail Page:
```
Create a pottery piece detail page.

LAYOUT:
- Left: Large image with thumbnail gallery below
- Right: Title, metadata, description, process notes
- Mobile: Stack vertically

COMPONENTS:
- Image gallery (main + 2-3 thumbnails)
- Title (Georgia, 3rem)
- Technique badges (same as gallery)
- "Back to Gallery" button (subtle, not prominent)

COLORS: Same earthy palette (#faf8f5 background, #9c8671 accents)

Show the "Earth Vessel" piece from the data.
```

---

## Pro Tips

1. **Start simple**: Get basic layout right first, then refine
2. **Stick to palette**: Don't let Spark add random colors
3. **Trust your eye**: If it doesn't feel "earthy", iterate
4. **Screenshot everything**: Save each version as you iterate
5. **Show your daughter**: Get her input - it's her portfolio!

---

## Quick Troubleshooting

**Spark uses wrong colors?**
→ Paste exact hex codes in prompt: "Use #faf8f5 for background, #9c8671 for accents"

**Layout too cramped?**
→ "Increase spacing between cards to 48px and add more padding"

**Doesn't feel artisanal?**
→ "Make titles Georgia serif, add more whitespace, soften shadows"

**Cards too uniform?**
→ "Try staggered heights or masonry layout"

---

## Ready? Start Here:

1. ✅ Open GitHub Spark
2. ✅ Copy Step 2 (sample data)
3. ✅ Copy Step 3 (gallery prompt)
4. ✅ Paste both into Spark
5. ✅ Iterate until it feels right
6. ✅ Come back and we'll implement it!

**Remember**: Spark is for **visual design iteration**. We'll build the production version using SDD (test-first, properly structured).
