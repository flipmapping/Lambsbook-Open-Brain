ID:
DISC-RUNTIME-002

TITLE:
Backend Internal Schema Access Must Use Service-Role Authority

DOMAIN:
runtime-investigation

AUTHORITY:
certified

STATUS:
active

TYPE:
CERTIFIED_TRUTH

TAGS:
runtime
supabase
service-role
permissions
schema
investigation
sbu

EVIDENCE:
GET /api/hub/sbus initially failed.

Phase 1 Failure:

supabase.from(...).schema(...)

Runtime Error:

TypeError:
schema is not a function

Repair:

.schema("meh")
.from("sbus")

Phase 2 Failure:

42501 permission denied for schema meh

Certified Evidence:

- service-role probe against meh.members succeeded
- service-role probe against meh.sbus succeeded
- endpoint succeeded after restart

Final Repair:

supabase
→
supabaseAuth

and

.schema("meh")
.from("sbus")

Result:

HTTP 200 OK

Endpoint returned SBU data successfully.

TRUTH:
Backend access to protected internal schemas must use certified service-role authority.

MEANING:
Permission errors alone are insufficient evidence of database permission defects.

Authority context must be verified before authorizing schema or permission changes.

RULE:
When investigating protected-schema access:

1. Identify exact client.
2. Probe exact client.
3. Probe exact table.
4. Verify authority.
5. Investigate permissions only after authority is certified.

IMPACT:
Runtime Recovery
Supabase Operations
SBU APIs
Backend Services

RELATED_TRUTHS:
DISC-RUNTIME-001
DISC-ARCH-012
DISC-EXEC-001

RELATED_SYSTEMS:
Supabase
Hub APIs
ProgramsManagement

RELATED_STAKEHOLDERS:
Founder
Developers
Operators

SOURCE:
SBU Endpoint Recovery Investigation

TIMESTAMP:
2026-06-20
