# Implementation Plan: [Feature Name]

**Spec**: `specs/[branch]/spec.md`
**Created**: [YYYY-MM-DD]
**Status**: Draft | Approved | In Progress | Complete

---

## Architecture Overview

[High-level description of how this feature will be implemented. Focus on the "what" and "why" of architectural decisions, not detailed algorithms.]

### Key Components

1. **Component 1**: [Purpose and role]
2. **Component 2**: [Purpose and role]
3. **Component 3**: [Purpose and role]

### Component Interactions

```
[Simple ASCII diagram or description of how components interact]

User → Component A → Component B → Output
```

---

## Technology Choices

### Choice 1: [Technology Name]

**Requirement**: [Which spec requirement does this address?]
**Rationale**: [Why this technology over alternatives?]
**Constitutional Check**: [Which article(s) does this align with?]
**Trade-offs**: [What are we gaining/losing?]

### Choice 2: [Technology Name]

**Requirement**: [Which spec requirement does this address?]
**Rationale**: [Why this technology over alternatives?]
**Constitutional Check**: [Which article(s) does this align with?]
**Trade-offs**: [What are we gaining/losing?]

[Continue for each technology choice]

---

## Constitutional Gates

### Phase -1: Pre-Implementation Gates

#### Simplicity Gate (Article I)
- [ ] Using ≤3 core components? [Yes/No]
  - Current: [List current components]
  - Adding: [List new components if any]
  - Justification: [If >3, document why complexity is unavoidable]

- [ ] Zero additional build tools beyond Astro defaults? [Yes/No]
  - If No: [Document which tools and why]

- [ ] No state management libraries? [Yes/No]
  - If No: [Justify why React hooks insufficient]

**Status**: ✅ Pass | ❌ Fail - [If fail, link to complexity-tracking.md]

#### Observability Gate (Article VIII)
- [ ] CLI commands defined for all features? [Yes/No]
  - Commands: [List CLI commands]
  - Location: `contracts/cli.md`

- [ ] Each feature testable via CLI? [Yes/No]
  - Test approach: [Describe]

**Status**: ✅ Pass | ❌ Fail

#### Maintainability Gate (Article VI)
- [ ] High schooler can understand? [Yes/No]
  - Complexity level: [1-10, target ≤5]
  - Simplification plan: [How we keep it simple]

- [ ] Deployment is single command? [Yes/No]
  - Command: `npm run deploy`

**Status**: ✅ Pass | ❌ Fail

---

## Implementation Phases

### Phase 0: Foundation
**Goal**: [What gets set up]
**Duration**: [Estimate]
**Deliverables**:
- [ ] Deliverable 1
- [ ] Deliverable 2

### Phase 1: Core Implementation
**Goal**: [What gets built]
**Duration**: [Estimate]
**Deliverables**:
- [ ] Deliverable 1
- [ ] Deliverable 2

### Phase 2: Integration
**Goal**: [How components connect]
**Duration**: [Estimate]
**Deliverables**:
- [ ] Deliverable 1
- [ ] Deliverable 2

### Phase 3: Polish & Testing
**Goal**: [Refinement and quality assurance]
**Duration**: [Estimate]
**Deliverables**:
- [ ] Deliverable 1
- [ ] Deliverable 2

---

## Data Model

See: `specs/[branch]/data-model.md`

**Summary**:
- Entity 1: [Brief description]
- Entity 2: [Brief description]
- Relationships: [How they connect]

---

## Contracts & Interfaces

See: `specs/[branch]/contracts/`

### API Contracts
- `contracts/api.md`: [External API interfaces]

### CLI Contracts
- `contracts/cli.md`: [Command-line interfaces]

### Component Contracts
- `contracts/components.md`: [React component props/events]

---

## Testing Strategy

### Unit Tests
**Location**: `tests/unit/`
**Coverage Target**: 100% of utility functions
**Key Areas**:
- [ ] Area 1: [e.g., Content parsing]
- [ ] Area 2: [e.g., Color extraction]

### Integration Tests
**Location**: `tests/integration/`
**Coverage Target**: All feature interactions
**Key Areas**:
- [ ] Area 1: [e.g., Gallery + content system]
- [ ] Area 2: [e.g., AI descriptions + fallbacks]

### End-to-End Tests
**Location**: `tests/e2e/`
**Coverage Target**: Critical user flows
**Key Flows**:
- [ ] Flow 1: [e.g., Browse gallery → view piece → share]
- [ ] Flow 2: [e.g., Add new piece → build → deploy]

---

## Performance Considerations

