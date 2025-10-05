# Feature 003: Task Breakdown

**Phase**: Phase 1 - Planning
**Status**: Ready for Phase 2 (Test Creation)
**Total Estimated Tasks**: 82
**Total Estimated Hours**: 16-18 hours

---

## Task Organization

Tasks are organized by implementation phase and component. Each task includes:
- **ID**: Unique identifier
- **Description**: What needs to be done
- **Estimated Time**: Hours
- **Dependencies**: Previous tasks that must complete first
- **Success Criteria**: How to verify completion

---

## Phase 2: Test Creation (RED Phase)

**Goal**: Write all tests BEFORE implementation. Tests should FAIL initially.

### 2.1: Filter Logic Tests (gallery-filters.ts)

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T001 | Create `tests/unit/gallery-filters.test.ts` | 0.5h | - | File exists |
| T002 | Test: Parse URL params to FilterState | 0.5h | T001 | Test fails (no implementation) |
| T003 | Test: Single technique filter | 0.25h | T001 | Test fails |
| T004 | Test: Multiple technique filters (AND logic) | 0.25h | T001 | Test fails |
| T005 | Test: Single color filter | 0.25h | T001 | Test fails |
| T006 | Test: Multiple color filters (AND logic) | 0.25h | T001 | Test fails |
| T007 | Test: Technique + color combined | 0.25h | T001 | Test fails |
| T008 | Test: Featured-only filter | 0.25h | T001 | Test fails |
| T009 | Test: Clear all filters | 0.25h | T001 | Test fails |
| T010 | Test: Sort by date descending (default) | 0.25h | T001 | Test fails |
| T011 | Test: Sort by date ascending | 0.25h | T001 | Test fails |
| T012 | Test: Sort by title A-Z | 0.25h | T001 | Test fails |
| T013 | Test: Sort by title Z-A | 0.25h | T001 | Test fails |
| T014 | Test: Sort by featured first | 0.25h | T001 | Test fails |
| T015 | Test: updateURL() generates correct query string | 0.5h | T001 | Test fails |
| T016 | Test: getFilterOptions() extracts unique values | 0.5h | T001 | Test fails |
| T017 | Test: Empty filters returns all pieces | 0.25h | T001 | Test fails |
| T018 | Test: Filter with no matches returns empty | 0.25h | T001 | Test fails |

**Subtotal**: 5 hours

### 2.2: Lightbox Tests (lightbox.ts)

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T019 | Create `tests/unit/lightbox.test.ts` | 0.5h | - | File exists |
| T020 | Test: initLightbox() sets up event listeners | 0.5h | T019 | Test fails |
| T021 | Test: openLightbox() displays modal | 0.25h | T019 | Test fails |
| T022 | Test: closeLightbox() hides modal | 0.25h | T019 | Test fails |
| T023 | Test: nextImage() advances to next | 0.25h | T019 | Test fails |
| T024 | Test: prevImage() goes to previous | 0.25h | T019 | Test fails |
| T025 | Test: Wrap around at last image (next → first) | 0.25h | T019 | Test fails |
| T026 | Test: Wrap around at first image (prev → last) | 0.25h | T019 | Test fails |
| T027 | Test: ESC key closes lightbox | 0.25h | T019 | Test fails |
| T028 | Test: Arrow right → nextImage() | 0.25h | T019 | Test fails |
| T029 | Test: Arrow left → prevImage() | 0.25h | T019 | Test fails |
| T030 | Test: Click backdrop closes lightbox | 0.25h | T019 | Test fails |
| T031 | Test: Click close button closes lightbox | 0.25h | T019 | Test fails |
| T032 | Test: Focus trapped within lightbox when open | 0.5h | T019 | Test fails |
| T033 | Test: Body scroll locked when lightbox open | 0.25h | T019 | Test fails |

**Subtotal**: 4 hours

