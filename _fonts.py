import re
from pathlib import Path
text = Path("_next/static/chunks/11tsnlyy7.o~q.css").read_text(encoding="utf-8", errors="replace")
fonts = set(re.findall(r'url\(([^)]+)\)', text))
for f in sorted(fonts):
    print(f)
print("count", len(fonts))
