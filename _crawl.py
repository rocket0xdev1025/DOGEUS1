import re, os
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import urllib.request

BASE = "https://dogeusmaximus.com"
ROOT = Path(".")

seed = [
    "/_next/static/chunks/0.hn96kyxeirn.js",
    "/_next/static/chunks/080frm4rekp8y.js",
    "/_next/static/chunks/0mcymsx8qh64x.js",
    "/_next/static/chunks/0m~~1md1-agqy.js",
    "/_next/static/chunks/0o1zl7_btg.m7.js",
    "/_next/static/chunks/0qdk9-1acihua.js",
    "/_next/static/chunks/12.tdwioyadi4.js",
    "/_next/static/chunks/155-x0wy_5m~n.js",
    "/_next/static/chunks/15bjst88aoa.3.js",
    "/_next/static/chunks/1638o.1podhb3.js",
    "/_next/static/chunks/167p5adqbjry1.js",
    "/_next/static/chunks/185lponx5h_ok.js",
    "/_next/static/media/13bf9871fe164e7f-s.0s19wthhh_6~m.woff2",
    "/_next/static/media/3fe682a82f50d426-s.09q3q1i5159bl.woff2",
    "/_next/static/media/71b036adf157cdcf-s.03nf~dfjdkf~..woff2",
    "/_next/static/media/89b21bb081cb7469-s.0gfhww.tctz1o.woff2",
    "/_next/static/media/cc545e633e20c56d-s.0dza.stei.9v7.woff2",
    "/_next/static/media/f13700f23fbdc6fd-s.0q1bf9cc3c0ui.woff2",
    "/images/banner.png",
    "/images/doge-plane.jpg",
    "/images/floor-spqr.jpg",
    "/images/pfp-coin.jpg",
]

def dest_for(url_path: str) -> Path:
    clean = url_path.split("?")[0]
    if clean.startswith("/"):
        clean = clean[1:]
    return ROOT / clean

def extract(text: str):
    found = set()
    for m in re.findall(r'(?:/_next/static/(?:chunks|media)/|static/(?:chunks|media)/|/images/)[A-Za-z0-9_~./-]+', text):
        if m.startswith("static/"):
            m = "/_next/" + m
        # trim trailing punctuation
        m = m.rstrip(".,);")
        if any(m.lower().endswith(ext) for ext in (".js", ".css", ".woff2", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico")):
            found.add(m.split("?")[0])
    return found

def fetch(url_path: str):
    dest = dest_for(url_path)
    if dest.exists() and dest.stat().st_size > 0:
        return url_path, "skip", dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(BASE + url_path, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = resp.read()
        dest.write_bytes(data)
        return url_path, f"ok {len(data)}", dest
    except Exception as e:
        return url_path, f"FAIL {e}", dest

seen = set()
queue = list(seed)
# also seed from existing files
for p in list(ROOT.rglob("*")):
    if p.suffix.lower() in {".js", ".css", ".html"} and p.is_file():
        try:
            queue.extend(extract(p.read_text(encoding="utf-8", errors="replace")))
        except Exception:
            pass

downloaded = []
failed = []
round_n = 0
while queue:
    round_n += 1
    batch = []
    for u in queue:
        if u not in seen:
            seen.add(u)
            batch.append(u)
    queue = []
    if not batch:
        break
    print(f"round {round_n} batch {len(batch)}", flush=True)
    with ThreadPoolExecutor(max_workers=12) as ex:
        futs = [ex.submit(fetch, u) for u in batch]
        for fut in as_completed(futs):
            url, status, dest = fut.result()
            print(status, url, flush=True)
            if status.startswith("FAIL"):
                failed.append(url)
            elif status.startswith("ok") and dest.suffix.lower() in {".js", ".css"}:
                queue.extend(extract(dest.read_text(encoding="utf-8", errors="replace")))

print("FAILED", len(failed))
for f in failed:
    print(" ", f)
print("seen", len(seen))
