ID:
DEC-OPENBRAIN-002

TITLE:
Truth Publisher Will Enforce Identity Before Publication

STATUS:
active

DATE:
2026-06-20

DECISION:

Open Brain truth publication shall become identity-aware.

Before publishing a CERTIFIED_TRUTH:

1. Extract truth ID.
2. Search for existing authority object.
3. If object exists:
   - update or skip publication.
4. If object does not exist:
   - create new authority object.

RATIONALE:

DISC-OPENBRAIN-001 certified that duplicate publication currently creates duplicate retrievable authority objects.

Identity-aware publication prevents knowledge duplication and improves retrieval quality.

AUTHORITY:

DISC-OPENBRAIN-001

EXPECTED OUTCOME:

brain:capture-truth evolves from INSERT semantics to UPSERT semantics.

STATUS:

Approved
