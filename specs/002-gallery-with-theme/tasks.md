# Implementation Tasks: Gallery with Global Theme

**Feature**: 002-gallery-with-theme
**Generated**: 2025-10-05
**Status**: Ready for Implementation

---

## Task Legend

- `[ ]` = Pending
- `[P]` = Can be parallelized
- `[→]` = Sequential dependency (wait for previous)
- `[✓]` = Completed

**Estimated Total Time**: ~4-5 hours

---

## Phase -1: Pre-Implementation Gates (5 min)

### Constitutional Verification

- [ ] **Gate 1.1**: Verify ≤3 core components (Astro, React, Tailwind)
  - **Evidence**: Theme is vanilla JS, not a framework
  - **Pass Criteria**: No new framework dependencies

- [ ] **Gate 1.2**: Verify Article II (Content as Data)
  - **Evidence**: Gallery uses content collections
  - **Pass Criteria**: No database, all markdown

- [ ] **Gate 1.3**: Verify Article III (Test-First)
  - **Evidence**: Tests will be written in Phase 1
  - **Pass Criteria**: No implementation before tests

- [ ] **Gate 1.4**: Verify Article VI (Maintainability)
  - **Evidence**: Vanilla JS, clear docs, simple patterns
  - **Pass Criteria**: High schooler can understand

- [ ] **Gate 1.5**: Verify Article VII (Earthy Aesthetic)
  - **Evidence**: Clay palette defined for both themes
  - **Pass Criteria**: Warm earth tones only

**Approval Checkpoint**: ✋ **STOP - Get human approval before Phase 0**

---

## Phase 0: Branch & Setup (10 min)

### Git & Directory Setup

- [P] **Task 0.1**: Create git branch `002-gallery-with-theme`
  - Command: `git checkout -b 002-gallery-with-theme`
  - **Success**: Branch exists and is checked out

- [P] **Task 0.2**: Create spec directory structure
  - Create: `specs/002-gallery-with-theme/`
  - Copy: `spec.md`, `plan.md`, `tasks.md` to directory
  - **Success**: All spec files in place

- [P] **Task 0.3**: Create test file placeholders
  - Create: `tests/unit/theme.test.ts`
  - Create: `tests/integration/gallery.test.ts`
  - Create: `tests/integration/theme-toggle.test.ts`
  - **Success**: Files created (will be populated in Phase 1)

- [→] **Task 0.4**: Verify setup
  - Run: `git status` to confirm branch
  - Run: `ls specs/002-gallery-with-theme/` to verify files
  - **Success**: All files present, branch confirmed

---

## Phase 1: Test-First Development (45 min)

**Critical**: Write ALL tests BEFORE any implementation code

### Theme System Tests

- [ ] **Task 1.1**: Write theme.test.ts unit tests
  - File: `tests/unit/theme.test.ts`
  - Tests:
    ```typescript
    describe('Theme System', () => {
      it('defaults to light theme on first visit');
      it('persists theme choice in localStorage');
      it('applies data-theme attribute to documentElement');
      it('toggles between light and dark themes');
      it('updates localStorage when theme changes');
      it('reads theme from localStorage on page load');
      it('handles missing localStorage gracefully');
      it('exports toggleTheme to window object');
    });
    ```
  - **Success**: 8 test cases written
  - **Time**: ~15 min

### Gallery Component Tests

- [ ] **Task 1.2**: Write gallery.test.ts integration tests
  - File: `tests/integration/gallery.test.ts`
  - Test categories:
    - Layout (responsive grid, spacing)
    - Content (title, badges, description, images)
    - Theme colors (light mode)
    - Theme colors (dark mode)
    - Accessibility (ARIA, keyboard, focus)
    - Animations (fadeIn, stagger, shimmer)
  - **Success**: ~40 test cases written
  - **Time**: ~20 min

- [ ] **Task 1.3**: Write theme-toggle.test.ts component tests
  - File: `tests/integration/theme-toggle.test.ts`
  - Tests:
    ```typescript
    describe('Theme Toggle Component', () => {
      it('renders in fixed top-right position');
      it('shows Sun icon in dark mode');
      it('shows Moon icon in light mode');
      it('has proper ARIA labels');
      it('toggles theme on click');
      it('updates icon and label after toggle');
      it('persists theme across page navigation');
      it('has focus-visible state');
      it('works with keyboard (Enter/Space)');
    });
    ```
  - **Success**: 9 test cases written
  - **Time**: ~10 min

### Test Review & Approval

- [ ] **Task 1.4**: Review all test files
  - Verify test coverage is comprehensive
  - Check test descriptions are clear
  - Ensure all acceptance criteria have tests
  - **Success**: All tests reviewed

**Approval Checkpoint**: ✋ **STOP - Get human approval of tests**

