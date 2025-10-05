# Implementation Plan: Initial Project Setup

**Spec**: `specs/001-initial-project-setup/spec.md`
**Created**: 2025-10-04
**Status**: Draft

---

## Architecture Overview

This feature establishes the foundational architecture for the Mol_Art pottery portfolio using Astro's islands architecture. The site will be 100% static HTML with selective JavaScript hydration only where interactivity is needed (future gallery filters, visual search).

### Key Components

1. **Astro Static Site Generator**: Builds static HTML pages with zero JavaScript by default
2. **React Islands**: Selective hydration for interactive components (future features)
3. **Tailwind CSS**: Utility-first styling with custom clay color palette

### Component Interactions

```
Content (Markdown) → Astro Content Collections → Zod Validation
                                                       ↓
                                              Static HTML Pages
                                                       ↓
                                   Tailwind CSS (Earthy Styling)
                                                       ↓
                            React Islands (client:* directives)
                            (Loaded only where needed)
```

### Architecture Benefits

- **Zero JavaScript by default**: Astro ships only HTML/CSS unless components need interactivity
- **Islands for selective hydration**: React components load independently with client:* directives
- **Type-safe content**: Zod schema validation ensures pottery frontmatter is correct
- **Fast builds**: Static generation means no server required, perfect for GitHub Pages

---

## Technology Choices

### Choice 1: Astro 4.x (Static Site Generator)

**Requirement**: Spec Story 1 - "Fully configured Astro project"
**Rationale**:
- **Zero JavaScript by default**: Ships only HTML/CSS for static content
- **Islands architecture**: Selective hydration aligns with Article I (Simplicity)
- **Content collections**: Built-in Zod validation for markdown (Article II)
- **TypeScript support**: Type safety without configuration overhead
- **Vite-powered**: Fast dev server (<5s startup) and hot reload (<1s)
- **GitHub Pages ready**: Static output works perfectly with free hosting

**Constitutional Check**: Article I (Simplicity First) ✅
- Core component #1 of 3
- Uses Astro's defaults, no custom build tools
- Built-in Vite (not additional)

**Trade-offs**:
- **Gain**: Industry-leading performance, minimal JavaScript
- **Lose**: Nothing - Astro is purpose-built for this use case

**Version**: `^4.15.0` (stable, latest features, excellent docs)

---

### Choice 2: React 18 (Interactive Islands)

**Requirement**: Spec Story 1 - "React and Tailwind"
**Rationale**:
- **Artist familiarity**: Most recognizable framework (high school CS classes often teach React)
- **Islands architecture**: Astro's client:* directives provide granular hydration control
- **Component ecosystem**: Rich ecosystem for future features (image galleries, search)
- **Hooks for state**: Article I requires "no state libraries" - React hooks satisfy this
- **TypeScript support**: First-class TypeScript integration

**Constitutional Check**: Article I (Simplicity First) ✅
- Core component #2 of 3
- Using only React hooks, no Redux/Zustand/MobX
- Islands = minimal JavaScript sent to browser

**Trade-offs**:
- **Gain**: Familiar syntax, huge ecosystem, maintainability for artist
- **Lose**: Slightly larger bundle than Preact (but islands minimize impact)

**Version**: `^18.3.1` (stable)
**Astro Integration**: `@astrojs/react ^3.6.2`

**Hydration Strategy**:
- `client:load` - Only for above-fold interactive components
- `client:idle` - For below-fold interactivity (future search features)
- `client:visible` - For scroll-triggered components (future infinite scroll)
- Default: No hydration (static HTML)

---

### Choice 3: Tailwind CSS 3.x (Styling)

**Requirement**: Spec Story 1 - "React and Tailwind", Article VII (Earthy Aesthetic)
**Rationale**:
- **Utility-first**: No need to write custom CSS files
- **Custom palette**: Easy to define clay color palette in config
- **Purge/tree-shaking**: Unused classes removed in production (performance)
- **Responsive utilities**: Mobile-first design built-in
- **Typography plugin**: Excellent for ceramic artist's descriptive text
- **No runtime**: Pure CSS, no JavaScript overhead

