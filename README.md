# Mol_Art Pottery Portfolio

A professional pottery portfolio website built using **Specification-Driven Development (SDD)** methodology with Claude Code Sonnet 4.5.

## Project Mission

Create a beautiful, maintainable portfolio for a high school ceramic artist that:
- Showcases 3 decorative/sculptural pottery pieces
- Uses AI-generated artistic descriptions
- Implements visual search by characteristics
- Remains simple enough for the artist to maintain independently

---

## For AI Agents Working on This Project

**READ FIRST**: [.claude/instructions.md](.claude/instructions.md) - Complete agent context and capabilities

**CONSTITUTION**: [constitution.md](constitution.md) - Architectural principles that govern all decisions

**METHODOLOGY**: [docs/sdd-methodology.md](docs/sdd-methodology.md) - Specification-Driven Development workflow

### Quick Start for Agents

1. **Understand the context**: Read `.claude/instructions.md` completely
2. **Check constitutional compliance**: Every decision must align with `constitution.md`
3. **Follow SDD workflow**: Always use `/specify` → `/plan` → `/tasks` → implement
4. **Test-first always**: No code before tests, no exceptions
5. **Self-document**: Update specs when you make changes

### Agent Capabilities Required

This project requires an AI agent with:
- File system access (read/write)
- Git operations (branch, commit, push)
- Command execution (npm, tests, builds)
- Web search (for research during planning)
- Claude API access (for AI description generation)
- Image processing capabilities (for visual search)

---

## Project Structure

```
mol-art-portfolio/
├── .claude/
│   ├── instructions.md          # Agent instructions
│   └── mcp-config.json          # MCP server configuration
├── specs/
│   ├── templates/               # Specification templates
│   ├── constitutional-amendments/ # Constitution evolution
│   └── [feature-branches]/      # Feature specifications
├── src/
│   ├── content/                 # Markdown pottery data
│   ├── components/              # React islands
│   ├── pages/                   # Astro pages
│   └── lib/                     # Utilities
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── adding-new-piece.md      # Artist maintenance guide
│   └── sdd-methodology.md       # SDD principles
├── constitution.md              # Architectural principles
├── package.json
└── README.md                    # This file
```

---

## Development Workflow

### For AI Agents

```bash
# 1. Create specification
/specify [feature description]

# 2. Review and approve spec
# Human reviews specs/[branch]/spec.md
# Human says: "Specification approved, proceed to planning"

# 3. Generate implementation plan
/plan [technical approach]

# 4. Check constitutional gates
# Verify all Phase -1 gates pass in plan.md

# 5. Generate tasks
/tasks

# 6. Implement test-first
# Write tests → Get approval → Confirm red phase → Implement → Green phase
```

### For Human Developers

```bash
# Validate content
npm run validate-content

# Run tests
npm test

# Build site
npm run build

# Deploy
npm run deploy
```

---

## Constitutional Principles (Summary)

1. **Simplicity**: Max 3 core components (Astro, React, Tailwind)
2. **Content as Data**: Markdown files, no database
3. **Test-First**: No code before approved tests
4. **Performance**: Lighthouse scores ≥90, LCP <2.5s
5. **AI Enhancement**: Required features with graceful fallbacks
6. **Maintainability**: High schooler can maintain independently
7. **Earthy Aesthetic**: Clay-inspired design system
8. **Observability**: Every feature testable via CLI
9. **Amendments**: Documented process for evolving principles

See [constitution.md](constitution.md) for full details and enforcement gates.

---

## Technology Stack

| Component | Technology | Justification |
|-----------|-----------|---------------|
| Site Generator | Astro | Best-in-class static generation, islands architecture |
| Interactivity | React | Familiar to artist, component-based |
| Styling | Tailwind CSS | Utility-first, no custom CSS needed |
| Testing | Vitest | Fast, ESM-native, Vite-based |
| Image Processing | Sharp | Industry standard, excellent performance |
| Deployment | GitHub Pages | Free, simple, git-based workflow |

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Anthropic API key (for AI descriptions)
- Text editor (VS Code recommended)

### Initial Setup

```bash
# Clone repository
git clone [your-repo-url]
cd mol-art-portfolio

# Install dependencies
npm install

# Copy environment template
cp .env.template .env
# Edit .env and add your ANTHROPIC_API_KEY

# Start development server
npm run dev
```

### Adding Your First Pottery Piece

See [docs/adding-new-piece.md](docs/adding-new-piece.md) for step-by-step instructions.

---

## Success Criteria

✅ Artist says "wow" when she sees it
✅ Artist can add pottery pieces without help
✅ All constitutional gates pass
✅ Performance budgets green in CI
✅ Site feels as handcrafted as her pottery
✅ Every decision traceable to specification

---

## Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Content Management
npm run validate-content       # Validate markdown files
npm run generate-descriptions  # Generate AI descriptions

# Performance
npm run perf-check      # Run Lighthouse audit

# Deployment
npm run deploy          # Build and deploy to GitHub Pages
```

---

## Documentation

- [Adding New Pottery Pieces](docs/adding-new-piece.md) - For the artist
- [How It Works](docs/how-it-works.md) - Architecture overview
- [Deploying Changes](docs/deploying-changes.md) - Deployment guide
- [SDD Methodology](docs/sdd-methodology.md) - Development workflow

---

## Constitutional Quick Reference

| Article | Principle | Gate Phase |
|---------|-----------|------------|
| I | Simplicity First (≤3 components) | Phase -1 |
| II | Content as Data (markdown) | Phase 2 |
| III | Test-First Development | All phases |
| IV | Performance Budget (≥90) | Phase 3 |
| V | AI Progressive Enhancement | Phase 2 |
| VI | High Schooler Maintainability | Phase 4 |
| VII | Earthy Aesthetic | Phase 1 |
| VIII | Observable & Testable (CLI) | Phase 2 |
| IX | Amendment Process | As needed |

---

## License

MIT - Built with love for a young ceramic artist

---

## Support

For questions or issues:
1. Check documentation in `docs/`
2. Review constitutional principles in `constitution.md`
3. Contact [your contact info]

---

**Remember**: Every line of code must answer:

> "Can a high school student maintain this?"

If the answer is no, simplify or document why complexity is unavoidable.
