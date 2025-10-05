# E2E Testing Specification

**Feature**: End-to-End Testing Suite
**Version**: 1.0.0
**Date**: 2025-10-05
**Status**: Phase 0 - Specification

---

## 🎯 Purpose

Create comprehensive end-to-end tests that simulate real user interactions to verify the entire pottery portfolio website works correctly in production-like conditions.

**Goals**:
1. Verify critical user journeys work from start to finish
2. Catch integration bugs that unit tests miss
3. Ensure UI interactions work across browsers
4. Validate production build quality
5. Document expected user behavior

---

## 📋 Acceptance Criteria

### AC1: Gallery Page Testing ✅
**Given** a user visits the gallery page
**When** they interact with filters and sorting
**Then** the gallery should update correctly without errors

**Scenarios**:
1. Filter by single technique
2. Filter by multiple techniques + color
3. Sort by different options
4. Clear all filters
5. URL state preserved

### AC2: Navigation Testing ✅
**Given** a user is on any page
**When** they navigate between pages
**Then** navigation should work smoothly

**Scenarios**:
1. Homepage → Gallery
2. Gallery → Detail page
3. Detail page → Back to gallery
4. Browser back/forward buttons
5. Direct URL access

### AC3: Detail Page Testing ✅
**Given** a user views a pottery detail page
**When** they interact with the page elements
**Then** all features should work correctly

**Scenarios**:
1. Page loads with all content
2. Images display correctly
3. Metadata sidebar visible
4. Markdown content rendered
5. SEO meta tags present

### AC4: Lightbox Testing ✅
**Given** a user opens the image lightbox
**When** they navigate through images
**Then** the lightbox should function properly

**Scenarios**:
1. Click thumbnail opens lightbox
2. Keyboard navigation (arrows, ESC)
3. Mouse navigation (buttons, backdrop click)
4. Image counter updates
5. Loading states appear
6. Screen reader announcements

### AC5: Theme System Testing ✅
**Given** a user toggles the theme
**When** they switch between light/dark mode
**Then** the theme should apply consistently

**Scenarios**:
1. Toggle theme button works
2. Theme persists in localStorage
3. Theme applies to all pages
4. Theme transitions smoothly

### AC6: Responsive Design Testing ✅
**Given** a user visits on different devices
**When** they resize the viewport
**Then** the layout should adapt appropriately

**Scenarios**:
1. Mobile (320px - 640px)
2. Tablet (640px - 1024px)
3. Desktop (1024px+)

### AC7: Performance Testing ✅
**Given** the site is in production
**When** pages are measured
**Then** performance should meet targets

**Criteria**:
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- No console errors
- No 404s

---

## 🧪 Test Scenarios (Detailed)

### Scenario 1: Complete User Journey (Happy Path)

**User Story**: As a visitor, I want to browse pottery, filter by technique, view details, and see images in the lightbox.

**Steps**:
1. Navigate to homepage
   - ✅ Verify title: "Mol_Art Portfolio"
   - ✅ Verify hero section visible
   - ✅ Verify "View Gallery" button present

2. Click "View Gallery" → Navigate to `/gallery`
   - ✅ Verify URL: `/gallery`
   - ✅ Verify pottery cards displayed
   - ✅ Verify filter pills visible
   - ✅ Verify sort dropdown visible

3. Apply filter: Technique = "hand-building"
   - ✅ Click "hand-building" pill
   - ✅ Verify pill highlighted (active state)
   - ✅ Verify URL: `/gallery?technique=hand-building`
   - ✅ Verify only matching pieces shown
   - ✅ Verify filter count: "1 filter active"

4. Add second filter: Color = "terracotta"
   - ✅ Click "terracotta" pill
   - ✅ Verify URL: `/gallery?technique=hand-building&color=terracotta`
   - ✅ Verify AND logic applied (fewer results)
   - ✅ Verify filter count: "2 filters active"

5. Sort: Select "Title A-Z"
   - ✅ Select "Title A-Z" from dropdown
   - ✅ Verify URL: `/gallery?technique=hand-building&color=terracotta&sort=title-asc`
   - ✅ Verify cards reordered alphabetically

6. Click pottery piece → Navigate to detail page
   - ✅ Click first pottery card
   - ✅ Verify URL: `/gallery/piece-01-earth-vessel`
   - ✅ Verify page title: "Earth Vessel - Mol_Art"
   - ✅ Verify hero image visible
   - ✅ Verify title "Earth Vessel" displayed
   - ✅ Verify description visible
   - ✅ Verify metadata sidebar visible

7. Scroll to image gallery section
   - ✅ Verify "Image Gallery" heading
   - ✅ Verify thumbnail grid visible
   - ✅ Count thumbnails: 3 (main + 2 details)

8. Click thumbnail → Open lightbox
   - ✅ Click second thumbnail
   - ✅ Verify lightbox opens
   - ✅ Verify backdrop visible
   - ✅ Verify image displayed
   - ✅ Verify counter: "2 / 3"
   - ✅ Verify close button visible
   - ✅ Verify prev/next buttons visible

9. Navigate in lightbox: Press Arrow Right
   - ✅ Press keyboard "→"
   - ✅ Verify next image loads
   - ✅ Verify counter: "3 / 3"
   - ✅ Verify image changes

10. Navigate: Press Arrow Left
    - ✅ Press keyboard "←"
    - ✅ Verify previous image loads
    - ✅ Verify counter: "2 / 3"

11. Close lightbox: Press ESC
    - ✅ Press keyboard "ESC"
    - ✅ Verify lightbox closes
    - ✅ Verify backdrop removed
    - ✅ Verify body scroll unlocked