### 2.3: Detail Page Tests (integration)

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T034 | Create `tests/integration/detail-page.test.ts` | 0.5h | - | File exists |
| T035 | Test: Detail page exists at /gallery/[slug] | 0.25h | T034 | Test fails |
| T036 | Test: 404 for non-existent slug | 0.25h | T034 | Test fails |
| T037 | Test: Hero image renders with correct src | 0.25h | T034 | Test fails |
| T038 | Test: Title renders in hero overlay | 0.25h | T034 | Test fails |
| T039 | Test: Description renders | 0.25h | T034 | Test fails |
| T040 | Test: Markdown content renders (Story section) | 0.5h | T034 | Test fails |
| T041 | Test: Metadata sidebar renders date | 0.25h | T034 | Test fails |
| T042 | Test: Metadata sidebar renders techniques | 0.25h | T034 | Test fails |
| T043 | Test: Metadata sidebar renders colors | 0.25h | T034 | Test fails |
| T044 | Test: Metadata sidebar renders textures (optional) | 0.25h | T034 | Test fails |
| T045 | Test: AI section renders when aiDescription exists | 0.5h | T034 | Test fails |
| T046 | Test: AI section hidden when aiDescription empty | 0.5h | T034 | Test fails |
| T047 | Test: detailImages render as thumbnails | 0.5h | T034 | Test fails |
| T048 | Test: Back button links to /gallery | 0.25h | T034 | Test fails |
| T049 | Test: Page title includes piece title | 0.25h | T034 | Test fails |
| T050 | Test: Meta description includes piece description | 0.25h | T034 | Test fails |
| T051 | Test: Open Graph tags present (og:title, og:image) | 0.5h | T034 | Test fails |
| T052 | Test: Semantic HTML (article, section, aside) | 0.5h | T034 | Test fails |

**Subtotal**: 6 hours

### 2.4: Gallery Filtering Tests (integration)

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T053 | Create `tests/integration/gallery-filtering.test.ts` | 0.5h | - | File exists |
| T054 | Test: GalleryFilters component renders | 0.25h | T053 | Test fails |
| T055 | Test: All technique pills render | 0.25h | T053 | Test fails |
| T056 | Test: All color pills render | 0.25h | T053 | Test fails |
| T057 | Test: Clicking technique pill filters gallery | 0.5h | T053 | Test fails |
| T058 | Test: Clicking color pill filters gallery | 0.5h | T053 | Test fails |
| T059 | Test: Multiple filters combine with AND logic | 0.5h | T053 | Test fails |
| T060 | Test: Featured checkbox filters correctly | 0.5h | T053 | Test fails |
| T061 | Test: Sort dropdown changes card order | 0.5h | T053 | Test fails |
| T062 | Test: URL updates when filter applied | 0.5h | T053 | Test fails |
| T063 | Test: Filters read from URL on page load | 0.5h | T053 | Test fails |
| T064 | Test: Clear filters button resets state | 0.5h | T053 | Test fails |
| T065 | Test: Filter count badge shows correct number | 0.25h | T053 | Test fails |
| T066 | Test: "No results" message when filters yield zero | 0.25h | T053 | Test fails |
| T067 | Test: Cards fade in/out with stagger animation | 0.5h | T053 | Test fails |

**Subtotal**: 5.5 hours

### 2.5: Accessibility Tests

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T068 | Test: Filter pills have aria-pressed state | 0.25h | T053 | Test fails |
| T069 | Test: Lightbox has role="dialog" and aria-modal | 0.25h | T019 | Test fails |
| T070 | Test: All buttons have aria-labels | 0.5h | T053, T019 | Test fails |
| T071 | Test: Keyboard navigation works (Tab through filters) | 0.5h | T053 | Test fails |
| T072 | Test: Enter/Space activates filter pills | 0.25h | T053 | Test fails |

**Subtotal**: 1.75 hours

**Phase 2 Total**: ~22.25 hours of test writing

---