### Confirm RED Phase

- [ ] **Task 1.5**: Run test suite and confirm failures
  - Command: `npm test`
  - **Expected**: ~57 tests FAIL (not yet implemented)
  - **Success**: RED phase confirmed, tests fail correctly

**Approval Checkpoint**: ✋ **STOP - Confirm RED phase before implementation**

---

## Phase 2: Theme System Implementation (60 min)

### Core Theme Script

- [ ] **Task 2.1**: Create theme.ts script
  - File: `src/scripts/theme.ts`
  - Implement:
    ```typescript
    type Theme = 'light' | 'dark';

    function getTheme(): Theme {
      if (typeof localStorage === 'undefined') return 'light';
      return (localStorage.getItem('pottery-theme') as Theme) || 'light';
    }

    function setTheme(theme: Theme): void {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('pottery-theme', theme);
      }
      document.documentElement.setAttribute('data-theme', theme);
    }

    function toggleTheme(): void {
      const current = getTheme();
      setTheme(current === 'light' ? 'dark' : 'light');
    }

    // Apply immediately to prevent FOUC
    if (typeof document !== 'undefined') {
      setTheme(getTheme());
    }

    // Export to window for components
    declare global {
      interface Window {
        toggleTheme: () => void;
        getTheme: () => Theme;
      }
    }

    if (typeof window !== 'undefined') {
      window.toggleTheme = toggleTheme;
      window.getTheme = getTheme;
    }
    ```
  - **Success**: Script created with all functions
  - **Time**: ~15 min

### Theme Toggle Component

- [ ] **Task 2.2**: Create ThemeToggle.astro component
  - File: `src/components/ThemeToggle.astro`
  - Implement:
    - Fixed position button (top-right)
    - Inline Sun/Moon SVG icons
    - Client-side script for toggle behavior
    - ARIA labels and accessibility
    - Tailwind classes for styling
  - **Success**: Component renders and functions
  - **Time**: ~20 min

- [ ] **Task 2.3**: Create Sun and Moon SVG icons
  - Create inline SVGs based on Lucide/Heroicons
  - Sun: Circle with 8 lines (rays)
  - Moon: Crescent shape
  - Both: 20x20 viewBox, currentColor stroke
  - **Success**: Icons display correctly
  - **Time**: ~5 min

### Global Layout Updates

- [ ] **Task 2.4**: Update BaseLayout.astro with theme system
  - File: `src/layouts/BaseLayout.astro`
  - Add to `<head>`:
    ```astro
    <script is:inline src="/src/scripts/theme.ts"></script>
    <style is:global>
      :root {
        --bg-page: #faf8f5;
        --bg-card: #ffffff;
        --text-title: #3d2f24;
        --text-body: #6b5544;
        --color-badge: #d4c4b0;
        --color-accent: #9c8671;
      }

      [data-theme='dark'] {
        --bg-page: #1a1410;
        --bg-card: #2d2419;
        --text-title: #f5f1ea;
        --text-body: #d4c4b0;
        --color-badge: #3d2f24;
      }

      * {
        transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease;
      }
    </style>
    ```
  - Add before `</body>`:
    ```astro
    <ThemeToggle />
    ```
  - **Success**: Theme system active site-wide
  - **Time**: ~15 min

### Theme System Testing

- [ ] **Task 2.5**: Run theme unit tests
  - Command: `npm run test tests/unit/theme.test.ts`
  - **Expected**: 8/8 tests PASS (GREEN)
  - **Success**: All theme tests passing
  - **Time**: ~5 min

**Checkpoint**: ✅ Theme system complete and tested

---

## Phase 3: Gallery Component Implementation (90 min)

### Gallery Page Setup

- [ ] **Task 3.1**: Create gallery.astro page
  - File: `src/pages/gallery.astro`
  - Import BaseLayout, getCollection
  - Query pottery pieces from content collections
  - Sort by date (newest first)
  - **Success**: Page created with data query
  - **Time**: ~10 min

### Gallery HTML Structure

- [ ] **Task 3.2**: Implement gallery grid HTML
  - Add container with max-width 1200px
  - Create CSS Grid with responsive columns
  - Map over pottery pieces
  - Create article elements for each card
  - Include all semantic HTML and ARIA attributes
  - **Success**: Gallery renders all pieces
  - **Time**: ~20 min

### Gallery Card Content

- [ ] **Task 3.3**: Implement card content structure
  - Square 1:1 aspect ratio image container
  - Image with lazy loading, alt text
  - Title in Georgia serif (h2)
  - Technique badges (array map)
  - Description with 3-line clamp
  - Screen reader text for accessibility
  - **Success**: All card content displays
  - **Time**: ~15 min

### Gallery Styling

