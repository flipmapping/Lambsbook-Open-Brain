ID:
DISC-RUNTIME-004

TITLE:
Backend Internal Schema Access Requires Certified Client Authority

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
authority
supabase
service-role
permissions
investigation

EVIDENCE:

The SBU endpoint failed despite:

- schema existence
- table existence
- SELECT privilege
- successful service-role probes

The endpoint succeeded after replacing:

supabase

with

supabaseAuth

TRUTH:

When backend code accesses protected internal schemas, client authority must be certified before investigating permissions.

MEANING:

Permission errors alone do not prove a database permission defect.

The authority context used by the query must be verified first.

RULE:

Client Authority
→ Schema
→ Table
→ Permission Investigation

Never reverse the order.

IMPACT:

Runtime Recovery
Backend Investigation
Supabase Integration
MVP Convergence

RELATED_TRUTHS:

DISC-GOV-001
DISC-RUNTIME-002

SOURCE:

ProgramsManagement SBU API Recovery

TIMESTAMP:

2026-06-20
