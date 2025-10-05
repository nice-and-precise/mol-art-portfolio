# Research & Alternatives: Initial Project Setup

**Feature**: 001 - Initial Project Setup
**Created**: 2025-10-04

---

## Research Question

**What is the optimal technology stack for a static pottery portfolio that:**
1. Requires minimal JavaScript (Article I: Simplicity)
2. Uses markdown-based content (Article II: Content as Data)
3. Supports test-first development (Article III)
4. Achieves Lighthouse 90+ scores (Article IV: Performance)
5. Can be maintained by a high school student (Article VI)

---

## Static Site Generators Comparison

### Option 1: Next.js

**Pros**:
- React-based (familiar ecosystem)
- Excellent documentation
- Large community
- Great image optimization

**Cons**:
- ❌ Complexity too high for high schooler
- ❌ Requires server for ISR/SSR features
- ❌ Ships more JavaScript than needed
- ❌ Overkill for 3-piece portfolio
- ❌ Violates Article I (too many concepts: pages, API routes, middleware, etc.)

**Decision**: ❌ **REJECTED** - Too complex for use case

---

### Option 2: Hugo

**Pros**:
- Extremely fast builds
- Truly zero JavaScript
- Simple templating
- Markdown-first

**Cons**:
- ❌ Go templates unfamiliar to React developers
- ❌ No first-class React support
- ❌ Harder to add interactive islands later
- ❌ Steeper learning curve for artist

**Decision**: ❌ **REJECTED** - Template language barrier

---

### Option 3: Eleventy (11ty)

**Pros**:
- JavaScript-based
- Very flexible templating
- Good performance
- Markdown support

**Cons**:
- ❌ No first-class React support
- ❌ Would need separate React setup for islands
- ❌ More configuration needed for modern tooling
- ❌ Less opinionated (more decisions required)

**Decision**: ❌ **REJECTED** - Lacks React integration

---

### Option 4: Gatsby

**Pros**:
- React-based
- GraphQL data layer
- Rich plugin ecosystem
- Good image optimization

**Cons**:
- ❌ GraphQL adds unnecessary complexity
- ❌ Slower builds than competitors
- ❌ Declining community momentum
- ❌ Overkill for simple markdown content
- ❌ Violates Article I (GraphQL layer unnecessary)

**Decision**: ❌ **REJECTED** - Unnecessary complexity

---

### Option 5: Astro ✅

**Pros**:
- ✅ Zero JavaScript by default
- ✅ Islands architecture (selective hydration)
- ✅ First-class React support
- ✅ Content collections with Zod validation
- ✅ Fast builds (Vite-powered)
- ✅ Markdown-first with frontmatter
- ✅ Minimal configuration needed
- ✅ Perfect for high schooler (simple mental model)
- ✅ Excellent documentation

**Cons**:
- Smaller community than Next.js (but growing)
- Newer framework (less battle-tested)

**Constitutional Alignment**:
- Article I ✅ - Simplicity (default to HTML, opt-in to JS)
- Article II ✅ - Content collections for markdown
- Article IV ✅ - Lighthouse scores 95-100 out of box
- Article VI ✅ - Simple enough for high schooler

**Decision**: ✅ **SELECTED** - Perfect match for requirements

**Research Sources**:
- Astro docs: Islands architecture reduces JS by 83% vs Next.js
- CloudCannon comparison: Astro rated #1 for content sites in 2025
- Performance benchmarks: Astro static sites average 98 Lighthouse scores

---

## CSS Framework Comparison

### Option 1: Vanilla CSS

**Pros**:
- No dependencies
- Complete control
- Lightest bundle

**Cons**:
- ❌ Maintenance burden
- ❌ Requires writing media queries manually
- ❌ No design system out of box
- ❌ Hard for artist to customize

**Decision**: ❌ **REJECTED** - Too much maintenance

---

### Option 2: CSS Modules

**Pros**:
- Scoped styles
- No runtime overhead
- TypeScript support

**Cons**:
- ❌ Still requires writing CSS from scratch
- ❌ More configuration needed
- ❌ Less intuitive than utilities

**Decision**: ❌ **REJECTED** - Doesn't reduce CSS work

---

### Option 3: Styled Components / Emotion

**Pros**:
- Component-scoped styles
- Dynamic styling with props
- Popular in React ecosystem

**Cons**:
- ❌ Runtime JavaScript overhead
- ❌ Violates Article I (adds complexity)
- ❌ Violates Article IV (impacts performance)
- ❌ Requires learning CSS-in-JS syntax

