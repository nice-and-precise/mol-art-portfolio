# 📸 Artist Guide: Adding Detail Images to Pottery Pieces

**For**: Mol_Art (High School Ceramic Artist)
**Last Updated**: 2025-10-05
**Difficulty**: ⭐ Easy (No coding required!)

---

## 🎯 What You'll Learn

This guide shows you how to add beautiful detail photos to your pottery pieces, creating an interactive image gallery that visitors can explore.

**What you can do**:
- Add multiple detail shots of each piece
- Create clickable image galleries
- Show texture, glaze, and craftsmanship details
- Give visitors a complete view of your work

---

## 📋 Before You Start

### What You Need
1. ✅ Photos of your pottery piece (main image + detail shots)
2. ✅ A text editor (Notepad, VS Code, or any editor)
3. ✅ Basic knowledge of your pottery piece (title, description, etc.)

### Photo Guidelines
- **Format**: JPG or PNG
- **Size**: 1200-2000px wide recommended
- **Quality**: High resolution for detail shots
- **Lighting**: Natural light works best
- **Types of detail shots**:
  - Close-up of texture
  - Glaze details
  - Signature or marks
  - Bottom/inside views
  - Interesting patterns

---

## 🗂️ Step 1: Organize Your Photos

### Create a Folder for Your Piece

1. Navigate to: `src/content/pieces/`
2. Find your piece's folder (e.g., `piece-01/`)
3. Inside, you should see an `images` folder

**Folder structure**:
```
src/content/pieces/
└── piece-01-earth-vessel/
    ├── index.md          ← Your pottery description
    └── images/
        ├── main.jpg      ← Main hero image
        ├── detail-texture.jpg   ← Detail shot 1
        ├── detail-glaze.jpg     ← Detail shot 2
        └── detail-signature.jpg ← Detail shot 3
```

### Naming Your Photos

**Main Image** (required):
- Name: `main.jpg` or `main.png`
- This is the big photo shown first

**Detail Images** (optional):
- Use descriptive names:
  - ✅ `detail-texture.jpg`
  - ✅ `detail-glaze.jpg`
  - ✅ `detail-inside.jpg`
  - ✅ `detail-signature.jpg`
- Avoid generic names like `IMG_1234.jpg`

---

## ✏️ Step 2: Update Your Pottery Description File

### Open Your Piece's File

1. Go to `src/content/pieces/piece-01-earth-vessel/`
2. Open `index.md` in a text editor

### Add Main Image (if not already there)

Find the section at the top between `---` marks. Add:

```yaml
mainImage: './images/main.jpg'
```

**Full example**:
```yaml
---
title: 'Earth Vessel'
date: 2025-03-15
techniques: ['hand-building', 'slip decoration', 'reduction firing']
colors: ['terracotta', 'cream', 'rust']
textures: ['rough', 'organic']
description: 'Hand-built vessel inspired by ancient earthenware forms.'
mainImage: './images/main.jpg'   ← Add this line
featured: true
---
```

### Add Detail Images

Add a new line called `detailImages:` with your detail shots:

```yaml
detailImages:
  - './images/detail-texture.jpg'
  - './images/detail-glaze.jpg'
  - './images/detail-signature.jpg'
```

**Complete example**:
```yaml
---
title: 'Earth Vessel'
date: 2025-03-15
techniques: ['hand-building', 'slip decoration', 'reduction firing']
colors: ['terracotta', 'cream', 'rust']
textures: ['rough', 'organic']
description: 'Hand-built vessel inspired by ancient earthenware forms.'
mainImage: './images/main.jpg'
detailImages:                                    ← New section!
  - './images/detail-texture.jpg'
  - './images/detail-glaze.jpg'
  - './images/detail-signature.jpg'
featured: true
---

## Story Behind the Piece

[Your story here...]
```

**Important formatting rules**:
- Each image path starts with `- './images/`
- Use single quotes `'` around the path
- Keep the spacing/indentation (2 spaces before the dash)
- End the path with the file extension (`.jpg` or `.png`)

---

## 💾 Step 3: Save and Test

### Save Your Changes

1. Save the `index.md` file
2. Make sure all your images are in the `images/` folder

### Test Locally

Open your terminal and run:

```bash
npm run dev
```

Then visit:
```
http://localhost:4321/mol-art-portfolio/gallery/piece-01-earth-vessel
```

**What you should see**:
1. Your main image as the hero
2. An "Image Gallery" section below
3. Clickable thumbnail grid showing all detail images
4. Clicking a thumbnail opens the lightbox viewer

---

## 🖼️ How the Image Gallery Works

### Thumbnail Grid
- **Mobile (phone)**: 2 columns
- **Tablet**: 3 columns
- **Desktop**: 4 columns

### Lightbox Viewer
When visitors click a thumbnail:
- ✨ Full-screen lightbox opens
- 🖼️ Image shows large and clear
- 🔢 Counter shows position ("2 / 5")
- ⬅️➡️ Navigate with arrow keys or buttons
- ❌ Close with ESC key or close button

### Accessibility
- ✅ Keyboard navigation (arrows, ESC)
- ✅ Screen reader announcements
- ✅ Touch-friendly for mobile
- ✅ Loading spinner while images load

