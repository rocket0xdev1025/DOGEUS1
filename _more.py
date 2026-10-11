import re
from pathlib import Path
exts = (".hdr", ".mp3", ".mp4", ".webm", ".ogg", ".wav", ".ktx2", ".bin", ".wasm", ".json", ".glb", ".gltf", ".exr", ".hdr")
found = set()
for p in Path("_next").rglob("*.js"):
    text = p.read_text(encoding="utf-8", errors="replace")
    found |= set(re.findall(r'/[A-Za-z0-9_~./-]+\.(?:hdr|mp3|mp4|webm|ogg|wav|ktx2|bin|wasm|json|glb|gltf|exr|avif|webp)', text))
for f in sorted(found):
    if "node_modules" in f or f.startswith("/_next"):
        continue
    print(f)
print("---", len(found))
