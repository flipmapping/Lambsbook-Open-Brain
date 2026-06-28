# EXEC-DOCTRINE-008 — Execution Brief Doctrine

Status: Proposed
Founder Approval: Approved

## Purpose

Execution Briefs are the canonical operational contract between
Architecture Authority, Implementation Authority, and Execution Authority.

---

## Authority Model

### Architecture Authority

Owns:

• architecture
• sequencing
• execution briefs

Does not own:

• implementation
• repository mutation
• repository convergence

---

### Implementation Authority

Owns:

• candidate implementation artifacts
• complete replacement artifacts

Does not own:

• repository mutation
• repository convergence

Consumes approved Execution Briefs.

---

### Execution Authority

Owns:

• repository certification
• implementation validation
• repository convergence
• execution evidence

Does not own:

• architecture
• implementation design

---

## Repository Authority Synchronization

Before every implementation work package:

• Repository Authority
• Implementation Authority
• Execution Authority

SHALL be synchronized.

If synchronization fails, repository convergence SHALL take precedence over new implementation.

---

## Artifact-First Principle

Implementation SHALL be produced as complete candidate artifacts outside
the repository.

Repository mutation SHALL occur only through certified convergence.

---

## Founder Responsibilities

The Founder approves:

• Architecture
• Execution Briefs
• Candidate Artifacts
• Repository Convergence

The Founder SHALL NOT become the transport mechanism between
Implementation Authority and Execution Authority.

---

## Phase 5 Freeze

The execution framework is considered sufficient for Phase 5.

Future work SHALL prioritize MVP implementation over additional execution
infrastructure unless a verified architectural blocker requires further
execution evolution.

---

Implementation

Planning artifact only.

No runtime changes.
No governance registry changes.
No platform registry changes.
No repository mutation.
