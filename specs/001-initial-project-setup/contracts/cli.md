# CLI Contracts: npm Scripts

**Feature**: Initial Project Setup
**Created**: 2025-10-04

---

## Overview

All project operations are scriptable via npm commands, aligning with Article VIII (Observable & Testable). Every feature must be testable without opening a browser.

---

## Development Commands

### `npm run dev`

**Purpose**: Start development server with hot reload
**When to use**: During active development
**Behavior**:
- Starts Astro dev server on `http://localhost:4321`
- Watches for file changes
- Hot reloads browser on changes
- Shows build errors in terminal

**Output Example**:
```
🚀 astro v4.15.0 started in 1.2s

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose

watching for file changes...
```

**Success Criteria**:
- Server starts in <5 seconds
- No error messages in console
- Can access http://localhost:4321 in browser
- Changes to files trigger hot reload within 1 second

**Troubleshooting**:
- **Port already in use**: Another process using port 4321
  - Fix: `npx kill-port 4321` or change port in `astro.config.mjs`
- **Module not found**: Dependencies not installed
  - Fix: Run `npm install`

---

### `npm run build`

**Purpose**: Build static site for production
**When to use**: Before deployment, to test production build
**Behavior**:
- Compiles all pages to static HTML
- Optimizes images with Sharp
- Purges unused Tailwind CSS
- Generates sitemap (if configured)
- Outputs to `dist/` directory

**Output Example**:
```
▶ Building static site...

✓ Built 5 pages in 2.3s
✓ Optimized 12 images
✓ Generated sitemap

Output directory: dist/
Build size: 1.2 MB
```

**Success Criteria**:
- Build completes in <30 seconds
- No errors or warnings
- `dist/` directory contains HTML files
- All images optimized to WebP

**Troubleshooting**:
- **Build fails with "Invalid frontmatter"**: Pottery markdown has schema errors
  - Fix: Run `npm run validate-content` to see specific errors
- **Out of memory**: Large images or many pages
  - Fix: Increase Node memory: `NODE_OPTIONS=--max-old-space-size=4096 npm run build`

---

### `npm run preview`

**Purpose**: Preview production build locally
**When to use**: After build, before deployment
**Behavior**:
- Serves `dist/` directory on `http://localhost:4322`
- Uses production build (not dev server)
- Tests production optimizations
- No hot reload (static files)

**Output Example**:
```
 astro preview

  ┃ Local    http://localhost:4322/
  ┃ Network  use --host to expose

Serving static build from dist/
```

**Success Criteria**:
- Preview server starts immediately (<1 second)
- Site loads without errors
- All images, CSS, and JavaScript load correctly
- Looks identical to production deployment

**Troubleshooting**:
- **404 errors**: Build output missing files
  - Fix: Run `npm run build` again
- **Styles not loading**: Tailwind purge removed used classes
  - Fix: Check `tailwind.config.cjs` safelist

---

## Testing Commands

### `npm test`

**Purpose**: Run all tests with Vitest
**When to use**: Before committing, in CI/CD pipeline
**Behavior**:
- Runs all test files matching `*.test.ts` or `*.test.tsx`
- Shows pass/fail for each test
- Generates coverage report
- Fails if any test fails

**Output Example**:
```
✓ tests/unit/content-parser.test.ts (3)
  ✓ parses valid frontmatter
  ✓ throws on missing required fields
  ✓ coerces date strings to Date objects

Test Files  1 passed (1)
     Tests  3 passed (3)
  Start at  10:30:15
  Duration  245ms

✓ All tests passed
```

**Success Criteria**:
- All tests pass
- Test execution completes in <5 seconds (for initial setup)
- Coverage report shows 100% for new code

**Troubleshooting**:
- **Tests fail**: Implementation doesn't match spec
  - Fix: Check test expectations vs. implementation
- **Tests timeout**: Async operations not awaited
  - Fix: Add `await` to async calls, increase timeout if needed

---

### `npm run test:watch`

**Purpose**: Run tests in watch mode during development
**When to use**: During test-first development
**Behavior**:
- Runs tests continuously
- Re-runs tests when files change
- Shows only changed test results
- Interactive mode (press keys for options)

**Output Example**:
```
✓ tests/unit/content-parser.test.ts (3) 245ms

Waiting for file changes...
press h for help, q to quit
```

