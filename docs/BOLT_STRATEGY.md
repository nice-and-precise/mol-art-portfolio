# 🔩 Bolt.new Strategy - Token-Efficient Workflow

**Goal**: Use Bolt.new for rapid UI prototyping, then extract code for SDD implementation

**Why Bolt.new?**
- ✅ Free to use (no subscription required)
- ✅ Live preview while you iterate
- ✅ React + TypeScript out of the box
- ✅ Export code when done
- ✅ You work independently (saves Claude Code tokens)

---

## 🎯 The Efficient Workflow

```mermaid
graph LR
    A[You: Prototype in Bolt.new] --> B[Export Code]
    B --> C[Return to Claude Code]
    C --> D[Claude: /specify from Bolt]
    D --> E[Claude: Implement via SDD]
    E --> F[Production Gallery]

    style A fill:#7fa5a3,color:#fff
    style C fill:#9c8671,color:#fff
    style F fill:#6b5544,color:#fff
```

**Key Insight**: You do the creative iteration in Bolt (independent), Claude does the production implementation (efficient).

---

## 📋 Your Step-by-Step Guide

### Phase 1: Prototype in Bolt.new (You - Independent)

**Time estimate**: 20-30 minutes

1. **Open Bolt.new**: https://bolt.new

2. **Paste this prompt**:
```
Create a pottery gallery for a ceramic artist portfolio using React and TypeScript.

REQUIREMENTS:
- Responsive grid: 1 column (mobile), 2 (tablet), 3 (desktop)
- Each pottery card shows: image, title, techniques (badges), description
- Use these EXACT colors:
  • Background: #faf8f5
  • Card bg: #ffffff
  • Primary: #9c8671
  • Text: #3d2f24
  • Badge bg: #d4c4b0
- Typography: Georgia serif for titles, system-ui for body
- Rounded corners: 12px
- Card shadow that grows on hover
- Min font size: 16px

Use this sample data:
[
  {
    "title": "Earth Vessel",
    "techniques": ["hand-building", "slip decoration"],
    "description": "Hand-built vessel inspired by ancient earthenware forms.",
    "image": "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600"
  },
  {
    "title": "Spiral Form",
    "techniques": ["wheel-throwing", "carving"],
    "description": "Wheel-thrown form with carved spiral patterns.",
    "image": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600"
  },
  {
    "title": "Textured Bowl",
    "techniques": ["hand-building", "pit firing"],
    "description": "Hand-built bowl with natural texture from pit firing.",
    "image": "https://images.unsplash.com/photo-1615485736962-3f8a6f73e7a6?w=600"
  }
]

Make it feel warm, earthy, and handcrafted.
```

3. **Iterate in Bolt**:
   - Try: "Make titles bigger and more prominent"
   - Try: "Add more whitespace between cards"
   - Try: "Make hover effect more subtle"
   - Try: "Adjust badge styling to be smaller"

4. **When satisfied**:
   - Take screenshots
   - Click "Download" or copy the code
   - Note what you love about the design

---

### Phase 2: Return to Claude Code (Efficient Handoff)

**What to bring back**:
1. ✅ Screenshot of final design
2. ✅ Exported code (HTML/CSS/React)
3. ✅ Brief description: "I want the gallery to look like this"

**What to say** (exact message template):
```
I prototyped the gallery in Bolt.new. Here's what I want:

[Attach screenshot]

Key features I love:
- [e.g., "The card hover effect"]
- [e.g., "The technique badge styling"]
- [e.g., "The spacing between cards"]

Here's the code Bolt generated: [paste code or attach file]

Ready to create the spec and implement this properly in our Astro site.
```

**Then Claude will**:
1. Run `/specify` based on your Bolt prototype
2. Create implementation plan
3. Generate tasks
4. Write tests
5. Implement in Astro (not raw React)
6. Ensure constitutional compliance

---

## 🎨 Bolt.new Pro Tips

### Getting Better Results

**✅ DO:**
- Specify exact hex colors
- Request specific spacing values (e.g., "32px gap")
- Ask for responsive breakpoints
- Iterate on one thing at a time
- Save each version you like