### Performance Budget
- **LCP**: <2.5s
- **FCP**: <1.8s
- **TBT**: <200ms
- **CLS**: <0.1
- **Lighthouse**: ≥90

### Optimization Strategies
1. **Strategy 1**: [e.g., Image lazy loading with Sharp]
2. **Strategy 2**: [e.g., Code splitting with Astro islands]
3. **Strategy 3**: [e.g., Minimal JavaScript hydration]

### Performance Testing
- [ ] Lighthouse CI configured
- [ ] Performance budgets in CI
- [ ] Regression alerts active

---

## Security Considerations

### Input Validation
- [ ] Frontmatter schema validation
- [ ] File upload restrictions (if applicable)
- [ ] Sanitization of user input

### External APIs
- [ ] API keys stored in environment variables
- [ ] Rate limiting handled
- [ ] Error responses don't leak sensitive data

### Build-Time Security
- [ ] Dependencies scanned for vulnerabilities
- [ ] No secrets in git repository
- [ ] Environment variables not committed

---

## Accessibility Plan

### WCAG 2.1 AA Compliance
- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Screen reader testing
- [ ] Color contrast ≥4.5:1

### Testing Tools
- [ ] axe DevTools
- [ ] Lighthouse accessibility audit
- [ ] Manual keyboard navigation
- [ ] Screen reader (NVDA/VoiceOver)

---

## Risks & Mitigations

### Technical Risks

#### Risk 1: [Risk Description]
**Probability**: Low | Medium | High
**Impact**: Low | Medium | High
**Mitigation**: [Specific mitigation strategy]
**Contingency**: [Backup plan if mitigation fails]

#### Risk 2: [Risk Description]
**Probability**: Low | Medium | High
**Impact**: Low | Medium | High
**Mitigation**: [Specific mitigation strategy]
**Contingency**: [Backup plan if mitigation fails]

### Non-Technical Risks

#### Risk 1: [e.g., Artist finds feature too complex]
**Probability**: Low | Medium | High
**Impact**: Low | Medium | High
**Mitigation**: [Simpler documentation, walkthroughs]
**Contingency**: [Simplify feature if needed]

---

## Documentation Plan

### Technical Documentation
- [ ] `specs/[branch]/spec.md` - Updated with any spec changes
- [ ] `specs/[branch]/plan.md` - This file
- [ ] `specs/[branch]/data-model.md` - Content schemas
- [ ] `specs/[branch]/contracts/` - API/CLI contracts

### User Documentation
- [ ] `docs/[feature-name].md` - How to use this feature
- [ ] `docs/adding-new-piece.md` - Updated if content-related
- [ ] `docs/how-it-works.md` - Architecture overview updated

### Code Documentation
- [ ] JSDoc comments for public functions
- [ ] README for complex utilities
- [ ] Inline comments for non-obvious logic

---

## Rollback Plan

### If Feature Fails in Production

1. **Immediate**: Revert to previous working branch
2. **Investigate**: Review logs, identify issue
3. **Fix**: Create hotfix branch
4. **Test**: Verify fix in staging
5. **Deploy**: Redeploy with fix

### Rollback Steps
```bash
# Revert to previous deployment
git revert [commit-hash]
npm run build
npm run deploy

# Or rollback branch
git checkout main
git reset --hard [previous-working-commit]
npm run deploy
```

---

## Success Criteria

Feature is considered complete when:

- [ ] All acceptance criteria from spec.md are met
- [ ] All tests passing (unit, integration, e2e)
- [ ] Performance budgets met (Lighthouse ≥90)
- [ ] Accessibility audit passes (WCAG 2.1 AA)
- [ ] Documentation complete and tested
- [ ] Artist can use feature independently
- [ ] Constitutional gates all pass
- [ ] Code reviewed and approved

---

## Research & Alternatives Considered

See: `specs/[branch]/research.md`

**Summary**:
- Alternative 1: [Rejected because...]
- Alternative 2: [Rejected because...]
- Selected approach: [Chosen because...]

---

## Approval Checklist

- [ ] All constitutional gates pass or justified
- [ ] Technology choices traced to requirements
- [ ] Testing strategy comprehensive
- [ ] Performance considerations documented
- [ ] Risks identified with mitigations
- [ ] Documentation plan complete

---

## Sign-off

**Reviewed by**: [Human name]
**Date**: [YYYY-MM-DD]
**Status**: [Approved / Needs Revision]
**Comments**: [Any notes or conditions]

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| [YYYY-MM-DD] | Initial creation | Plan created from approved spec |
| | | |
