from __future__ import annotations

import json
from pathlib import Path
import sys

root = Path(__file__).resolve().parent.parent
manifest_path = root / "manifest.json"
apps_root = root / "apps"

manifest = json.loads(manifest_path.read_text())
errors: list[str] = []

print(f"Loaded {len(manifest)} app entries from {manifest_path.name}")
for app in manifest:
    slug = app["slug"]
    app_dir = apps_root / slug
    entry = root / app["entry"]
    if not app_dir.is_dir():
        errors.append(f"missing app dir: {app_dir}")
        continue
    if not entry.exists():
        errors.append(f"missing entry file: {entry}")
    readme = app_dir / "README.md"
    if not readme.exists():
        errors.append(f"missing README: {readme}")
    print(f"✓ {slug:18} runtime={app['runtime']:<6} entry={app['entry']}")

if errors:
    print("\nErrors:")
    for err in errors:
        print(f"- {err}")
    sys.exit(1)

print("\nAll app directories and entrypoints verified.")
