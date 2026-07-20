# FAB-EOS-EXECUTION-002

## Title

Canonical Execution Master Prompt

## Constitutional Invariants

1. Repository Truth precedes all governance and Builder execution.

2. The only authoritative implementation intent artifacts are:
   - Founder Action Block (FAB)
   - Implementation Authority (IA)
   - Claude Instruction Brief (CIB)
   - Implementation Context Manifest (ICM)

3. Builder-generated artifacts, including Execution Derivation (ED),
Repository Truth Snapshot (RTS), verification reports, and implementation
certification, are derived artifacts and SHALL NOT introduce,
reinterpret, or override implementation intent.

4. Builder SHALL be stateless with respect to implementation intent and
derive execution behavior exclusively from supplied authoritative
governance artifacts and verified repository state.

5. Execution streams SHALL prepare authoritative governance artifacts
and invoke Builder; they SHALL NOT manually author Builder-generated
artifacts.
