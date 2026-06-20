ID:
DISC-OPENBRAIN-001

TITLE:
Semantic Publication Must Be Idempotent

DOMAIN:
open-brain

AUTHORITY:
certified

STATUS:
active

TYPE:
CERTIFIED_TRUTH

TAGS:
open-brain
publishing
idempotency
retrieval
knowledge-quality

EVIDENCE:
DISC-RUNTIME-003 was published more than once.

Retrieval returned multiple copies of the same semantic object.

Publisher inspection confirmed no uniqueness enforcement.

TRUTH:
Publishing the same semantic object multiple times must not create multiple retrievable authority objects.

MEANING:
Semantic publication must be idempotent.

Repeated publication of the same truth should update or reuse the authoritative object rather than creating duplicates.

RULE:
Truth identity must be verified before publication.

Publication should operate as:

UPSERT BY ID

rather than:

INSERT

IMPACT:
Knowledge Quality
Search Accuracy
Retrieval Reliability
Open Brain Governance

RELATED_TRUTHS:
DISC-GOV-005

SOURCE:
DISC-RUNTIME-003 Duplicate Publication Investigation

TIMESTAMP:
2026-06-20
