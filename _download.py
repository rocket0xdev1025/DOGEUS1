import os, re, urllib.request
from pathlib import Path

ROOT = Path(".")
BASE = "https://dogeusmaximus.com"
html = open("index-source.html", "r", encoding="utf-8", errors="replace").read()

urls = set(re.findall(r'(?:href|src)="(/[^"]+)"', html))
# also url() in inline styles
urls |= set(re.findall(r'url\((/[^)]+)\)', html))

def local_path(url_path: str) -> Path:
    clean = url_path.split("?")[0]
    if clean.startswith("/"):
        clean = clean[1:]
    return ROOT / clean

def fetch(url_path: str):
    dest = local_path(url_path)
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return dest, "skip"
    url = BASE + url_path.split("?")[0] if "?" not in url_path else BASE + url_path
    # keep query for next hashed assets that include query in href
    req = urllib.request.Request(BASE + url_path, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
        dest.write_bytes(data)
        return dest, f"ok {len(data)}"
    except Exception as e:
        return dest, f"FAIL {e}"

print("initial urls", len(urls))
queue = sorted(urls)
seen = set()
extra = []
while queue:
    u = queue.pop(0)
    key = u.split("?")[0]
    if key in seen:
        continue
    seen.add(key)
    dest, status = fetch(u)
    print(status, u)
    if status.startswith("ok") and dest.suffix in {".css", ".js"}:
        text = dest.read_text(encoding="utf-8", errors="replace")
        found = set(re.findall(r'/_next/static/[^"\'\s)]+', text))
        found |= set(re.findall(r'/images/[^"\'\s)]+', text))
        found |= set(re.findall(r'/_next/static/media/[^"\'\s)]+', text))
        for f in found:
            f = f.split("?")[0].rstrip("\\")
            if f not in seen:
                queue.append(f)
                extra.append(f)

print("extra discovered", len(extra))
print("done files", len(seen))