**Interactive Commands**:
- `a` - Run all tests
- `f` - Run only failed tests
- `q` - Quit watch mode
- `h` - Show help

**Success Criteria**:
- Tests re-run automatically on file save
- Re-run completes in <1 second for small changes

---

### `npm run test:coverage`

**Purpose**: Generate detailed test coverage report
**When to use**: Before merging PR, checking code coverage
**Behavior**:
- Runs all tests
- Generates coverage report in `coverage/` directory
- Shows coverage percentages in terminal
- Opens HTML report in browser (if configured)

**Output Example**:
```
 % Coverage report from v8

File                     | % Stmts | % Branch | % Funcs | % Lines
-------------------------|---------|----------|---------|--------
All files                |     100 |      100 |     100 |     100
 content-parser.ts       |     100 |      100 |     100 |     100
```

**Success Criteria**:
- Coverage ≥90% for all categories (statements, branches, functions, lines)
- Coverage report generated in `coverage/index.html`

**Troubleshooting**:
- **Low coverage**: Missing tests for some code paths
  - Fix: Write tests for uncovered lines (shown in report)

---

## Content Validation Commands

### `npm run validate-content`

**Purpose**: Validate pottery markdown files against schema
**When to use**: Before building, after adding/editing content
**Behavior**:
- Reads all files in `src/content/pieces/`
- Validates frontmatter against Zod schema
- Checks image files exist
- Reports errors with file names and line numbers

**Output Example** (Success):
```
🎨 Validating pottery content...

  ✓ piece-01-earth-vessel.md - Valid
  ✓ piece-02-spiral-form.md - Valid
  ✓ piece-03-textured-bowl.md - Valid

✅ All 3 pottery pieces are valid!
```

**Output Example** (Errors):
```
🎨 Validating pottery content...

  ✓ piece-01-earth-vessel.md - Valid
  ✗ piece-02-spiral-form.md - Missing required field: mainImage
  ✗ piece-03-textured-bowl.md - Invalid date format: "03/15/2025"

❌ 2 errors found. Fix and run again.

Errors:
- piece-02-spiral-form.md: mainImage is required
- piece-03-textured-bowl.md: Expected ISO 8601 date (YYYY-MM-DD)
```

**Success Criteria**:
- All pottery files validate successfully
- Helpful error messages point to specific issues
- Command exits with code 0 on success, 1 on errors

**Troubleshooting**:
- **Missing required field**: Add field to frontmatter
- **Invalid date format**: Use YYYY-MM-DD format
- **Image not found**: Check path relative to markdown file

---

### `npm run generate-descriptions` (Future Feature)

**Purpose**: Generate AI descriptions for pottery pieces
**When to use**: Before building, to update AI descriptions
**Behavior**:
- Reads pottery markdown files
- Calls Claude API for pieces missing aiDescription
- Updates markdown files with AI-generated descriptions
- Uses manual description as fallback if API fails

**Output Example**:
```
🤖 Generating AI descriptions...

  ✓ piece-01-earth-vessel.md - AI description generated
  ~ piece-02-spiral-form.md - Using manual description (API rate limit)
  ✓ piece-03-textured-bowl.md - AI description generated

✅ Generated 2 AI descriptions, 1 manual fallback
```

**Options**:
- `--dry-run` - Preview what would be generated without writing files
- `--force` - Regenerate all descriptions (even existing ones)

**Success Criteria**:
- AI descriptions generated for pieces without one
- Falls back to manual description gracefully
- Does not overwrite manual edits

**Note**: This command is implemented in a future feature (002-ai-descriptions)

---

## Build & Deployment Commands

### `npm run deploy`

**Purpose**: Build and deploy to GitHub Pages
**When to use**: After testing, ready to publish changes
**Behavior**:
1. Runs `npm run build` (build static site)
2. Runs `npm test` (verify tests pass)
3. Deploys `dist/` to GitHub Pages (`gh-pages` branch)
4. Shows deployment URL

**Output Example**:
```
▶ Building for production...
✓ Build complete

▶ Running tests...
✓ All tests passed

▶ Deploying to GitHub Pages...
Published to: https://username.github.io/mol-art-portfolio/

✅ Deployment complete!
```

**Success Criteria**:
- Build completes successfully
- All tests pass
- Deployment succeeds
- Site accessible at GitHub Pages URL within 2 minutes