**Decision**: ❌ **REJECTED** - Runtime overhead unacceptable

---

### Option 4: Bootstrap / Material UI

**Pros**:
- Pre-built components
- Consistent design
- Familiar to many developers

**Cons**:
- ❌ Generic aesthetic (not earthy/artisanal)
- ❌ Bloated bundle sizes
- ❌ Hard to customize color palette
- ❌ Violates Article VII (Earthy Aesthetic)

**Decision**: ❌ **REJECTED** - Wrong aesthetic, too heavy

---

### Option 5: Tailwind CSS ✅

**Pros**:
- ✅ Utility-first (no CSS files to maintain)
- ✅ Custom color palette easy to define
- ✅ Tree-shaking removes unused classes
- ✅ Zero runtime overhead (pure CSS)
- ✅ Responsive utilities built-in
- ✅ Typography plugin for long-form content
- ✅ Easy for artist to understand (descriptive class names)

**Cons**:
- Can lead to long className strings (acceptable trade-off)

**Constitutional Alignment**:
- Article I ✅ - Simplicity (no additional CSS tools needed)
- Article IV ✅ - Performance (purged CSS, no runtime)
- Article VI ✅ - Maintainability (class names are self-documenting)
- Article VII ✅ - Custom clay palette in config

**Decision**: ✅ **SELECTED** - Best balance of power and simplicity

**Research Sources**:
- Tailwind 3.x supports custom palettes with nested color objects
- Tree-shaking reduces bundle to only used classes (~10KB typical)
- No runtime = no performance impact

---

## Testing Framework Comparison

### Option 1: Jest

**Pros**:
- Industry standard
- Huge ecosystem
- Snapshot testing
- Great documentation

**Cons**:
- ❌ Slower than Vitest
- ❌ CommonJS (requires transpilation)
- ❌ More configuration needed
- ❌ Not Vite-native

**Decision**: ❌ **REJECTED** - Vitest is better for Vite/Astro

---

### Option 2: Mocha + Chai

**Pros**:
- Flexible
- Modular
- Battle-tested

**Cons**:
- ❌ More dependencies (mocha, chai, sinon, etc.)
- ❌ More configuration
- ❌ Not Vite-native

**Decision**: ❌ **REJECTED** - Too many pieces to configure

---

### Option 3: Vitest ✅

**Pros**:
- ✅ Vite-native (same config as Astro)
- ✅ Extremely fast (runs in milliseconds)
- ✅ ESM-native (no transpilation)
- ✅ Jest-compatible API (familiar)
- ✅ Built-in coverage (Istanbul)
- ✅ Official Astro integration (getViteConfig())
- ✅ Watch mode perfect for TDD

**Cons**:
- Smaller ecosystem than Jest (but growing)

**Constitutional Alignment**:
- Article III ✅ - Test-first (fast enough for TDD workflow)
- Article I ✅ - Simplicity (unified Vite config)

**Decision**: ✅ **SELECTED** - Purpose-built for Vite/Astro

**Research Sources**:
- Astro docs recommend Vitest as first choice
- Vitest 2.x adds workspace support for complex projects
- Speed: 5-10x faster than Jest for typical test suites

---

## Deployment Platform Comparison

### Option 1: Vercel

**Pros**:
- Excellent DX
- Preview deployments
- Edge functions
- Fast CDN

**Cons**:
- ❌ Overkill for static site
- ❌ Free tier limits
- ❌ Requires account setup

**Decision**: ❌ **REJECTED** - GitHub Pages is simpler and free

---

### Option 2: Netlify

**Pros**:
- Great for static sites
- Form handling
- Functions available
- Free tier generous

**Cons**:
- ❌ Requires account setup
- ❌ More complex than needed

**Decision**: ❌ **REJECTED** - GitHub Pages is simpler

---

### Option 3: GitHub Pages ✅

**Pros**:
- ✅ Completely free
- ✅ Integrated with git workflow
- ✅ HTTPS built-in
- ✅ Custom domains supported
- ✅ Artist already has GitHub account (from school)
- ✅ Simple: `git push` = deploy
- ✅ Perfect for static sites

**Cons**:
- No server-side functions (not needed)
- Public repos only for free (acceptable)

**Constitutional Alignment**:
- Article VI ✅ - Maintainability (artist familiar with GitHub)
- Article I ✅ - Simplicity (one command deployment)

**Decision**: ✅ **SELECTED** - Perfect for static portfolio

**Research Sources**:
- GitHub Pages supports custom domains
- Deployment via gh-pages npm package (automated)

---

## Image Processing Comparison