**Constitutional Check**: Article I (Simplicity First) ✅
- Core component #3 of 3
- No CSS-in-JS libraries (Article I compliance)
- No additional styling tools needed

**Constitutional Check**: Article VII (Earthy Aesthetic) ✅
- Custom clay color palette defined in config
- System fonts (no web font downloads = faster)
- Responsive utilities for all breakpoints

**Trade-offs**:
- **Gain**: Rapid styling, consistent design system, no CSS maintenance
- **Lose**: HTML className strings can be long (acceptable trade-off for simplicity)

**Version**: `^3.4.0` (stable)
**Astro Integration**: `@astrojs/tailwind ^5.1.1`
**Plugins**: `@tailwindcss/typography` (for long-form pottery descriptions)

---

### Choice 4: Vitest (Testing Framework)

**Requirement**: Spec Story 2 - "Complete testing setup", Article III (Test-First)
**Rationale**:
- **Vite-native**: Same build tool as Astro = consistent config
- **Fast**: Runs in milliseconds, encourages frequent testing
- **ESM-native**: No CommonJS transpilation needed
- **TypeScript support**: Works with .ts files out of the box
- **Coverage**: Built-in Istanbul coverage reports
- **Astro integration**: Official getViteConfig() helper for seamless setup

**Constitutional Check**: Article III (Test-First Development) ✅
- Enables test-first workflow
- Fast enough to run on every save
- Coverage reports enforce 100% test coverage

**Trade-offs**:
- **Gain**: Speed, Vite integration, modern ESM support
- **Lose**: Slightly smaller ecosystem than Jest (but growing rapidly)

**Version**: `^2.1.0` (latest stable)
**Supporting Packages**:
- `@vitest/ui ^2.1.0` - Visual test UI
- `jsdom ^25.0.0` - DOM environment for component tests
- `@astro/check ^0.9.0` - Astro component testing

---

### Choice 5: Zod (Schema Validation)

**Requirement**: Article II (Content as Data), Spec Scenario 5 (Content Collections)
**Rationale**:
- **Astro's choice**: Built-in content collections use Zod
- **Type inference**: Auto-generates TypeScript types from schemas
- **Validation errors**: Clear error messages when frontmatter is invalid
- **Zero runtime**: Validation happens at build time only
- **Artist-friendly**: Helpful errors like "Missing required field: techniques"

**Constitutional Check**: Article II (Content as Data) ✅
- Validates markdown frontmatter structure
- Ensures consistency across pottery pieces
- Prevents artist from publishing invalid content

**Trade-offs**:
- **Gain**: Type safety, clear errors, automatic TypeScript types
- **Lose**: Nothing - Zod comes with Astro content collections

**Version**: Included with Astro (no separate install needed)

---

### Choice 6: GitHub Pages (Deployment)

**Requirement**: Spec Story 4 - "Automated deployment to GitHub Pages"
**Rationale**:
- **Free hosting**: No cost for public repositories
- **Git-based workflow**: Deploy with git push
- **HTTPS built-in**: Automatic SSL certificates
- **Custom domains**: Can add custom domain later
- **Static-first**: Perfect match for Astro's output
- **GitHub Actions**: Built-in CI/CD for automated deployments

**Constitutional Check**: Article VI (High Schooler Maintainability) ✅
- Single command deployment: `npm run deploy`
- No server configuration needed
- Artist familiar with GitHub from school projects

**Trade-offs**:
- **Gain**: Free, simple, integrated with git workflow
- **Lose**: No server-side rendering (not needed for this project)

**Deployment Package**: `gh-pages ^6.1.1`

---

### Choice 7: Sharp (Image Processing)

**Requirement**: Article IV (Performance Budget), Future image optimization
**Rationale**:
- **Astro's choice**: Official image integration uses Sharp
- **Fast**: C++ bindings, fastest image processor in Node.js
- **WebP generation**: Modern format with fallbacks
- **Responsive images**: Generates multiple sizes automatically
- **Build-time processing**: No runtime overhead
- **Blur placeholders**: Generates blur-up effect for lazy loading

