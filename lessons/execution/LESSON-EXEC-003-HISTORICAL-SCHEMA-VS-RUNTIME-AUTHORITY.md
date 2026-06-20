Authority:
DISC-RUNTIME-002

Truth:
Backend Internal Schema Access Requires Certified Client Authority

Title:
Historical Schema Evidence Does Not Certify Runtime Authority

Context:

The SBU endpoint investigation spent significant effort validating:

- schema existence
- table existence
- privileges
- table contents

All evidence appeared healthy.

The endpoint continued to fail.

Root cause was not schema state.

Root cause was incorrect runtime authority:

supabase

instead of

supabaseAuth

Lesson:

Historical schema evidence cannot certify runtime authority.

Runtime authority must be validated directly.

Operational Consequence:

Before investigating permissions:

1. Identify the exact client.
2. Identify the exact schema.
3. Identify the exact table.
4. Probe using the same authority path.

Only then may permission defects be certified.

Validation Case:

ProgramsManagement SBU API repair
June 2026

Result:

Schema investigation alone would not have discovered the defect.

Authority verification localized the repair immediately.
