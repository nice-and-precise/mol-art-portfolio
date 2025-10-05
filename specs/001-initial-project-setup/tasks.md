# Task List: Initial Project Setup

**Spec**: `specs/001-initial-project-setup/spec.md`
**Plan**: `specs/001-initial-project-setup/plan.md`
**Created**: 2025-10-04
**Last Updated**: 2025-10-04

---

## Task Legend

- `[P]` = Parallelizable (can run simultaneously with other [P] tasks)
- `[ ]` = Not started
- `[~]` = In progress
- `[✓]` = Completed
- `[x]` = Blocked (see notes)

**Dependencies**: Tasks without `[P]` marker depend on previous tasks completing first.

---

## Phase 0: Test Creation (TEST-FIRST)

**Goal**: Write all tests BEFORE implementation
**Est. Duration**: 1 hour

### Unit Tests

- `[ ]` Write test for content schema validation
  - **Acceptance**: Tests verify Zod schema validates frontmatter correctly
  - **Files**: `tests/unit/content-schema.test.ts`
  - **Coverage**:
    - Valid frontmatter passes validation
    - Missing required fields throw errors
    - Date coercion works (string → Date)
    - Array fields validate (min 1 item)
    - Optional fields have correct defaults

- `[ ]` Write test for Tailwind clay palette
  - **Acceptance**: Tests verify custom colors are available
  - **Files**: `tests/unit/tailwind-config.test.ts`
  - **Coverage**:
    - Clay color scale (50-900) defined
    - Glaze colors defined
    - Colors accessible in CSS

### Integration Tests

- `[ ]` Write test for Astro build process
  - **Acceptance**: Tests verify build produces static HTML
  - **Files**: `tests/integration/build.test.ts`
  - **Coverage**:
    - Build completes without errors
    - HTML files generated in dist/
    - Index page exists
    - No broken links

- `[ ]` Write test for content collection parsing
  - **Acceptance**: Tests verify markdown → data transformation
  - **Files**: `tests/integration/content-collections.test.ts`
  - **Coverage**:
    - Markdown files are parsed
    - Frontmatter extracted correctly
    - Content body accessible
    - Query functions work

---

## Phase 1: Test Approval & Red Phase

**Goal**: Get human approval and confirm tests fail
**Est. Duration**: 15 minutes

- `[ ]` Request test approval from human
  - **Acceptance**: Human states "These tests correctly verify the requirements"
  - **Deliverable**: Approval documented in this file
  - **Depends on**: All test files written

- `[ ]` Confirm red phase (all tests fail)
  - **Acceptance**: Run `npm test` and verify all new tests fail
  - **Expected Output**: Tests fail with "module not found" or similar
  - **Command**: `npm test`
  - **Depends on**: Test approval received

---

## Phase 2: Foundation Setup

**Goal**: Initialize Astro project with dependencies
**Est. Duration**: 30 minutes

- `[ ]` Initialize Astro project
  - **Acceptance**: Astro project created with recommended settings
  - **Command**: `npm create astro@latest . -- --template minimal --typescript strict --git false`
  - **Files Created**: `astro.config.mjs`, `package.json`, `tsconfig.json`, `src/`
  - **Verification**: `npm run dev` starts without errors
  - **Depends on**: Red phase confirmed

- `[ ]` Install core dependencies
  - **Acceptance**: All dependencies installed successfully
  - **Command**:
    ```bash
    npm install astro@^4.15.0 react@^18.3.1 react-dom@^18.3.1
    npm install @astrojs/react@^3.6.2 @astrojs/tailwind@^5.1.1
    npm install tailwindcss@^3.4.0 @tailwindcss/typography@^0.5.10
    ```
  - **Verification**: `npm list --depth=0` shows all packages
  - **Depends on**: Astro project initialized

- `[ ]` Install testing dependencies
  - **Acceptance**: Vitest and testing tools installed
  - **Command**:
    ```bash
    npm install --save-dev vitest@^2.1.0 @vitest/ui@^2.1.0
    npm install --save-dev jsdom@^25.0.0 @astro/check@^0.9.0
    npm install --save-dev @types/react@^18.3.0 @types/react-dom@^18.3.0
    ```
  - **Verification**: Vitest commands available
  - **Depends on**: Core dependencies installed

