import re
from pathlib import Path
html = Path("index-source.html").read_text(encoding="utf-8", errors="replace")
print("next_f", html.count("__next_f"))
print("self.__next", "__next_f" in html)
# script types
print("script types", set(re.findall(r'<script[^>]*type="([^"]+)"', html)))
print("inline scripts", html.count("<script"))

# find interesting strings in js
needles = ["dexscreener", "geckoterminal", "coingecko", "/api/", "holders", "marketCap", "wss://", "supabase", "firebase"]
for p in Path("_next/static/chunks").glob("*.js"):
    text = p.read_text(encoding="utf-8", errors="replace")
    hits = []
    for n in needles:
        if n.lower() in text.lower():
            hits.append(n)
    urls = set(re.findall(r'https://[a-zA-Z0-9._~:/?#\[\]@!$&\'()*+,;=%-]+', text))
    interesting = [u for u in urls if not any(x in u for x in ["w3.org", "nextjs.org", "vercel.live", "reactjs"])]
    if hits or interesting:
        print("\nFILE", p.name, "size", p.stat().st_size)
        print(" hits", hits)
        for u in sorted(interesting)[:40]:
            print(" ", u[:180])
