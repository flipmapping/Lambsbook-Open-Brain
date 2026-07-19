#!/usr/bin/env python3

from pathlib import Path

ROOT = Path(__file__).parent
GENERATED = ROOT / "generated"
ASSETS = ROOT / "assets"

ARTIFACTS = {
    "EOS-CON-000.md": "# EOS-CON-000\n\nExecution Surface Principle\n",
    "EOS-CON-004.md": "# EOS-CON-004\n\nConstitutional Publication Rule\n",
    "EOS-CON-005.md": "# EOS-CON-005\n\nConstitutional Service Consumption Rule\n",
    "EXEC-DIR-EOS-011.md": "# EXEC-DIR-EOS-011\n\nSurface-Based Repository Mutation Doctrine\n",
    "EXEC-DIR-EOS-012.md": "# EXEC-DIR-EOS-012\n\nConcurrent Surface Governance Doctrine\n",
    "EXEC-DIR-EOS-013.md": "# EXEC-DIR-EOS-013\n\nSurface Registry Constitutional Doctrine\n",
    "CERTIFICATION-EVIDENCE.md": "# Certification Evidence\n",
}

def load_content(name, fallback):
    asset = ASSETS / name
    if asset.exists():
        return asset.read_text(encoding="utf-8")
    return fallback

def main():
    GENERATED.mkdir(parents=True, exist_ok=True)

    for name, fallback in ARTIFACTS.items():
        content = load_content(name, fallback)
        (GENERATED / name).write_text(content, encoding="utf-8")

    print("PASS : Asset-aware generation complete")
    print(GENERATED)

if __name__ == "__main__":
    main()