- `[ ]` Install deployment dependency
  - **Acceptance**: gh-pages package installed
  - **Command**: `npm install --save-dev gh-pages@^6.1.1`
  - **Verification**: Package in devDependencies
  - **Depends on**: Core dependencies installed

---

## Phase 3: Configuration

**Goal**: Configure all tools and integrations
**Est. Duration**: 45 minutes

- `[ ]` Configure Astro integrations
  - **Acceptance**: React and Tailwind integrations enabled
  - **Files**: `astro.config.mjs`
  - **Configuration**:
    ```javascript
    import { defineConfig } from 'astro/config';
    import react from '@astrojs/react';
    import tailwind from '@astrojs/tailwind';

    export default defineConfig({
      integrations: [react(), tailwind()],
      site: 'https://username.github.io',
      base: '/mol-art-portfolio',
    });
    ```
  - **Verification**: Dev server runs with integrations
  - **Depends on**: Dependencies installed

- `[ ]` Configure Tailwind with clay palette
  - **Acceptance**: Custom colors defined and accessible
  - **Files**: `tailwind.config.cjs`
  - **Configuration**: Clay palette from data-model.md
  - **Tests**: `tests/unit/tailwind-config.test.ts` should pass
  - **Depends on**: Astro integrations configured

- `[ ]` Configure Vitest with Astro
  - **Acceptance**: Vitest uses Astro's Vite config
  - **Files**: `vitest.config.ts`
  - **Configuration**:
    ```typescript
    import { getViteConfig } from 'astro/config';

    export default getViteConfig({
      test: {
        environment: 'jsdom',
        globals: true,
      },
    });
    ```
  - **Verification**: `npm test` runs (even if tests fail)
  - **Depends on**: Testing dependencies installed

- `[ ]` Set up TypeScript configuration
  - **Acceptance**: Strict TypeScript with Astro types
  - **Files**: `tsconfig.json` (Astro generates this)
  - **Verification**: No TypeScript errors
  - **Depends on**: Astro project initialized

---

## Phase 4: Content Collections

**Goal**: Set up type-safe markdown content system
**Est. Duration**: 30 minutes

- `[ ]` Create content collection schema
  - **Acceptance**: Zod schema matches data-model.md specification
  - **Files**: `src/content/config.ts`
  - **Schema**: See data-model.md for complete schema
  - **Tests**: `tests/unit/content-schema.test.ts` should pass
  - **Depends on**: Astro configured

- `[ ]` Create content directories
  - **Acceptance**: Directory structure ready for pottery pieces
  - **Directories**:
    ```
    src/content/
      pieces/
      images/
        piece-01/
    ```
  - **Verification**: Directories exist
  - **Depends on**: Content schema created

- `[ ]` Create example pottery piece
  - **Acceptance**: Valid pottery markdown file exists
  - **Files**: `src/content/pieces/piece-01-earth-vessel.md`
  - **Content**: Follow template from data-model.md
  - **Images**: Add `src/content/images/piece-01/main.jpg` (placeholder)
  - **Verification**: Build doesn't fail on content validation
  - **Tests**: `tests/integration/content-collections.test.ts` should pass
  - **Depends on**: Content directories created

---

## Phase 5: Pages & Styling

**Goal**: Create homepage and apply earthy aesthetic
**Est. Duration**: 45 minutes

- `[ ]` Create base layout
  - **Acceptance**: Reusable layout component with semantic HTML
  - **Files**: `src/layouts/BaseLayout.astro`
  - **Features**:
    - HTML5 semantic elements
    - Meta tags for SEO
    - System font stack
    - Clay color palette applied
  - **Verification**: No console errors
  - **Depends on**: Tailwind configured

