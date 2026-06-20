Authority:
DISC-RUNTIME-002

Truth:
Backend Internal Schema Access Requires Certified Client Authority

Title:
Repository Precedent Can Localize Runtime Defects Faster Than Schema Investigation

Context:

The SBU endpoint investigation initially focused on:

- schema existence
- permissions
- deployment state

Repository comparison revealed a faster localization path.

Working backend paths used:

supabaseAuth

The failing path used:

supabase

This difference immediately localized the defect.

Lesson:

Repository precedent can localize runtime defects faster than schema investigation.

Operational Consequence:

When runtime behavior differs from expectation:

1. Locate a known working implementation.
2. Compare authority path.
3. Compare service topology.
4. Compare dependency usage.

Only then broaden investigation.

Validation Case:

ProgramsManagement SBU endpoint repair.

Result:

Repository precedent localized the defect before any database mutation was required.
