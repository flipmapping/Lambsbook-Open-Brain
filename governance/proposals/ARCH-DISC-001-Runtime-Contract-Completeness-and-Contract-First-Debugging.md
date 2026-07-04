# ARCH-DISC-001

## Title

Runtime Contract Completeness & Contract-First Debugging

---

## Status

Founder Proposal

Recommended for Canonical Adoption

---

# Purpose

Capture reusable architectural knowledge discovered during investigation of the Growth Engine runtime failure.

The investigation demonstrated that a runtime failure originated from an incomplete architectural contract rather than an implementation defect.

This discovery is applicable across all Lambsbook repositories.

---

# Discovery

The runtime failure was not caused by:

* malformed JSON;
* React;
* Vite;
* routing;
* module resolution;
* provider initialization.

Instead, the failure originated from an incomplete runtime contract.

A runtime consumer existed:

AdmissionsSection
↓
useRegistry("admissions")

but no corresponding provider implementation existed:

registry/admissions.json
↓
defaultProvider registration
↓
REGISTRY["admissions"]

The repository simultaneously contained a different contract:

content/<locale>/admissions.json

which represented localized content rather than a registry.

Both contracts were individually valid but architecturally incompatible.

---

# Fundamental Architectural Principle

Every architectural contract SHALL be complete.

A complete contract consists of exactly one consumer contract and one corresponding provider contract connected through all required intermediary bindings.

An incomplete contract is an architectural inconsistency rather than an implementation defect.

Runtime failures caused by incomplete contracts SHALL be treated as architectural findings before implementation debugging begins.

---

# Architectural Principle

Every runtime consumer SHALL have one—and only one—matching provider contract.

Consumer and provider contracts shall be verified before runtime debugging begins.

---

# Runtime Contract Completeness Standard

For every runtime contract, verify:

Consumer

↓

Provider

↓

Registration

↓

Schema

↓

Implementation

↓

Runtime

A failure at any level SHALL be treated as an architectural inconsistency rather than a runtime defect.

---

# Contract-First Debugging Doctrine

Runtime investigations SHALL proceed in the following order:

1. Repository Reality
2. Architectural Contract Audit
3. Contract Completeness Verification
4. Repository Inspection
5. Runtime Inspection
6. Browser Debugging

Debugging SHALL begin at the highest architectural layer capable of explaining the observed failure.

---

# Architectural Completeness Audit

Every bounded context SHALL support automated verification that:

* every consumer has a provider;
* every provider has a consumer (where applicable);
* provider registration is complete;
* schema contracts match;
* implementation is reachable.

Missing contracts SHALL be reported before runtime execution.

---

# Repository Contract Audit

Repository inspection SHALL verify:

* registry consumers ↔ registry providers;
* content consumers ↔ localized content providers;
* API consumers ↔ API implementations;
* service consumers ↔ service registrations.

This audit becomes part of Repository Reality.

---

# Lessons Learned

Repository inspection should precede runtime debugging.

Contract verification should precede browser debugging.

Architectural inconsistencies should be resolved before implementation mutations.

---

# Proposed Deliverables

1. ARCH-STD-001 — Runtime Contract Completeness.
2. EXEC-STD enhancement — Contract-First Debugging.
3. Repository Contract Audit checklist.
4. Automated Contract Completeness validation (future).

---

# Implementation

Planning artifact only.

No runtime changes.

No repository mutation beyond creation of this proposal.
