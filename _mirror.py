"""Download remaining assets referenced by the mirrored site, then clean up."""
import os
import re
import urllib.request
import concurrent.futures
from pathlib import Path

ROOT = Path(r"C:\Users\Tony\Downloads\Sol\Dogeus")
BASE = "https://dogeusmaximus.com"
UA = {"User-Agent": "Mozilla/5.0"}


def read_sources() -> str:
    text = ""
    for p in list((ROOT / "_next").rglob("*")) + [ROOT / "page.html"]:
        if p.is_file() and p.suffix.lower() in {".js", ".css", ".html"}:
            text += p.read_text(encoding="utf-8", errors="ignore") + "\n"
    return text


def collect(text: str) -> list[str]:
    paths = set()
    for m in re.findall(
        r'(?:/_next/static/|static/chunks/|/images/|/models/)[A-Za-z0-9_./~-]+\.(?:js|css|woff2|png|jpg|jpeg|svg|webp|glb|ico)',
        text,
    ):
        if m.startswith("static/"):
            m = "/_next/" + m
        paths.add(m.split("?")[0])
    for m in re.findall(r"/_next/static/media/[A-Za-z0-9_./~-]+\.woff2", text):
        paths.add(m)
    for m in re.findall(r"static/media/[A-Za-z0-9_./~-]+\.woff2", text):
        paths.add("/_next/" + m)
    return sorted(paths)


def fetch(url_path: str) -> str:
    out = ROOT / url_path.lstrip("/").replace("/", os.sep)
    if out.exists() and out.stat().st_size > 0:
        return f"SKIP {url_path}"
    out.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(BASE + url_path, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            data = r.read()
        out.write_bytes(data)
        return f"OK {len(data):8d} {url_path}"
    except Exception as e:
        return f"FAIL {url_path} {e}"


def main() -> None:
    for round_n in range(1, 6):
        paths = collect(read_sources())
        missing = [p for p in paths if not (ROOT / p.lstrip("/").replace("/", os.sep)).exists()]
        print(f"round={round_n} referenced={len(paths)} missing={len(missing)}")
        if not missing:
            break
        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as ex:
            for line in ex.map(fetch, missing):
                print(line)


if __name__ == "__main__":
    main()
