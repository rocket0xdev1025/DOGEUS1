import re
html = open("index-source.html", "r", encoding="utf-8", errors="replace").read()
# section ids and headings
ids = re.findall(r'id="([^"]+)"', html)
print("IDS:")
for i in ids:
    print(" ", i)
print("--- H1-H3 ---")
for m in re.finditer(r"<h([1-3])[^>]*>(.*?)</h\1>", html):
    text = re.sub(r"<[^>]+>", "", m.group(2))
    text = re.sub(r"\s+", " ", text).strip()
    if text:
        print(f"h{m.group(1)}: {text[:180]}")