**Troubleshooting**:
- **Build fails**: Fix build errors before deploying
- **Tests fail**: Fix failing tests before deploying
- **Deployment fails**: Check GitHub Pages settings
  - Ensure Pages is enabled for repository
  - Ensure branch is set to `gh-pages`
- **404 on GitHub Pages**: Check `base` in `astro.config.mjs`

---

## Linting & Formatting Commands

### `npm run lint`

**Purpose**: Check code quality with ESLint
**When to use**: Before committing, in pre-commit hook
**Behavior**:
- Checks all TypeScript/JavaScript files
- Reports style violations
- Does not fix automatically

**Output Example**:
```
✓ No ESLint errors found
```

**Success Criteria**:
- No errors reported
- Warnings acceptable (but should be fixed eventually)

---

### `npm run format`

**Purpose**: Auto-format code with Prettier
**When to use**: Before committing
**Behavior**:
- Formats all files (TypeScript, Astro, Markdown, CSS)
- Writes changes to files
- Uses `.prettierrc` configuration

**Output Example**:
```
✓ Formatted 12 files
```

**Success Criteria**:
- All files formatted consistently
- No formatting errors

---

## Performance Commands

### `npm run perf-check`

**Purpose**: Run Lighthouse performance audit
**When to use**: After significant changes, before deploying
**Behavior**:
1. Starts preview server (`npm run preview`)
2. Runs Lighthouse on `http://localhost:4322`
3. Generates performance report
4. Opens report in browser

**Output Example**:
```
Running Lighthouse audit...

Performance:  98 ✓
Accessibility: 100 ✓
Best Practices: 100 ✓
SEO: 100 ✓

✅ All performance budgets met!

Report: lighthouse-report.html
```

**Success Criteria**:
- Performance score ≥90
- LCP <2.5s
- FCP <1.8s
- All metrics within budgets

**Troubleshooting**:
- **Low performance score**: Check image sizes, JavaScript bundles
- **High LCP**: Optimize above-fold images
- **High CLS**: Add width/height to images

---

## Utility Commands

### `npm run clean`

**Purpose**: Delete build output and cache
**When to use**: Troubleshooting build issues
**Behavior**:
- Deletes `dist/` directory
- Deletes `.astro/` cache
- Deletes `node_modules/.vite/` cache

**Output Example**:
```
🧹 Cleaning build output...

✓ Deleted dist/
✓ Deleted .astro/
✓ Deleted node_modules/.vite/

✅ Clean complete!
```

**Success Criteria**:
- All build artifacts removed
- Next build starts fresh

---

### `npm run type-check`

**Purpose**: Check TypeScript types without building
**When to use**: During development, in CI/CD
**Behavior**:
- Runs TypeScript compiler in check mode
- Reports type errors
- Does not emit JavaScript files

**Output Example**:
```
✓ No TypeScript errors found
```

**Success Criteria**:
- No type errors reported

---

## Complete npm Scripts Reference

Add to `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "validate-content": "node scripts/validate-content.js",
    "generate-descriptions": "node scripts/generate-descriptions.js",
    "deploy": "npm run build && npm test && gh-pages -d dist",
    "lint": "eslint . --ext .ts,.tsx,.astro",
    "format": "prettier --write .",
    "perf-check": "npm run build && lighthouse http://localhost:4321 --view",
    "clean": "rm -rf dist .astro node_modules/.vite",
    "type-check": "astro check"
  }
}
```

---

## Command Cheat Sheet

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Preview production | `npm run preview` |
| Run tests | `npm test` |
| Watch tests | `npm run test:watch` |
| Check coverage | `npm run test:coverage` |
| Validate content | `npm run validate-content` |
| Deploy to GitHub Pages | `npm run deploy` |
| Check types | `npm run type-check` |
| Format code | `npm run format` |
| Clean build | `npm run clean` |

---

## CI/CD Integration (Future)

These commands will be used in GitHub Actions workflows:

```yaml
# .github/workflows/deploy.yml
steps:
  - run: npm install
  - run: npm run type-check
  - run: npm run lint
  - run: npm test
  - run: npm run build
  - run: npm run perf-check
  - run: npm run deploy
```

Every step must pass for deployment to succeed, ensuring high quality and performance.