- `[ ]` Create homepage
  - **Acceptance**: Index page lists pottery pieces
  - **Files**: `src/pages/index.astro`
  - **Features**:
    - Hero section with site title
    - Grid of pottery pieces (using example piece)
    - Responsive layout (1 col mobile, 3 col desktop)
  - **Verification**: Renders in dev server
  - **Depends on**: Base layout created

- `[ ]` Apply clay color palette styles
  - **Acceptance**: Site uses earthy aesthetic
  - **Files**: All .astro pages
  - **Colors**: Use clay-* and glaze-* utilities
  - **Typography**: Serif headers, sans body
  - **Verification**: Visual check in browser
  - **Depends on**: Homepage created

---

## Phase 6: Testing & Quality

**Goal**: Ensure all tests pass and code quality high
**Est. Duration**: 30 minutes

- `[ ]` Run full test suite
  - **Acceptance**: All tests pass (green phase achieved)
  - **Command**: `npm test`
  - **Expected**: 100% of tests passing
  - **Depends on**: All implementation complete

- `[ ]` Generate coverage report
  - **Acceptance**: Coverage ≥90% for new code
  - **Command**: `npm run test:coverage`
  - **Expected**: High coverage for utilities
  - **Depends on**: All tests passing

- `[ ]` Run TypeScript type check
  - **Acceptance**: No TypeScript errors
  - **Command**: `npm run type-check`
  - **Expected**: No errors reported
  - **Depends on**: All code written

- `[ ]` Build for production
  - **Acceptance**: Production build succeeds
  - **Command**: `npm run build`
  - **Expected**: dist/ folder created with HTML files
  - **Verification**: Check dist/ contents
  - **Depends on**: Type check passing

- `[ ]` Preview production build
  - **Acceptance**: Site works in production mode
  - **Command**: `npm run preview`
  - **Verification**: Visual check at http://localhost:4322
  - **Depends on**: Production build complete

---

## Phase 7: npm Scripts

**Goal**: Add all CLI commands from contracts/cli.md
**Est. Duration**: 15 minutes

- `[ ]` Add npm scripts to package.json
  - **Acceptance**: All commands from cli.md available
  - **Files**: `package.json`
  - **Scripts**:
    ```json
    {
      "scripts": {
        "dev": "astro dev",
        "build": "astro build",
        "preview": "astro preview",
        "test": "vitest run",
        "test:watch": "vitest",
        "test:coverage": "vitest run --coverage",
        "type-check": "astro check",
        "deploy": "npm run build && gh-pages -d dist"
      }
    }
    ```
  - **Verification**: Each script runs without error
  - **Depends on**: All implementation complete

---

## Phase 8: Documentation

**Goal**: Create user-facing documentation
**Est. Duration**: 30 minutes

- `[ ]` Update README.md
  - **Acceptance**: README has setup instructions
  - **Files**: `README.md` (update existing)
  - **Sections**:
    - Project overview
    - Prerequisites
    - Installation steps
    - Available commands
    - For artist: "Adding new pottery pieces"
  - **Verification**: Another developer can follow to set up
  - **Depends on**: All features implemented

- `[ ]` Create setup guide
  - **Acceptance**: Detailed setup documentation
  - **Files**: `docs/setup-guide.md`
  - **Content**:
    - Node.js installation
    - Git setup
    - API key configuration
    - First build
    - Troubleshooting common issues
  - **Verification**: Clear and comprehensive
  - **Depends on**: All features implemented

- `[ ]` Create environment template
  - **Acceptance**: .env.example with all variables
  - **Files**: `.env.example`
  - **Content**:
    ```
    ANTHROPIC_API_KEY=your_key_here
    ```
  - **Verification**: Example values clear
  - **Depends on**: All features implemented

---

## Phase 9: Deployment

**Goal**: Deploy to GitHub Pages and verify live site
**Est. Duration**: 30 minutes

- `[ ]` Configure GitHub repository
  - **Acceptance**: Repository settings ready for Pages
  - **Steps**:
    1. Create GitHub repository (if not exists)
    2. Add remote: `git remote add origin <repo-url>`
    3. Push code: `git push -u origin 001-initial-project-setup`
  - **Verification**: Code on GitHub
  - **Depends on**: All documentation complete

