ID:
DISC-ARCH-013

TITLE:
Main Hub Authority vs Mirror Authority

DOMAIN:
architecture-authority

AUTHORITY:
certified

STATUS:
active

TYPE:
CERTIFIED_TRUTH

TAGS:
authority
gateway
hub
onboarding
mirror
runtime
membership

EVIDENCE:
Multiple MVP convergence investigations established that onboarding, gateway, and UI layers may display information but do not constitute authoritative business state.

Membership authority, invitation authority, role authority, and governance authority are owned by backend services and authoritative data stores.

UI layers may lag, cache, misrepresent, or incompletely represent authoritative state.

TRUTH:
The Main Hub is authoritative.

Gateway, onboarding, dashboard, and UI surfaces are mirrors of authoritative state.

MEANING:
No frontend surface may be treated as authoritative evidence.

All business truth must be validated against authoritative backend APIs, RPCs, or authoritative database state.

RULE:
Authority flows:

Authoritative Backend
        ↓
Gateway Mirror
        ↓
User Interface

Never reverse the direction.

IMPACT:
Programs
Invitations
Memberships
Dashboard
Governance
Notifications
SBU Access
Role Enforcement

RELATED_TRUTHS:
DISC-RUNTIME-001
DISC-ARCH-012

RELATED_SYSTEMS:
Main Hub
Gateway
Onboarding
Membership Layer
Governance Layer

RELATED_STAKEHOLDERS:
Founder
Developers
Members
Tutors

SOURCE:
MVP Convergence Investigations

TIMESTAMP:
2026-06-19