**❌ DON'T:**
- Ask for complex state management (keep it simple)
- Request backend features (Bolt is frontend only)
- Try to match our exact file structure (we'll adapt it)
- Worry about Astro compatibility (Claude handles translation)

### Common Iterations

**If colors are wrong**:
```
Use these exact hex codes:
- Background: #faf8f5
- Primary: #9c8671
- Text: #3d2f24
```

**If spacing feels cramped**:
```
Increase gap between cards to 48px and add 32px padding inside each card
```

**If it doesn't feel artisanal**:
```
Make titles Georgia serif (larger), add more whitespace, use softer shadows
```

**If layout needs work**:
```
Try a masonry layout instead of grid, or use different card heights
```

---

## 🔄 Code Translation Guide

**Bolt generates**: Pure React components
**We need**: Astro components with React islands

**Claude will handle**:
- ✅ Convert React → Astro `.astro` files
- ✅ Identify which parts need React islands
- ✅ Integrate with our content collections
- ✅ Apply Tailwind classes from our config
- ✅ Ensure test coverage
- ✅ Follow constitutional principles

**You don't need to worry about**:
- File structure compatibility
- Astro-specific syntax
- Test implementation
- Build configuration

---

## 📊 Token Usage Comparison

### Old Approach (High Token Usage):
```
User: "Design a gallery"
Claude: [Reads files, plans, codes, iterates] - 10K+ tokens
User: "Change the spacing"
Claude: [Re-analyzes, modifies, tests] - 5K+ tokens
User: "Try different colors"
Claude: [Iterates again] - 5K+ tokens
Total: 20K+ tokens for iterations
```

### New Approach (Low Token Usage):
```
User: [Works in Bolt independently] - 0 tokens
User: "Here's my Bolt design, implement it"
Claude: [/specify → /plan → implement once] - 8K tokens
Total: 8K tokens (60% savings!)
```

**Efficiency gain**: ~60% token reduction by iterating in Bolt first

---

## 🚀 After Bolt: SDD Implementation

When you return with Bolt code, Claude follows this streamlined process:

### 1. Specification (5 min)
```
/specify Gallery Component from Bolt.new Prototype

User Stories:
- As a visitor, I want to see pottery in a responsive grid
- As a visitor, I want to click cards to view details
- As a mobile user, I want single-column layout

Acceptance Criteria:
- Matches Bolt.new visual design
- Uses Astro content collections (not hardcoded data)
- Responsive breakpoints: 640px (tablet), 1024px (desktop)
- Passes all constitutional gates
```

### 2. Planning (5 min)
- Technology: Astro component + React island for interactions
- Data source: `src/content/pieces/*.md`
- Styling: Tailwind with clay palette
- Constitutional check: All gates pass

### 3. Tasks (auto-generated)
- Create Gallery.astro component
- Write tests for responsive behavior
- Implement grid layout
- Add hover effects
- Integrate content collections

### 4. Test-First Implementation (15 min)
- Write tests based on Bolt design
- Get approval
- Confirm RED phase
- Implement to GREEN
- Deploy

**Total time with Claude**: ~30 minutes
**Your independent Bolt time**: ~20 minutes
**Total**: ~50 minutes vs. 2+ hours of back-and-forth

---

## 📝 Checklist

### Before You Start Bolt:
- [ ] Understand the color palette (#faf8f5, #9c8671, etc.)
- [ ] Know the sample pottery data (3 pieces)
- [ ] Have the prompt ready to paste
- [ ] Bolt.new is open and ready

### While in Bolt:
- [ ] Paste initial prompt
- [ ] Review the generated design
- [ ] Iterate on spacing, colors, typography
- [ ] Test responsive behavior (resize browser)
- [ ] Take screenshots of final design
- [ ] Export/copy the code

### When Returning to Claude:
- [ ] Have screenshot ready
- [ ] Have code exported
- [ ] List 3-5 things you love about the design
- [ ] Ready to say: "Implement this via SDD"

---

## 🎯 Success Criteria

**Good Bolt prototype has**:
- ✅ Earthy color palette applied
- ✅ Responsive grid (test by resizing)
- ✅ Clean card design with hover effects
- ✅ Technique badges styled nicely
- ✅ Typography feels artisanal (serif titles)
- ✅ Generous whitespace (not cramped)

**Don't worry about**:
- ❌ Perfect code structure (Claude will refactor)
- ❌ Astro compatibility (Claude will translate)
- ❌ Test coverage (Claude will write tests)
- ❌ Content collections integration (Claude will add)
- ❌ Performance optimization (Claude will handle)

---

## 🔗 Quick Links

- **Bolt.new**: https://bolt.new
- **Color Palette Reference**: [constitution.md](../constitution.md#color-palette)
- **Sample Data**: In this file above (3 pottery pieces)
- **When Done**: Return to Claude Code with screenshot + code

---

## 💡 Why This Works

**Design Iteration** = Creative, exploratory, visual
→ **Best tool**: Bolt.new (instant visual feedback)

**Production Implementation** = Structured, tested, integrated
→ **Best tool**: Claude Code + SDD methodology

**By separating concerns**, we:
1. ✅ Reduce token usage (you iterate independently)
2. ✅ Get better design (visual tool for visual work)
3. ✅ Maintain quality (SDD for production code)
4. ✅ Save time (parallel workflows)
5. ✅ Follow constitution (Claude enforces gates)

---

## 🚀 Ready to Start?

1. Open: https://bolt.new
2. Copy the prompt from "Phase 1" above
3. Paste and iterate until you love it
4. Come back with: screenshot + code + "implement this"

**Estimated timeline**:
- You in Bolt: 20-30 min
- Back to Claude: 5 min handoff
- Claude implements: 25-30 min
- **Total: ~1 hour to production gallery** ✨

Take your time in Bolt - this is the creative part! When you're done, we'll make it production-ready using SDD.