- [ ] **Task 3.4**: Create gallery.css stylesheet
  - File: `src/styles/gallery.css`
  - Implement:
    - Responsive grid (1/2/3 columns)
    - Card base styles (padding, border-radius)
    - Theme-aware colors using CSS variables
    - Hover states (shadow, scale, border)
    - Focus-visible states
  - **Success**: Gallery styled correctly
  - **Time**: ~20 min

### Skeleton Loaders

- [ ] **Task 3.5**: Implement skeleton loading states
  - Add skeleton div before image
  - Create shimmer animation keyframes
  - Toggle visibility based on image load state
  - Use theme-aware colors
  - **Success**: Skeleton shows while loading
  - **Time**: ~15 min

### Page Load Animations

- [ ] **Task 3.6**: Implement fadeIn animations
  - Create fadeIn keyframe (opacity + translateY)
  - Apply animation to cards
  - Generate nth-child delays (0ms, 100ms, 200ms...)
  - Set animation duration 600ms ease-out
  - **Success**: Cards fade in sequentially
  - **Time**: ~10 min

### Gallery Testing

- [ ] **Task 3.7**: Run gallery integration tests
  - Command: `npm run test tests/integration/gallery.test.ts`
  - **Expected**: ~40 tests PASS (GREEN)
  - Fix any failing tests
  - **Success**: All gallery tests passing
  - **Time**: ~10 min (includes fixes)

**Checkpoint**: ✅ Gallery component complete and tested

---

## Phase 4: Polish & Refinement (30 min)

### Visual Comparison

- [ ] **Task 4.1**: Compare to Bolt.new prototype
  - Open Bolt.new prototype in browser
  - Open local gallery at http://localhost:4321/gallery
  - Side-by-side comparison
  - Verify colors match exactly
  - Check spacing values (32px, 24px, 12px)
  - Confirm hover effects identical
  - **Success**: Visual match confirmed
  - **Time**: ~10 min

### Fine-Tuning

- [P] **Task 4.2**: Adjust spacing if needed
  - Tweak grid gap, padding values
  - Ensure matches Bolt exactly

- [P] **Task 4.3**: Verify color accuracy
  - Check hex values in both themes
  - Use browser DevTools color picker

- [P] **Task 4.4**: Test animations smoothness
  - Verify 300ms transitions feel right
  - Check fadeIn stagger timing
  - Ensure no jank on low-end devices

  - **Success**: All polish items verified
  - **Time**: ~20 min total

---

## Phase 5: Documentation (30 min)

### Theme System Docs

- [ ] **Task 5.1**: Create theme-system.md
  - File: `docs/theme-system.md`
  - Document:
    - How theme toggle works
    - How to customize colors
    - How to add new themes
    - Technical implementation details
  - **Success**: Complete theme documentation
  - **Time**: ~15 min

### Update Existing Docs

- [ ] **Task 5.2**: Update adding-new-piece.md
  - File: `docs/adding-new-piece.md`
  - Add: Gallery-specific instructions
  - Add: Screenshots showing gallery
  - **Success**: Artist guide updated
  - **Time**: ~5 min

- [ ] **Task 5.3**: Update README.md
  - File: `README.md`
  - Add gallery to feature list
  - Add theme toggle to features
  - Update status badges
  - Add screenshot of gallery
  - **Success**: README reflects new features
  - **Time**: ~10 min

**Checkpoint**: ✅ Documentation complete

---

## Phase 6: Testing & Verification (45 min)

### Automated Testing

- [ ] **Task 6.1**: Run full test suite
  - Command: `npm test`
  - **Expected**: 137 tests PASS (80 existing + 57 new)
  - Fix any failures
  - **Success**: 100% tests passing
  - **Time**: ~10 min

- [ ] **Task 6.2**: Run type checking
  - Command: `npm run type-check`
  - **Expected**: No TypeScript errors
  - **Success**: Type check passes
  - **Time**: ~2 min

- [ ] **Task 6.3**: Build production version
  - Command: `npm run build`
  - **Expected**: Build succeeds
  - Verify gallery page in `dist/gallery/`
  - **Success**: Production build works
  - **Time**: ~5 min

### Performance Testing

- [ ] **Task 6.4**: Run Lighthouse audit
  - Open: `http://localhost:4321/gallery`
  - Run: Chrome DevTools → Lighthouse
  - Test: Performance, Accessibility, Best Practices, SEO
  - **Expected**: All ≥90 scores
  - **Success**: Performance targets met
  - **Time**: ~5 min

### Accessibility Testing

- [ ] **Task 6.5**: Test keyboard navigation
  - Tab through all cards
  - Verify focus-visible states
  - Test Enter/Space on cards
  - Test theme toggle with keyboard
  - **Success**: Full keyboard navigation works
  - **Time**: ~5 min

