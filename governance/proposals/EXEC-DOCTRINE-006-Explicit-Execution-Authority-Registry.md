# EXEC-DOCTRINE-006 — Explicit Execution Authority Registry

Status: Proposed
Founder Approval: Pending

Core Principles

• Every execution cycle has exactly one active Implementation Authority.
• Active execution authorities are declared explicitly.
• Execution consumes the Authority Registry.
• Execution never infers authority from repository contents.
• Repository convergence operates only on Founder-approved implementation artifacts.
• Registry validation certifies:
  - schema
  - authority identity
  - approval status
  - candidate artifact existence
  - repository consistency

Introduces

Authority Resolution Gate

Implementation

Planning artifact only.

No runtime changes.
No registry changes.