## Phase 3: Implementation (GREEN Phase)

**Goal**: Implement features to make all tests pass

### 3.1: Gallery Filtering & Sorting

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T073 | Create `src/scripts/gallery-filters.ts` | 0.5h | T002-T018 | File exists |
| T074 | Implement parseURLParams() function | 0.5h | T073, T002 | T002 passes |
| T075 | Implement filterPieces() function | 1h | T073, T003-T009 | T003-T009 pass |
| T076 | Implement sortPieces() function | 1h | T073, T010-T014 | T010-T014 pass |
| T077 | Implement updateURL() function | 0.5h | T073, T015 | T015 passes |
| T078 | Implement getFilterOptions() function | 0.5h | T073, T016 | T016 passes |
| T079 | Create `src/components/GalleryFilters.astro` | 1h | T073 | Component renders |
| T080 | Add filter UI (technique pills) | 0.5h | T079, T055 | T055 passes |
| T081 | Add filter UI (color pills) | 0.5h | T079, T056 | T056 passes |
| T082 | Add featured checkbox | 0.5h | T079, T060 | T060 passes |
| T083 | Add sort dropdown | 0.5h | T079, T061 | T061 passes |
| T084 | Add active filters counter | 0.5h | T079, T065 | T065 passes |
| T085 | Add clear filters button | 0.5h | T079, T064 | T064 passes |
| T086 | Wire up event listeners in gallery-filters.ts | 1h | T079, T057-T063 | T057-T063 pass |
| T087 | Update `src/pages/gallery/index.astro` to use filters | 1h | T079, T054 | T054 passes |
| T088 | Add fade animation CSS | 0.5h | T087, T067 | T067 passes |
| T089 | Add "No results" message | 0.5h | T087, T066 | T066 passes |
| T090 | Test filter integration end-to-end | 0.5h | T073-T089 | All filter tests pass |

**Subtotal**: 11 hours

### 3.2: Detail Pages

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T091 | Create `src/pages/gallery/[slug].astro` | 1h | T035-T036 | T035-T036 pass |
| T092 | Implement getStaticPaths() for routing | 0.5h | T091, T035 | T035 passes |
| T093 | Add hero section (image + title overlay) | 0.5h | T091, T037-T038 | T037-T038 pass |
| T094 | Add description section | 0.5h | T091, T039 | T039 passes |
| T095 | Render markdown content (Story, Process) | 0.5h | T091, T040 | T040 passes |
| T096 | Add AI Perspective section (conditional) | 0.5h | T091, T045-T046 | T045-T046 pass |
| T097 | Create `src/components/PieceMetadata.astro` | 0.5h | T041-T044 | Component renders |
| T098 | Add date display to PieceMetadata | 0.25h | T097, T041 | T041 passes |
| T099 | Add technique badges to PieceMetadata | 0.25h | T097, T042 | T042 passes |
| T100 | Add color swatches to PieceMetadata | 0.5h | T097, T043 | T043 passes |
| T101 | Add texture display to PieceMetadata | 0.25h | T097, T044 | T044 passes |
| T102 | Add Back to Gallery button | 0.25h | T091, T048 | T048 passes |
| T103 | Add SEO: page title | 0.25h | T091, T049 | T049 passes |
| T104 | Add SEO: meta description | 0.25h | T091, T050 | T050 passes |
| T105 | Add SEO: Open Graph tags | 0.5h | T091, T051 | T051 passes |
| T106 | Ensure semantic HTML | 0.5h | T091, T052 | T052 passes |
| T107 | Add responsive layout (mobile/desktop split) | 1h | T091 | Responsive at all breakpoints |
| T108 | Test detail page integration | 0.5h | T091-T107 | All detail page tests pass |

**Subtotal**: 8.5 hours

