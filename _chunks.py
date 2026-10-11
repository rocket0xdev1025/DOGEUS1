import re
from pathlib import Path
found = set()
for p in Path("_next").rglob("*"):
    if p.suffix not in {".js", ".css"}:
        continue
    text = p.read_text(encoding="utf-8", errors="replace")
    found |= set(re.findall(r'static/(?:chunks|media)/[A-Za-z0-9_~.-]+', text))
    found |= set(re.findall(r'/_next/static/(?:chunks|media)/[A-Za-z0-9_~.-]+', text))
print("refs", len(found))
missing = []
for f in sorted(found):
    rel = f[1:] if f.startswith("/") else "_next/" + f
    path = Path(rel)
    if not path.exists():
        missing.append(rel)
        print("MISSING", rel)
print("missing", len(missing))
print("existing js", len(list(Path("_next/static/chunks").glob("*"))))