- [ ] **Task 6.6**: Test screen reader compatibility
  - Test with: NVDA (Windows) or VoiceOver (Mac)
  - Verify ARIA labels announced
  - Check alt text read correctly
  - Verify theme toggle accessible
  - **Success**: Screen reader compatible
  - **Time**: ~10 min

### Cross-Browser Testing

- [ ] **Task 6.7**: Test in multiple browsers
  - Test: Chrome, Firefox, Safari, Edge
  - Verify: Gallery layout, theme toggle, animations
  - **Success**: Works in all browsers
  - **Time**: ~8 min

### Mobile Testing

- [ ] **Task 6.8**: Test responsive behavior
  - Resize browser to mobile (< 640px)
  - Verify: 1-column layout
  - Test: Touch interactions
  - Verify: Theme toggle accessible on mobile
  - **Success**: Mobile experience smooth
  - **Time**: ~5 min

**Checkpoint**: ✅ All testing complete

---

## Phase 7: Deployment (20 min)

### Git Commit

- [ ] **Task 7.1**: Stage all changes
  - Command: `git add -A`
  - Verify: `git status` shows all new/modified files
  - **Success**: All changes staged
  - **Time**: ~2 min

- [ ] **Task 7.2**: Create commit
  - Command:
    ```bash
    git commit -m "feat: Add pottery gallery with global theme toggle

    Implemented responsive pottery gallery component:
    - Responsive grid layout (1/2/3 columns)
    - Integration with content collections
    - Sequential fade-in animations
    - Skeleton loaders with shimmer effect
    - Full keyboard navigation and ARIA labels

    Implemented global site-wide theme system:
    - Light/dark theme toggle
    - Persistent theme choice in localStorage
    - Smooth 300ms color transitions
    - Theme applies to all pages
    - No FOUC (Flash of Unstyled Content)

    Color palette (both themes):
    - Light: Warm cream backgrounds, earth tone text
    - Dark: Deep earth backgrounds, light tan text
    - Both maintain warm, handcrafted aesthetic

    Features based on Bolt.new prototype.
    All 137 tests passing.
    Lighthouse scores ≥90 all metrics.

    🤖 Generated with [Claude Code](https://claude.com/claude-code)

    Co-Authored-By: Claude <noreply@anthropic.com>"
    ```
  - **Success**: Commit created
  - **Time**: ~3 min

### Push to GitHub

- [ ] **Task 7.3**: Push branch to remote
  - Command: `git push -u origin 002-gallery-with-theme`
  - Verify: Branch appears on GitHub
  - **Success**: Branch pushed
  - **Time**: ~2 min

- [ ] **Task 7.4**: Verify in GitHub repo
  - Open: https://github.com/nice-and-precise/mol-art-portfolio
  - Check: Branch `002-gallery-with-theme` exists
  - Review: All files present
  - **Success**: Changes on GitHub
  - **Time**: ~3 min

### Deployment

- [ ] **Task 7.5**: Merge to main branch
  - Option A: Merge locally then push
  - Option B: Create PR and merge on GitHub
  - **Success**: Changes in main branch
  - **Time**: ~5 min

- [ ] **Task 7.6**: Deploy to GitHub Pages
  - Command: `npm run deploy`
  - Wait for deployment
  - Verify: Gallery live at production URL
  - Test: Theme toggle works in production
  - **Success**: Gallery deployed and functional
  - **Time**: ~5 min

**Checkpoint**: ✅ Feature deployed to production

---

## Final Verification (10 min)

- [ ] **Task 8.1**: Test production site
  - Open: https://nice-and-precise.github.io/mol-art-portfolio/gallery
  - Verify: Gallery displays correctly
  - Test: Theme toggle persists
  - Check: Animations work smoothly
  - Test: Keyboard navigation
  - **Success**: All features work in production

- [ ] **Task 8.2**: Update project status
  - Update: `PROJECT_STATUS.md`
  - Mark: Gallery feature complete
  - Update: Progress percentage
  - **Success**: Status documentation current

**Feature Status**: ✅ **COMPLETE**

---

## Summary

**Total Tasks**: 68 tasks across 8 phases
**Estimated Time**: 4-5 hours
**Tests Written**: ~57 new tests
**Files Created**: ~10 new files
**Files Modified**: ~3 existing files

**Key Deliverables**:
1. ✅ Pottery gallery component with responsive grid
2. ✅ Global site-wide theme toggle (light/dark)
3. ✅ Comprehensive test coverage (137 total tests)
4. ✅ Full accessibility support
5. ✅ Smooth animations and polish
6. ✅ Complete documentation
7. ✅ Production deployment

**Constitutional Compliance**: ✅ All 9 articles passing

---

**Next Action**: Begin Phase 0 (Branch & Setup) after human approval ✋