---

## 📝 Real Example

Let's say you made a beautiful teapot and want to show:
- Main view of the whole teapot
- Close-up of the handle texture
- Detail of the glaze on the lid
- Your signature on the bottom

### 1. Take your photos:
- `main.jpg` - Full teapot
- `detail-handle.jpg` - Handle close-up
- `detail-glaze.jpg` - Lid glaze
- `detail-signature.jpg` - Bottom signature

### 2. Put them in the folder:
```
src/content/pieces/teapot-spring-blossom/
└── images/
    ├── main.jpg
    ├── detail-handle.jpg
    ├── detail-glaze.jpg
    └── detail-signature.jpg
```

### 3. Update `index.md`:
```yaml
---
title: 'Spring Blossom Teapot'
date: 2025-04-20
techniques: ['wheel-throwing', 'carved decoration']
colors: ['celadon', 'white']
textures: ['smooth', 'carved']
description: 'Elegant teapot with hand-carved cherry blossoms.'
mainImage: './images/main.jpg'
detailImages:
  - './images/detail-handle.jpg'
  - './images/detail-glaze.jpg'
  - './images/detail-signature.jpg'
featured: true
---

## Story Behind the Piece

I created this teapot during spring semester...
```

### 4. Save and test!

That's it! Your teapot now has a beautiful image gallery. 🎉

---

## 🎨 Tips for Great Detail Photos

### What Makes a Good Detail Shot?

**DO** ✅:
- Show interesting textures
- Capture glaze effects
- Highlight unique details
- Use natural lighting
- Get close (macro shots)
- Keep the background simple

**DON'T** ❌:
- Use blurry photos
- Include distracting backgrounds
- Over-edit colors
- Use flash (creates harsh shadows)

### Photo Ideas

1. **Texture Details**:
   - Rough clay surface
   - Carved patterns
   - Impressed designs
   - Natural variations

2. **Glaze Effects**:
   - Color transitions
   - Glaze drips
   - Crystalline formations
   - Layered glazes

3. **Craftsmanship**:
   - Hand-building seams
   - Wheel throwing marks
   - Finger impressions
   - Tool marks

4. **Unique Features**:
   - Artist signature
   - Date stamp
   - Special decorations
   - Inside views

---

## 🐛 Troubleshooting

### Images Not Showing?

**Check these**:
1. ✅ File path is correct: `'./images/detail-texture.jpg'`
2. ✅ Image file exists in the `images/` folder
3. ✅ File extension matches (.jpg vs .JPG)
4. ✅ No typos in the filename
5. ✅ Quotes are correct (single quotes `'`)

### Lightbox Not Opening?

**Try these**:
1. Clear your browser cache (Ctrl+F5)
2. Rebuild the site: `npm run build`
3. Check browser console for errors (F12)

### Images Too Large/Slow?

**Optimize your images**:
1. Resize to 1200-2000px wide
2. Use JPEG format (smaller file size)
3. Compress with a tool like:
   - TinyPNG.com
   - Squoosh.app
   - ImageOptim (Mac)

---

## 📚 Quick Reference

### Minimum Required

```yaml
---
mainImage: './images/main.jpg'
---
```

### With Detail Images

```yaml
---
mainImage: './images/main.jpg'
detailImages:
  - './images/detail-1.jpg'
  - './images/detail-2.jpg'
---
```

### Full Example

```yaml
---
title: 'Pottery Piece Name'
date: 2025-03-15
techniques: ['technique1', 'technique2']
colors: ['color1', 'color2']
textures: ['texture1', 'texture2']
description: 'Short description of the piece.'
mainImage: './images/main.jpg'
detailImages:
  - './images/detail-texture.jpg'
  - './images/detail-glaze.jpg'
  - './images/detail-marks.jpg'
  - './images/detail-signature.jpg'
featured: true
---

## Story

Your detailed story here...

## Process Notes

- Technique details
- Firing notes
- etc.
```

---

## ❓ Need Help?

### Common Questions

**Q: How many detail images can I add?**
A: As many as you want! But 3-6 is usually perfect.

**Q: Do I need detail images for every piece?**
A: No, they're optional. Main image is all you need.

**Q: Can I use PNG instead of JPG?**
A: Yes! Both work fine. JPG is usually smaller file size.

**Q: What if I add a new image later?**
A: Just add it to the `detailImages` list and rebuild the site!

**Q: Can visitors download my images?**
A: Currently no, but this could be added as a feature later.

---

## 🎉 You're Done!

Now your pottery pieces have beautiful, interactive image galleries!

**What visitors can do**:
- 👁️ View your work in detail
- 🔍 Zoom in on textures and glazes
- ⌨️ Navigate with keyboard
- 📱 Swipe through on mobile
- 🔗 Share specific images

**What you learned**:
- ✅ How to organize pottery photos
- ✅ How to add images to your pieces
- ✅ How to use the lightbox gallery
- ✅ How to troubleshoot issues

---

**Happy photographing! 📸**

*P.S. Pro tip: Natural sunlight near a window makes the best pottery photos!*

---

**Questions or stuck?** Check the [README.md](../README.md) or review your existing pottery pieces for examples!