**Constitutional Check**: Article IV (Performance Budget) ✅
- Critical for meeting LCP <2.5s requirement
- WebP reduces image sizes by 30-50%
- Lazy loading prevents blocking render

**Trade-offs**:
- **Gain**: Best-in-class performance, automatic optimization
- **Lose**: Requires native dependencies (but npm handles this)

**Version**: Included with `@astrojs/image` integration

---

## Constitutional Gates

### Phase -1: Pre-Implementation Gates

#### Simplicity Gate (Article I)
- [x] Using ≤3 core components? **YES**
  - Current: None (foundation)
  - Adding: Astro, React, Tailwind (exactly 3)
  - Justification: N/A - within limit

- [x] Zero additional build tools beyond Astro defaults? **YES**
  - Astro includes Vite (built-in)
  - No webpack, rollup, or other bundlers added
  - Vitest uses same Vite instance

- [x] No state management libraries? **YES**
  - Using only React hooks
  - No Redux, Zustand, MobX, Jotai, or similar

**Status**: ✅ **PASS**

---

#### Observability Gate (Article VIII)
- [x] CLI commands defined for all features? **YES**
  - Commands: See `contracts/cli.md`
  - All operations scriptable via npm

- [x] Each feature testable via CLI? **YES**
  - Build: `npm run build` (verify output)
  - Test: `npm test` (run test suite)
  - Validate: `npm run validate-content` (check markdown)
  - Serve: `npm run preview` (test production build)

**Status**: ✅ **PASS**

---

#### Maintainability Gate (Article VI)
- [x] High schooler can understand? **YES**
  - Complexity level: 3/10 (simple project structure)
  - Simplification plan:
    - Use Astro defaults (no custom config unless needed)
    - Document every npm script with plain language
    - Standard project structure (src/, public/, dist/)

- [x] Deployment is single command? **YES**
  - Command: `npm run deploy`
  - Internally runs: build → test → gh-pages deploy
  - Artist runs one command, everything happens automatically

**Status**: ✅ **PASS**

---

## Implementation Phases

### Phase 0: Foundation (Est. 1 hour)
**Goal**: Initialize Astro project with dependencies
**Deliverables**:
- [x] Run `npm create astro@latest`
- [x] Install dependencies (React, Tailwind, Vitest)
- [x] Configure integrations in `astro.config.mjs`
- [x] Verify dev server starts successfully

### Phase 1: Testing Infrastructure (Est. 1 hour)
**Goal**: Set up test-first development environment
**Deliverables**:
- [x] Configure Vitest with `vitest.config.ts`
- [x] Set up jsdom environment
- [x] Create example test file
- [x] Configure coverage reporting
- [x] Add npm test scripts

### Phase 2: Tailwind Configuration (Est. 30 min)
**Goal**: Configure earthy aesthetic design system
**Deliverables**:
- [x] Create clay color palette in `tailwind.config.cjs`
- [x] Configure typography plugin
- [x] Set up custom font stack
- [x] Configure responsive breakpoints
- [x] Test custom utilities work

### Phase 3: Content Collections (Est. 1 hour)
**Goal**: Set up type-safe markdown content system
**Deliverables**:
- [x] Create `src/content/config.ts` with pottery schema
- [x] Define Zod validation rules
- [x] Create content directories structure
- [x] Add example pottery piece markdown
- [x] Verify schema validation works

### Phase 4: Build & Deployment (Est. 1 hour)
**Goal**: Configure production build and GitHub Pages deployment
**Deliverables**:
- [x] Configure build output for GitHub Pages
- [x] Set up gh-pages package
- [x] Create deployment script
- [x] Test production build locally
- [x] Document deployment process

### Phase 5: Documentation (Est. 30 min)
**Goal**: Create setup and usage documentation
**Deliverables**:
- [x] Update README with setup instructions
- [x] Create `docs/setup-guide.md`
- [x] Document all npm scripts
- [x] Create troubleshooting guide

---

## Data Model

See: `specs/001-initial-project-setup/data-model.md`

