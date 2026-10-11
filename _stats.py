import re
html = open("index-source.html", encoding="utf-8", errors="replace").read()
print("opacity:0 count", html.count("opacity:0"))
print("opacity:1 count", html.count("opacity:1"))
print("translateY count", html.count("translateY"))
print("len", len(html))
# sample style attributes containing opacity
styles = re.findall(r'style="([^"]*opacity:0[^"]*)"', html)
print("style opacity0", len(styles))
from collections import Counter
c = Counter(styles)
for s, n in c.most_common(25):
    print(n, s[:220])