- `[ ]` Configure GitHub Pages settings
  - **Acceptance**: Pages enabled and configured
  - **Steps**:
    1. Go to repo Settings → Pages
    2. Source: Deploy from branch
    3. Branch: gh-pages (will be created on first deploy)
  - **Verification**: Settings saved
  - **Depends on**: Repository configured

- `[ ]` First deployment
  - **Acceptance**: Site deployed and accessible
  - **Command**: `npm run deploy`
  - **Expected**: Deployment succeeds, URL provided
  - **Verification**: Visit https://username.github.io/mol-art-portfolio/
  - **Depends on**: GitHub Pages configured

- `[ ]` Verify live site
  - **Acceptance**: All features work on live site
  - **Checks**:
    - Homepage loads
    - Styles applied correctly
    - Images display
    - No console errors
    - Responsive on mobile
  - **Verification**: Manual testing on live URL
  - **Depends on**: First deployment complete

---

## Phase 10: Performance Audit

**Goal**: Verify performance budgets met
**Est. Duration**: 15 minutes

- `[ ]` Run Lighthouse audit
  - **Acceptance**: All scores ≥90
  - **Command**: `npm run perf-check` (or manual in Chrome DevTools)
  - **Expected Scores**:
    - Performance: ≥90
    - Accessibility: ≥90
    - Best Practices: ≥90
    - SEO: ≥90
  - **Verification**: Lighthouse report
  - **Depends on**: Live site verified

- `[ ]` Document baseline metrics
  - **Acceptance**: Performance metrics recorded
  - **Files**: Create `specs/001-initial-project-setup/performance-baseline.md`
  - **Metrics**:
    - Lighthouse scores
    - LCP, FCP, TBT, CLS values
    - Bundle sizes
    - Build times
  - **Purpose**: Future comparison for regressions
  - **Depends on**: Lighthouse audit complete

---

## Constitutional Gates Verification

**Goal**: Final verification all articles satisfied
**Est. Duration**: 15 minutes

- `[ ]` Verify Article I (Simplicity)
  - **Check**: Only 3 core components used?
  - **Evidence**: Astro, React, Tailwind (exactly 3)
  - **Status**: PASS / FAIL

- `[ ]` Verify Article II (Content as Data)
  - **Check**: Markdown content with schema?
  - **Evidence**: Content collections configured
  - **Status**: PASS / FAIL

- `[ ]` Verify Article III (Test-First)
  - **Check**: All code has tests?
  - **Evidence**: Test coverage report
  - **Status**: PASS / FAIL

- `[ ]` Verify Article IV (Performance)
  - **Check**: Lighthouse ≥90?
  - **Evidence**: Lighthouse report
  - **Status**: PASS / FAIL

- `[ ]` Verify Article VI (Maintainability)
  - **Check**: Artist can understand?
  - **Evidence**: Documentation clarity
  - **Status**: PASS / FAIL

- `[ ]` Verify Article VII (Aesthetic)
  - **Check**: Clay palette applied?
  - **Evidence**: Visual inspection
  - **Status**: PASS / FAIL

- `[ ]` Verify Article VIII (Observable)
  - **Check**: All CLI commands work?
  - **Evidence**: Test each npm script
  - **Status**: PASS / FAIL

---

## Blocked Tasks

*No blocked tasks currently*

---

## Task Summary

**Total Tasks**: 44
**Completed**: 0
**In Progress**: 0
**Blocked**: 0
**Remaining**: 44

**Progress**: 0% complete

---

## Notes & Lessons Learned

### 2025-10-04
- Tasks generated from approved plan
- Ready to begin Phase 0: Test creation
- All constitutional gates pre-checked in planning

---

## Approval

**Test Approval Checkpoint**:
- [ ] Tests written (Phase 0)
- [ ] Human approval: "These tests correctly verify the requirements"
- [ ] Red phase confirmed

**Final Approval**:
- [ ] All tasks complete
- [ ] All tests passing
- [ ] Live site verified
- [ ] Performance budgets met
- [ ] Ready for merge to main
