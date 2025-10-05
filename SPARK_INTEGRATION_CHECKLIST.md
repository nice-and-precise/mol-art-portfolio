# ✅ Spark Integration Checklist

## Current Status: ✅ READY FOR SPARK DESIGN

---

## 📋 Pre-Spark Checklist (Complete ✅)

- [x] **Foundation implemented** - Astro + React + Tailwind configured
- [x] **Color palette defined** - Clay colors in tailwind.config.cjs
- [x] **Typography system** - Georgia serif + system sans
- [x] **Content structure** - Example pottery piece created
- [x] **Tests passing** - 80/80 tests green ✅
- [x] **Build working** - Production build succeeds
- [x] **Preview server** - Running at http://localhost:4321/mol-art-portfolio
- [x] **Documentation** - Spark guides created

**You are HERE** → Ready to design UI in Spark!

---

## 🎨 Spark Design Phase (Next Steps)

### Step 1: Open Spark
- [ ] Go to GitHub Spark
- [ ] Create new Spark project

### Step 2: Copy Required Files
- [ ] Open `docs/SPARK_QUICK_START.md`
- [ ] Copy color palette (Step 1)
- [ ] Copy sample JSON data (Step 2)
- [ ] Copy gallery prompt (Step 3)

### Step 3: Design in Spark
- [ ] Paste prompt + data into Spark
- [ ] Iterate on gallery layout
- [ ] Refine colors (stick to clay palette!)
- [ ] Adjust spacing (generous whitespace)
- [ ] Test responsive breakpoints

### Step 4: Get Feedback
- [ ] Show design to artist (your daughter)
- [ ] Does it feel "earthy" and handcrafted?
- [ ] Does she say "wow"?
- [ ] Iterate based on feedback

### Step 5: Save Design
- [ ] Screenshot final Spark design
- [ ] Save to `docs/spark-prototypes/gallery.png`
- [ ] Copy Spark HTML/CSS output
- [ ] Save to `docs/spark-prototypes/gallery-spark-output.html`

---

## 📝 Post-Spark: Return to SDD

### Step 6: Create Specification
```bash
# In Claude Code conversation
/specify Gallery component based on Spark prototype:
- Responsive masonry grid (1/2/3 columns)
- Pottery card with image, title, badges, description
- Hover effects: shadow + subtle lift
- Earthy color palette from Spark design
- Typography: Georgia headers, system sans body
```

### Step 7: Implement Production Version
- [ ] `/plan` - Generate implementation plan
- [ ] `/tasks` - Break into executable tasks
- [ ] **Write tests first** (test-first development)
- [ ] Get test approval from human
- [ ] Confirm red phase
- [ ] Implement component
- [ ] Verify green phase (tests pass)

### Step 8: Verify Design Fidelity
- [ ] Compare production to Spark screenshot
- [ ] Colors match exactly
- [ ] Spacing matches
- [ ] Typography matches
- [ ] Hover effects work
- [ ] Responsive breakpoints identical

### Step 9: Iterate if Needed
- [ ] If production differs from Spark, decide:
  - Refine Spark design and re-implement?
  - Accept production version?
  - Compromise between the two?

---

## 🔄 Iteration Workflow

```
Spark Design
     ↓
Screenshot + Save
     ↓
/specify Component ← Create formal spec
     ↓
/plan Implementation
     ↓
/tasks Breakdown
     ↓
Test-First Development
     ↓
Implement Component
     ↓
Compare to Spark ← Does it match?
     ↓
  ├─ YES → Ship it! ✅
  └─ NO → Iterate (refine Spark or code)
```

---

## 📁 Files to Reference

**Before Spark**:
- `tailwind.config.cjs` - Color palette and fonts
- `src/content/pieces/piece-01-earth-vessel.md` - Real pottery data
- `docs/SPARK_QUICK_START.md` - Copy-paste prompts

**During Spark**:
- Use color hex codes directly (#faf8f5, #9c8671, etc.)
- Use sample JSON from SPARK_QUICK_START.md
- Follow design principles from spark-integration-guide.md

**After Spark**:
- Save screenshots to `docs/spark-prototypes/`
- Save HTML output to `docs/spark-prototypes/`
- Use screenshots as reference during implementation

---

## 🎯 Success Criteria for Spark Design

Design is ready when:

- ✅ **Earthy aesthetic** - Warm tones, not cool grays/blues
- ✅ **Generous whitespace** - Pottery has room to breathe
- ✅ **Serif titles** - Georgia font for artisanal feel
- ✅ **Soft shadows** - Not harsh or "digital"
- ✅ **Responsive** - Works on mobile, tablet, desktop
- ✅ **Artist approval** - She says "wow!"
- ✅ **Color fidelity** - Uses clay palette exclusively
- ✅ **Accessible** - Min 16px font, good contrast

---

## ⚠️ Common Pitfalls to Avoid

❌ **Using wrong colors** - Spark might suggest blues/grays
   → Explicitly paste hex codes in prompt

❌ **Too cramped** - Spark might pack elements tightly
   → Request "more whitespace" and "generous spacing"

❌ **Generic corporate look** - Default Spark styles
   → Emphasize "handcrafted, artisanal, warm, earthy"

❌ **Sans-serif titles** - Common default
   → Always specify "Georgia serif for titles"

❌ **Implementing without spec** - Tempting to code directly from Spark
   → Always `/specify` first (Article III: Test-First)

---

## 🚀 Quick Commands

```bash
# View current foundation in browser
npm run preview
# → http://localhost:4321/mol-art-portfolio

# Run tests (should be 80/80 passing)
npm test

# When ready to implement Spark design
# In Claude Code conversation:
/specify [component description from Spark]
```

---

## 📊 Project Status

**Foundation**: ✅ Complete (80/80 tests passing)
**Spark Design**: ⏳ Ready to start
**Production Components**: ⏸️ Waiting for Spark designs
**Deployment**: ⏸️ After components complete

---

## Next Actions

1. **Open GitHub Spark** →
2. **Use SPARK_QUICK_START.md** →
3. **Design gallery layout** →
4. **Get artist feedback** →
5. **Return here for `/specify`** →

**You've got everything you need! Time to design! 🎨**