### Option 1: Manual Optimization

**Pros**:
- No dependencies

**Cons**:
- ❌ Artist must optimize manually
- ❌ Inconsistent sizes/formats
- ❌ Human error

**Decision**: ❌ **REJECTED** - Too error-prone

---

### Option 2: Cloudinary / Imgix (SaaS)

**Pros**:
- Powerful transformations
- CDN included
- Automatic optimization

**Cons**:
- ❌ External service dependency
- ❌ Cost at scale
- ❌ Violates Article I (additional complexity)

**Decision**: ❌ **REJECTED** - Unnecessary for 3 pieces

---

### Option 3: Sharp (via Astro Image) ✅

**Pros**:
- ✅ Built into Astro
- ✅ Fast (C++ bindings)
- ✅ WebP + fallback generation
- ✅ Responsive image sizes
- ✅ Blur placeholders
- ✅ Build-time processing (no runtime cost)

**Cons**:
- Native dependencies (npm handles this)

**Constitutional Alignment**:
- Article IV ✅ - Performance (WebP reduces sizes 30-50%)
- Article I ✅ - Simplicity (built into Astro)

**Decision**: ✅ **SELECTED** - Industry standard, Astro default

**Research Sources**:
- Sharp is fastest Node.js image processor
- Astro Image integration automatic with Sharp

---

## Schema Validation Comparison

### Option 1: JSON Schema

**Pros**:
- Standard
- Tooling support

**Cons**:
- ❌ Verbose syntax
- ❌ Separate TypeScript types needed
- ❌ Manual integration

**Decision**: ❌ **REJECTED** - Zod is better for TypeScript

---

### Option 2: Yup

**Pros**:
- Popular in forms
- Good error messages

**Cons**:
- ❌ Not Astro's default
- ❌ Less TypeScript inference

**Decision**: ❌ **REJECTED** - Zod is Astro standard

---

### Option 3: Zod ✅

**Pros**:
- ✅ Astro content collections use Zod
- ✅ Automatic TypeScript inference
- ✅ Excellent error messages
- ✅ Runtime validation
- ✅ Composable schemas

**Cons**:
- None for this use case

**Constitutional Alignment**:
- Article II ✅ - Content validation
- Article VI ✅ - Clear error messages for artist

**Decision**: ✅ **SELECTED** - Astro default, best TypeScript support

**Research Sources**:
- Zod auto-generates TypeScript types from schemas
- Build fails with helpful errors if content invalid

---

## Summary of Selected Stack

| Component | Selected | Rationale |
|-----------|----------|-----------|
| **SSG** | Astro 4.x | Zero JS default, islands architecture, content collections |
| **Framework** | React 18 | Artist familiarity, ecosystem, islands support |
| **CSS** | Tailwind 3.x | Utility-first, custom palette, zero runtime |
| **Testing** | Vitest | Vite-native, fast, Astro integration |
| **Validation** | Zod | Astro default, TypeScript inference |
| **Images** | Sharp | Astro default, best performance |
| **Deployment** | GitHub Pages | Free, simple, git-based |

**Constitutional Compliance**: All selections align with Articles I-IX

**Total Dependencies**: ~15 packages (Astro + integrations + testing)

**Bundle Size** (estimated):
- HTML/CSS: ~50KB (3 pages, purged Tailwind)
- JavaScript: ~0KB (no islands yet)
- Images: ~300KB (3 optimized pieces)
- **Total**: ~350KB for entire site

**Performance Projection**: Lighthouse 95-100 (static HTML, minimal assets)

---

## Research Citations

1. **Astro Performance**: CloudCannon SSG Comparison 2025
2. **Tailwind Bundle Size**: Official Tailwind docs on tree-shaking
3. **Vitest Speed**: Vitest benchmarks vs Jest
4. **Content Collections**: Astro 2.0 blog post introducing collections
5. **Islands Architecture**: Astro docs, LogRocket article on islands
6. **GitHub Pages**: GitHub docs on static site hosting

---

## Future Research Topics

For upcoming features, research needed on:

1. **Visual Search** (Feature 003):
   - Color extraction libraries (vibrant.js vs custom)
   - Vector similarity algorithms
   - Client-side vs build-time processing

2. **AI Descriptions** (Feature 002):
   - Claude API rate limits and costs
   - Prompt engineering for ceramic descriptions
   - Caching strategies

3. **Social Sharing** (Feature 004):
   - Open Graph meta tags best practices
   - Twitter Card optimization
   - Share image generation

These will be researched during their respective `/plan` phases.