### 3.3: Image Gallery & Lightbox

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T109 | Create `src/scripts/lightbox.ts` | 0.5h | T020-T033 | File exists |
| T110 | Implement initLightbox() function | 0.5h | T109, T020 | T020 passes |
| T111 | Implement openLightbox() function | 0.5h | T109, T021 | T021 passes |
| T112 | Implement closeLightbox() function | 0.5h | T109, T022 | T022 passes |
| T113 | Implement nextImage() function | 0.5h | T109, T023, T025 | T023, T025 pass |
| T114 | Implement prevImage() function | 0.5h | T109, T024, T026 | T024, T026 pass |
| T115 | Implement keyboard event handlers | 1h | T109, T027-T029 | T027-T029 pass |
| T116 | Implement backdrop click handler | 0.5h | T109, T030 | T030 passes |
| T117 | Implement focus trap | 1h | T109, T032 | T032 passes |
| T118 | Implement body scroll lock | 0.5h | T109, T033 | T033 passes |
| T119 | Create `src/components/ImageGallery.astro` | 1h | T109, T047 | Component renders |
| T120 | Add thumbnail grid HTML | 0.5h | T119, T047 | Thumbnails render |
| T121 | Add lightbox modal HTML | 1h | T119 | Modal structure complete |
| T122 | Add lightbox CSS (backdrop, content, animations) | 1h | T119 | Lightbox styled correctly |
| T123 | Wire up lightbox event listeners | 0.5h | T119, T109 | Clicking thumbnail opens lightbox |
| T124 | Add prev/next buttons to lightbox | 0.5h | T119 | Buttons render and work |
| T125 | Test lightbox integration | 0.5h | T109-T124 | All lightbox tests pass |

**Subtotal**: 10 hours

### 3.4: Accessibility Implementation

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T126 | Add ARIA labels to all filter controls | 0.5h | T079, T068-T070 | T068-T070 pass |
| T127 | Add ARIA labels to lightbox | 0.5h | T119, T069-T070 | T069-T070 pass |
| T128 | Add keyboard navigation to filters | 0.5h | T079, T071-T072 | T071-T072 pass |
| T129 | Manual test: Screen reader (NVDA or VoiceOver) | 1h | All implementation | Screen reader works |
| T130 | Manual test: Keyboard-only navigation | 0.5h | All implementation | Fully keyboard accessible |
| T131 | Fix any accessibility issues found | 1h | T129-T130 | All a11y tests pass |

**Subtotal**: 4 hours

### 3.5: Styling & Polish

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T132 | Style GalleryFilters component (pills, badges) | 1h | T079 | Matches clay theme |
| T133 | Style PieceMetadata component | 0.5h | T097 | Matches clay theme |
| T134 | Style detail page hero section | 0.5h | T091 | Matches design mockup |
| T135 | Style image gallery thumbnails | 0.5h | T119 | Grid layout responsive |
| T136 | Add hover effects (cards, buttons, thumbnails) | 0.5h | T079, T119 | Smooth transitions |
| T137 | Add loading states (skeleton loaders if needed) | 0.5h | T091 | Good UX while loading |
| T138 | Test responsive design (mobile, tablet, desktop) | 1h | All styling | Works on all sizes |
| T139 | Test light/dark theme compatibility | 0.5h | All styling | Both themes work |

**Subtotal**: 5 hours

### 3.6: Integration Testing & Bug Fixes

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T140 | Run full test suite (`npm test`) | 0.25h | All implementation | All 250+ tests pass |
| T141 | Manual test: Gallery → Filter → Detail flow | 0.5h | T073-T108 | Flow works smoothly |
| T142 | Manual test: Detail → Lightbox → Navigation | 0.5h | T109-T125 | Lightbox works perfectly |
| T143 | Manual test: Browser back button preserves filters | 0.5h | T073-T090 | Back button works |
| T144 | Manual test: Direct URL to detail page | 0.25h | T091 | Direct link works |
| T145 | Manual test: Share filtered gallery URL | 0.25h | T073-T090 | Shared URL works |
| T146 | Fix bugs found during manual testing | 2h | T141-T145 | All bugs resolved |

