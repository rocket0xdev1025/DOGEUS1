import urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

models = [
    "aquila.glb","brazier.glb","bust.glb","canine-caesar.glb","canine-legion.glb",
    "column.glb","golden-hound.glb","laurel-arch.glb","legionary.glb","rotunda.glb",
    "treasure.glb","victory.glb",
]
Path("models").mkdir(exist_ok=True)

def fetch(name):
    dest = Path("models") / name
    if dest.exists() and dest.stat().st_size > 1000:
        return name, "skip", dest.stat().st_size
    url = "https://dogeusmaximus.com/models/" + name
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = resp.read()
        dest.write_bytes(data)
        return name, "ok", len(data)
    except Exception as e:
        return name, f"FAIL {e}", 0

with ThreadPoolExecutor(max_workers=6) as ex:
    futs = [ex.submit(fetch, n) for n in models]
    for fut in as_completed(futs):
        name, status, size = fut.result()
        print(status, name, size, flush=True)
