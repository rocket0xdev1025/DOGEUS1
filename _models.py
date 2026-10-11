import re
from pathlib import Path
found = set()
for p in Path("_next").rglob("*.js"):
    text = p.read_text(encoding="utf-8", errors="replace")
    found |= set(re.findall(r'/models/[A-Za-z0-9_~.-]+\.glb', text))
    found |= set(re.findall(r'models/[A-Za-z0-9_~.-]+\.glb', text))
print("\n".join(sorted(found)))
print("count", len(found))
