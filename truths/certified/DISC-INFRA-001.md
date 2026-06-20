ID:
DISC-INFRA-001

TITLE:
Scratch Quota Exhaustion Can Masquerade As Runtime Failure

DOMAIN:
infrastructure

AUTHORITY:
certified

STATUS:
active

TYPE:
CERTIFIED_TRUTH

TAGS:
infrastructure
runtime
storage
tmp
tsx
replit
quota

EVIDENCE:
Runtime startup failed with:

listen UNKNOWN
/tmp/tsx-1000/*.pipe

Workspace storage remained healthy.

Runtime scratch storage (/tmp) was quota exhausted.

Three recovery artifacts consumed approximately 5.4 GB.

Removing the oversized recovery artifacts restored runtime startup behavior.

TRUTH:
Scratch storage exhaustion can present as application runtime failure even when application code is healthy.

MEANING:
Infrastructure health must be verified before diagnosing application runtime failures.

RULE:
Inspect infrastructure state before repairing application code.

IMPACT:
Runtime Recovery
Storage Governance
Incident Response
Operational Stability

RELATED_TRUTHS:
DISC-GOV-003

RELATED_SYSTEMS:
Replit
tsx
Node Runtime

RELATED_STAKEHOLDERS:
Founder
Developers
Operators

SOURCE:
Runtime Startup Recovery Investigation

TIMESTAMP:
2026-06-20
