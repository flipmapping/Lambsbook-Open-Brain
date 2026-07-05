# DISC-PKG-001 — Python ZIP Packaging Standard

## Status

Accepted Repository Discovery

---

## Discovery

Repository Mutation Package exchange artifacts are most reliably distributed as ZIP archives generated using Python's standard library `zipfile` module.

Empirical execution demonstrated that Python-generated ZIP archives consistently materialize and verify successfully in the production execution environment, while TAR-based exchange artifacts exhibited repeated materialization failures.

---

## Repository Truth

Execution exchange artifacts SHALL be exchanged using verified Python-generated ZIP archives.

Archive generation SHALL rely only on Python's standard library.

External archive utilities are not required.

---

## Verification

Every generated archive SHALL be verified immediately after creation by:

1. reopening the archive;
2. enumerating archive contents;
3. confirming the expected repository structure;
4. reporting archive size;
5. reporting PASS or FAIL.

Unverified archives SHALL NOT be presented for Founder execution.

---

## Rationale

This discovery records the empirical evidence supporting the Artifact Exchange Packaging Standard adopted under EOS Version 2.0.