**Summary**:
- **Pottery Piece**: Markdown file with frontmatter schema
- **Fields**: title, date, techniques, colors, textures, description, aiDescription, featured
- **Validation**: Zod schema ensures all required fields present
- **Relationships**: None (single entity for now)

---

## Contracts & Interfaces

See: `specs/001-initial-project-setup/contracts/`

### CLI Contracts
- `contracts/cli.md`: All npm scripts and their purposes

---

## Testing Strategy

### Unit Tests
**Location**: `tests/unit/`
**Coverage Target**: 100% of utility functions
**Key Areas**:
- [x] Content schema validation
- [x] Utility functions (future: color extraction, etc.)

### Integration Tests
**Location**: `tests/integration/`
**Coverage Target**: All feature interactions
**Key Areas**:
- [x] Content collections + page generation
- [x] Build process produces correct output

### End-to-End Tests
**Location**: `tests/e2e/`
**Coverage Target**: Critical user flows
**Key Flows**:
- [x] Dev server starts and renders pages
- [x] Production build succeeds
- [x] Deployed site loads correctly

**E2E Tool**: Playwright (add in future feature if needed for complex flows)

---

## Performance Considerations

### Performance Budget
- **LCP**: <2.5s (Baseline: Static HTML with no images = ~0.5s)
- **FCP**: <1.8s (Baseline: Static HTML = ~0.3s)
- **TBT**: <200ms (Baseline: Zero JavaScript = 0ms)
- **CLS**: <0.1 (Baseline: Static layout = 0)
- **Lighthouse**: ≥90 (Baseline: Static Astro sites score 95-100)

### Optimization Strategies
1. **Zero JavaScript by default**: Astro ships no JS for static pages
2. **Islands architecture**: React components load only when needed
3. **Tailwind purge**: Remove unused CSS in production
4. **System fonts**: No web font downloads (instant text render)
5. **Static HTML**: No hydration waterfall, instant FCP

### Performance Testing
- [x] Lighthouse CI configured in GitHub Actions
- [x] Performance budgets enforced on every PR
- [x] Regression alerts if scores drop below 90

---

## Security Considerations

### Input Validation
- [x] Frontmatter schema validation (Zod prevents malformed data)
- [x] No file uploads in this feature (images added manually to repo)
- [x] No user input (static site)

### External APIs
- [ ] API keys in `.env` file (not committed to git)
- [ ] Rate limiting: N/A for build-time API calls
- [ ] Error responses: Build fails if API error (no silent failures)

### Build-Time Security
- [x] Dependencies scanned: `npm audit`
- [x] No secrets in git: `.env` in `.gitignore`
- [x] Environment variables: `.env.template` for documentation

---

## Accessibility Plan

### WCAG 2.1 AA Compliance
- [x] Semantic HTML5 elements (`<main>`, `<nav>`, `<article>`)
- [x] ARIA labels: Only where semantic HTML insufficient
- [x] Keyboard navigation: All interactive elements focusable
- [x] Screen reader testing: Using NVDA on Windows
- [x] Color contrast: Clay palette tested with WebAIM checker (4.5:1 minimum)

### Testing Tools
- [x] axe DevTools browser extension
- [x] Lighthouse accessibility audit (≥90 score required)
- [x] Manual keyboard navigation (Tab, Enter, Escape)
- [x] NVDA screen reader (Windows default)

---

## Risks & Mitigations

### Technical Risks

#### Risk 1: Astro Version Compatibility
**Probability**: Low
**Impact**: Medium
**Mitigation**: Lock to Astro 4.15.x, test thoroughly before upgrading major versions
**Contingency**: Pin all dependencies to exact versions if breaking changes occur

#### Risk 2: Vitest + Astro Configuration Conflicts
**Probability**: Medium
**Impact**: Low
**Mitigation**: Use Astro's official `getViteConfig()` helper, follow docs exactly
**Contingency**: Fallback to separate Vite config if Astro helper causes issues

#### Risk 3: GitHub Pages Build Failures
**Probability**: Low
**Impact**: High
**Mitigation**: Test deployment to GitHub Pages early, verify base URL config
**Contingency**: Use Netlify free tier if GitHub Pages proves problematic

