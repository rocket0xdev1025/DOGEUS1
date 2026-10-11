import re

html = open("index-source.html", "r", encoding="utf-8", errors="replace").read()
print("len", len(html))
print("newlines", html.count("\n"))
urls = set(re.findall(r'(?:href|src)="([^"]+)"', html))
for u in sorted(urls):
    print(u)
print("---COUNT", len(urls))
