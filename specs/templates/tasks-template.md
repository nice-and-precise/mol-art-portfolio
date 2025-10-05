# Task List: [Feature Name]

**Spec**: `specs/[branch]/spec.md`
**Plan**: `specs/[branch]/plan.md`
**Created**: [YYYY-MM-DD]
**Last Updated**: [YYYY-MM-DD]

---

## Task Legend

- `[P]` = Parallelizable (can run simultaneously with other [P] tasks)
- `[ ]` = Not started
- `[~]` = In progress
- `[✓]` = Completed
- `[x]` = Blocked (see notes)

**Dependencies**: Tasks without `[P]` marker depend on previous tasks completing first.

---

## Phase 0: Foundation

**Goal**: Set up project structure and dependencies
**Est. Duration**: [time estimate]

- `[P]` Task 1: [Specific, actionable task]
  - **Acceptance**: [How we know it's done]
  - **Files**: [Which files affected]
  - **Tests**: [Which tests verify this]

- `[P]` Task 2: [Specific, actionable task]
  - **Acceptance**: [How we know it's done]
  - **Files**: [Which files affected]
  - **Tests**: [Which tests verify this]

- `[ ]` Task 3: [Depends on tasks 1 & 2]
  - **Acceptance**: [How we know it's done]
  - **Files**: [Which files affected]
  - **Tests**: [Which tests verify this]
  - **Depends on**: Tasks 1, 2

---

## Phase 1: Test Creation

**Goal**: Write all tests before implementation
**Est. Duration**: [time estimate]

### Unit Tests

- `[P]` Write unit tests for [component/function 1]
  - **Acceptance**: Tests cover happy path, edge cases, error cases
  - **Files**: `tests/unit/[name].test.ts`
  - **Coverage**: [Specific functions to test]

- `[P]` Write unit tests for [component/function 2]
  - **Acceptance**: Tests cover happy path, edge cases, error cases
  - **Files**: `tests/unit/[name].test.ts`
  - **Coverage**: [Specific functions to test]

### Integration Tests

- `[ ]` Write integration tests for [feature interaction 1]
  - **Acceptance**: Tests verify components work together
  - **Files**: `tests/integration/[name].test.ts`
  - **Coverage**: [Specific interactions to test]
  - **Depends on**: Unit tests complete

- `[ ]` Write integration tests for [feature interaction 2]
  - **Acceptance**: Tests verify components work together
  - **Files**: `tests/integration/[name].test.ts`
  - **Coverage**: [Specific interactions to test]
  - **Depends on**: Unit tests complete

### E2E Tests

- `[ ]` Write e2e tests for [user flow 1]
  - **Acceptance**: Tests verify complete user journey
  - **Files**: `tests/e2e/[name].test.ts`
  - **Coverage**: [Specific user flow]
  - **Depends on**: Integration tests complete

---

## Phase 2: Test Approval

**Goal**: Get human approval for all tests
**Est. Duration**: [time estimate]

- `[ ]` Request test approval from human
  - **Acceptance**: Human explicitly states "These tests correctly verify the requirements"
  - **Deliverable**: Approval documented in plan.md

- `[ ]` Confirm red phase (all tests fail)
  - **Acceptance**: Run `npm test` and verify all new tests fail
  - **Expected**: All tests fail with "not implemented" or similar
  - **Depends on**: Test approval

---

## Phase 3: Core Implementation

**Goal**: Implement features to pass tests
**Est. Duration**: [time estimate]

### Component 1

- `[ ]` Implement [specific functionality]
  - **Acceptance**: Unit tests pass for this component
  - **Files**: `src/[path]/[name].ts`
  - **Tests**: `tests/unit/[name].test.ts` passes
  - **Depends on**: Red phase confirmed

- `[ ]` Implement [specific functionality]
  - **Acceptance**: Unit tests pass for this component
  - **Files**: `src/[path]/[name].ts`
  - **Tests**: `tests/unit/[name].test.ts` passes

### Component 2

- `[P]` Implement [specific functionality]
  - **Acceptance**: Unit tests pass for this component
  - **Files**: `src/[path]/[name].ts`
  - **Tests**: `tests/unit/[name].test.ts` passes
  - **Depends on**: Red phase confirmed

- `[P]` Implement [specific functionality]
  - **Acceptance**: Unit tests pass for this component
  - **Files**: `src/[path]/[name].ts`
  - **Tests**: `tests/unit/[name].test.ts` passes

---

## Phase 4: Integration

**Goal**: Connect components and verify they work together
**Est. Duration**: [time estimate]

- `[ ]` Integrate [component A] with [component B]
  - **Acceptance**: Integration tests pass
  - **Files**: `src/[path]/[name].ts`
  - **Tests**: `tests/integration/[name].test.ts` passes
  - **Depends on**: All unit tests passing

- `[ ]` Integrate [component B] with [component C]
  - **Acceptance**: Integration tests pass
  - **Files**: `src/[path]/[name].ts`
  - **Tests**: `tests/integration/[name].test.ts` passes
  - **Depends on**: Previous integration complete

---

## Phase 5: Polish & Optimization

**Goal**: Refine implementation and optimize performance
**Est. Duration**: [time estimate]

- `[ ]` Optimize [specific aspect]
  - **Acceptance**: Performance budget met
  - **Metric**: [Specific metric, e.g., LCP <2.5s]
  - **Files**: [Files to optimize]
  - **Depends on**: All integration tests passing

- `[ ]` Add error handling for [specific scenario]
  - **Acceptance**: Error tests pass
  - **Files**: [Files to update]
  - **Tests**: Error scenario tests pass

- `[ ]` Improve accessibility for [specific component]
  - **Acceptance**: Lighthouse accessibility ≥90
  - **Files**: [Files to update]
  - **Verification**: axe DevTools, keyboard nav

---

## Phase 6: Documentation

**Goal**: Create comprehensive documentation
**Est. Duration**: [time estimate]

- `[ ]` Write technical documentation
  - **Acceptance**: Spec, plan, data-model up to date
  - **Files**: `specs/[branch]/spec.md`, `specs/[branch]/plan.md`
  - **Verification**: No spec drift detected

- `[ ]` Write user documentation
  - **Acceptance**: Artist can use feature with only docs
  - **Files**: `docs/[feature-name].md`
  - **Verification**: User testing (artist follows docs)

- `[ ]` Add code comments
  - **Acceptance**: All public functions have JSDoc
  - **Files**: All source files
  - **Verification**: ESLint passes

---

## Phase 7: Constitutional Gates

**Goal**: Verify all constitutional requirements met
**Est. Duration**: [time estimate]

- `[ ]` Run Simplicity Gate check (Article I)
  - **Acceptance**: ≤3 core components, complexity justified
  - **Verification**: Review plan.md complexity tracking

- `[ ]` Run Test-First Gate check (Article III)
  - **Acceptance**: All code has corresponding tests
  - **Verification**: Coverage report shows 100%

- `[ ]` Run Performance Gate check (Article IV)
  - **Acceptance**: Lighthouse ≥90, budgets met
  - **Verification**: `npm run perf-check` passes

- `[ ]` Run Maintainability Gate check (Article VI)
  - **Acceptance**: Artist can maintain independently
  - **Verification**: User testing with docs

- `[ ]` Run Observability Gate check (Article VIII)
  - **Acceptance**: CLI commands work, features testable
  - **Verification**: Run all CLI commands successfully

---

## Phase 8: Deployment Preparation

**Goal**: Ready feature for production
**Est. Duration**: [time estimate]

- `[ ]` Run full test suite
  - **Acceptance**: All tests pass (unit, integration, e2e)
  - **Command**: `npm test`
  - **Depends on**: All implementation complete

- `[ ]` Run Lighthouse CI
  - **Acceptance**: All performance budgets pass
  - **Command**: `npm run perf-check`
  - **Depends on**: Full test suite passing

- `[ ]` Build for production
  - **Acceptance**: Build succeeds, no errors
  - **Command**: `npm run build`
  - **Verification**: Check `dist/` output

- `[ ]` Preview production build
  - **Acceptance**: Site works correctly in preview
  - **Command**: `npm run preview`
  - **Verification**: Manual testing of feature

---

## Blocked Tasks

[List any tasks that are currently blocked]

### Task: [Blocked task name]
**Reason**: [Why it's blocked]
**Blocker**: [What needs to happen to unblock]
**Owner**: [Who's responsible for unblocking]
**ETA**: [When expected to be unblocked]

---

## Completed Tasks Summary

**Total Tasks**: [Number]
**Completed**: [Number]
**In Progress**: [Number]
**Blocked**: [Number]
**Remaining**: [Number]

**Progress**: [X]% complete

---

## Notes & Lessons Learned

### During Implementation

- [Date] - [Note about something learned or changed]
- [Date] - [Note about something learned or changed]

### Deviations from Plan

- [Date] - [What changed and why]
- [Date] - [What changed and why]

---

## Daily Progress Log

### [YYYY-MM-DD]
**Tasks Completed**: [Task numbers/names]
**Blockers**: [Any issues encountered]
**Next Steps**: [What's next]

### [YYYY-MM-DD]
**Tasks Completed**: [Task numbers/names]
**Blockers**: [Any issues encountered]
**Next Steps**: [What's next]

---

## Approval

**Final Review by**: [Human name]
**Date**: [YYYY-MM-DD]
**Status**: [All tasks complete / Some tasks pending]
**Next Action**: [Deploy / Needs revision / Blocked]