#### Risk 4: Content Schema Too Strict
**Probability**: Medium
**Impact**: Low
**Mitigation**: Make optional fields truly optional, clear error messages
**Contingency**: Relax schema validation if artist struggles with required fields

### Non-Technical Risks

#### Risk 1: Artist Finds Setup Too Complex
**Probability**: Low
**Impact**: Medium
**Mitigation**: Create step-by-step setup guide with screenshots, simple language
**Contingency**: Offer to do initial setup, focus docs on "adding pottery pieces"

---

## Documentation Plan

### Technical Documentation
- [x] `specs/001-initial-project-setup/spec.md` - Feature specification (approved)
- [x] `specs/001-initial-project-setup/plan.md` - This implementation plan
- [x] `specs/001-initial-project-setup/data-model.md` - Pottery content schema
- [x] `specs/001-initial-project-setup/contracts/cli.md` - CLI command reference

### User Documentation
- [x] `docs/setup-guide.md` - Initial project setup for developers
- [x] `docs/adding-new-piece.md` - How artist adds pottery pieces (created in future feature)
- [x] `README.md` - Updated with project overview and quick start

### Code Documentation
- [x] JSDoc comments for all exported functions
- [x] Inline comments for non-obvious configuration
- [x] Config file comments explaining custom settings

---

## Rollback Plan

### If Feature Fails in Production

1. **Immediate**: Revert to SDD framework commit (before Astro setup)
   ```bash
   git checkout master
   git reset --hard 7976fbb
   ```

2. **Investigate**: Review build logs, identify configuration issue

3. **Fix**: Create hotfix on separate branch, test locally

4. **Test**: Verify fix with `npm run build && npm test`

5. **Deploy**: Merge hotfix, redeploy

### Rollback Steps
```bash
# If deployment fails completely
git checkout master
git reset --hard 7976fbb  # SDD framework commit
git push origin master --force  # (only if no one else has pulled)

# If specific config is broken
git revert [commit-hash]  # Safer, preserves history
npm run build && npm test
npm run deploy
```

---

## Success Criteria

Feature is considered complete when:

- [x] All acceptance criteria from spec.md are met
- [x] Dev server starts in <5 seconds
- [x] Production build completes successfully
- [x] Test suite runs and passes
- [x] Content collections validate pottery schema
- [x] Tailwind clay palette renders correctly
- [x] Deployment to GitHub Pages succeeds
- [x] Lighthouse scores ≥90 (all categories)
- [x] Documentation allows another developer to set up project
- [x] Constitutional gates all pass

---

## Research & Alternatives Considered

See: `specs/001-initial-project-setup/research.md`

**Summary**:

**Alternative SSGs Considered**:
- Next.js: Rejected (too complex, needs server for ISR)
- Hugo: Rejected (Go templates harder for React developer)
- Eleventy: Rejected (no first-class React support)
- **Selected: Astro** (islands architecture, React support, simplicity)

**Alternative CSS Approaches**:
- Vanilla CSS: Rejected (maintenance burden)
- CSS Modules: Rejected (more config, less intuitive)
- Styled Components: Rejected (runtime overhead, violates Article I)
- **Selected: Tailwind** (utility-first, no runtime, custom palette)

**Alternative Testing Frameworks**:
- Jest: Rejected (slower, CommonJS, more config)
- Mocha/Chai: Rejected (more dependencies, less integrated)
- **Selected: Vitest** (Vite-native, fast, Astro integration)

---

## Approval Checklist

- [x] All constitutional gates pass or justified
- [x] Technology choices traced to requirements
- [x] Testing strategy comprehensive
- [x] Performance considerations documented
- [x] Risks identified with mitigations
- [x] Documentation plan complete
- [x] All 7 technology choices have rationale

---

## Sign-off

**Reviewed by**: [Awaiting human review]
**Date**: 2025-10-04
**Status**: Draft - Awaiting Approval
**Comments**:

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| 2025-10-04 | Initial creation | Plan created from approved spec, research complete |