**Subtotal**: 4.25 hours

### 3.7: Performance Optimization

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T147 | Run Lighthouse audit on detail page | 0.25h | All implementation | Get baseline scores |
| T148 | Optimize images (lazy loading, sizing) | 0.5h | T147 | LCP improves |
| T149 | Add CSS containment where beneficial | 0.5h | T147 | CLS remains 0 |
| T150 | Optimize JavaScript bundle size | 0.5h | T147 | TBT remains low |
| T151 | Run final Lighthouse audit | 0.25h | T148-T150 | All scores ≥90 |

**Subtotal**: 2 hours

**Phase 3 Total**: ~44.75 hours of implementation

---

## Phase 4: Documentation

| ID | Task | Time | Dependencies | Verification |
|----|------|------|--------------|--------------|
| T152 | Update README.md with Feature 003 info | 0.5h | Phase 3 complete | README accurate |
| T153 | Create artist guide: Adding detail images | 1h | Phase 3 complete | Guide clear |
| T154 | Update PROJECT_STATUS.md (progress, tests, metrics) | 0.5h | Phase 3 complete | Status accurate |
| T155 | Document AI integration plan (for Feature 004/005) | 0.5h | ai-integration-research.md | Plan documented |
| T156 | Add inline code comments for complex logic | 0.5h | Phase 3 complete | Code well-commented |
| T157 | Generate TypeScript docs (if using TSDoc) | 0.5h | Phase 3 complete | Docs generated |

**Subtotal**: 3.5 hours

---

## Summary by Phase

| Phase | Tasks | Estimated Hours |
|-------|-------|-----------------|
| Phase 2: Test Creation | T001-T072 (72 tasks) | ~22 hours |
| Phase 3: Implementation | T073-T151 (79 tasks) | ~45 hours |
| Phase 4: Documentation | T152-T157 (6 tasks) | ~3.5 hours |
| **TOTAL** | **157 tasks** | **~70 hours** |

**Note**: This is comprehensive task breakdown. Actual implementation will be iterative, focusing on making tests pass incrementally. Many tasks will be done in parallel (e.g., styling while implementing).

---

## Realistic Timeline

**Estimate for User**: 16-18 hours across 3-5 sessions

**Why the discrepancy?**
- Task breakdown includes EVERY granular step (for planning purposes)
- Actual development involves batch processing similar tasks
- Parallel work (styling + implementation + testing)
- Some tasks faster than estimated due to code reuse

**Suggested Sessions**:

### Session 1 (4-5 hours): Filters & Sorting
- Write filter tests (T001-T018, T053-T067)
- Implement filtering & sorting (T073-T090)
- ✅ Deliverable: Working gallery filters

### Session 2 (4-5 hours): Detail Pages
- Write detail page tests (T034-T052)
- Implement detail pages (T091-T108)
- ✅ Deliverable: Clickable detail pages with full content

### Session 3 (4-5 hours): Image Gallery & Lightbox
- Write lightbox tests (T019-T033)
- Implement lightbox (T109-T125)
- ✅ Deliverable: Working image gallery viewer

### Session 4 (2-3 hours): Accessibility & Polish
- Accessibility implementation (T126-T131)
- Styling & polish (T132-T139)
- ✅ Deliverable: Production-ready, accessible UI

### Session 5 (2-3 hours): Testing & Documentation
- Integration testing (T140-T146)
- Performance optimization (T147-T151)
- Documentation (T152-T157)
- ✅ Deliverable: Feature complete, documented, tested

---

## Next Steps

1. **User approval** of this task breakdown
2. **Begin Phase 2**: Write tests (Session 1, start with filters)
3. **User reviews tests** before implementation begins
4. **Proceed to Phase 3**: Implement to make tests pass

---

**Status**: Phase 1 (Planning) Complete - Ready for Phase 2 (Test Creation)