12. Navigate back: Click "Back to Gallery"
    - ✅ Click "Back to Gallery" link
    - ✅ Verify URL: `/gallery?technique=hand-building&color=terracotta&sort=title-asc`
    - ✅ Verify filters preserved
    - ✅ Verify active filter pills highlighted

13. Clear filters: Click "Clear All"
    - ✅ Click "Clear All" button
    - ✅ Verify URL: `/gallery`
    - ✅ Verify all pieces shown
    - ✅ Verify no pills highlighted
    - ✅ Verify filter count: "0 filters active"

**Expected Result**: ✅ Complete user journey works without errors

---

### Scenario 2: Error Handling & Edge Cases

**Steps**:
1. Direct URL with invalid slug
   - Navigate to `/gallery/nonexistent-piece`
   - ✅ Verify 404 or graceful error

2. Direct URL with invalid filter params
   - Navigate to `/gallery?technique=invalid&color=fake`
   - ✅ Verify page loads
   - ✅ Verify no results message shown

3. Rapid filter changes
   - Click multiple filter pills quickly (10 clicks/sec)
   - ✅ Verify no UI freeze
   - ✅ Verify final state correct

4. Lightbox with single image
   - Open lightbox with only 1 image
   - ✅ Verify counter: "1 / 1"
   - ✅ Verify next/prev stay on same image

5. Browser back button during filter
   - Apply filters → Navigate to detail → Browser back
   - ✅ Verify filters preserved
   - ✅ Verify gallery state correct

---

### Scenario 3: Accessibility Testing

**Steps**:
1. Keyboard-only navigation
   - Tab through all interactive elements
   - ✅ Verify logical tab order
   - ✅ Verify focus indicators visible
   - ✅ Verify no keyboard traps

2. Screen reader announcements
   - Open lightbox
   - Navigate images
   - ✅ Verify ARIA live regions update
   - ✅ Verify announcements: "Image 2 of 3: ..."

3. ARIA attributes
   - ✅ Verify all buttons have labels
   - ✅ Verify images have alt text
   - ✅ Verify landmarks present

---

### Scenario 4: Performance Testing

**Steps**:
1. Page load performance
   - Navigate to each page
   - ✅ Measure LCP, FID, CLS
   - ✅ Verify no console errors

2. Image loading
   - Scroll through gallery
   - ✅ Verify lazy loading works
   - ✅ Verify skeleton loaders appear

3. Bundle size
   - ✅ Verify total JS < 60 kB gzipped
   - ✅ Verify no unused code warnings

---

## 🛠️ Testing Tools

### Primary: Playwright
- **Why**: Modern, fast, multi-browser support
- **Browsers**: Chromium, Firefox, WebKit
- **Features**: Auto-wait, screenshots, video recording

### Assertions
- **Expect API**: Built-in Playwright assertions
- **Custom matchers**: For specific UI states

### Reporting
- **HTML Reporter**: Visual test results
- **Screenshots**: On failure
- **Video**: For debugging

---

## 📊 Test Coverage Matrix

| Feature | Unit Tests | Integration Tests | E2E Tests |
|---------|-----------|-------------------|-----------|
| Gallery Filtering | ✅ 28 tests | ✅ 24 tests (DOM) | 🔄 Needed |
| Detail Pages | ✅ 24 tests | N/A | 🔄 Needed |
| Lightbox | ✅ 24 tests | N/A | 🔄 Needed |
| Navigation | ✅ In build tests | N/A | 🔄 Needed |
| Theme System | ✅ 8 tests | ✅ 30 tests | 🔄 Needed |

**Target E2E Tests**: 15-20 scenarios

---

## 🎯 Success Criteria

### Code Quality
- [ ] All E2E tests pass (100%)
- [ ] Tests run in < 60 seconds
- [ ] No flaky tests (retry logic if needed)
- [ ] Code coverage: Critical paths tested

### User Experience
- [ ] All user journeys validated
- [ ] No console errors during tests
- [ ] No 404s or network errors
- [ ] Theme persistence works

### Performance
- [ ] LCP < 2.5s on all pages
- [ ] No CLS during interactions
- [ ] Images load progressively

### Accessibility
- [ ] Keyboard navigation complete
- [ ] ARIA announcements working
- [ ] Focus management correct

---

## 📝 Non-Functional Requirements

### NFR1: Test Execution Speed
- Full suite: < 60 seconds
- Parallel execution: Enabled
- Retry on failure: Max 2 retries

### NFR2: Test Reliability
- No false positives
- Deterministic results
- Isolated test environment

### NFR3: Maintainability
- Page Object Model pattern
- Reusable helper functions
- Clear test descriptions

### NFR4: CI/CD Integration
- Run on every PR
- Run on main branch commits
- Block merge on failure

---

## 🔄 SDD Workflow

### Phase 0: Specification ✅
- ✅ Define acceptance criteria
- ✅ Document test scenarios
- ✅ Plan testing strategy

### Phase 1: Planning
- [ ] Choose testing framework (Playwright)
- [ ] Design test structure
- [ ] Create Page Object Models

### Phase 2: Test Creation (RED)
- [ ] Write E2E tests
- [ ] Verify tests fail initially
- [ ] Document expected behavior

### Phase 3: Verification (GREEN)
- [ ] Run tests against production
- [ ] Fix any bugs found
- [ ] Verify all tests pass

### Phase 4: Documentation
- [ ] Test results report
- [ ] Coverage analysis
- [ ] CI/CD setup guide

---

## ✅ Approval Checklist

**Before proceeding to Phase 1**:
- [x] Acceptance criteria clear
- [x] Test scenarios comprehensive
- [x] Success criteria defined
- [x] Tools selected
- [x] User approval received

**Status**: ✅ **Ready for Phase 1 (Planning)**

---

**Created by**: Claude Code (AI Agent)
**Date**: 2025-10-05
**Next Step**: Phase 1 - Planning & Setup
