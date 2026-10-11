import re
from html.parser import HTMLParser

html = open("index-source.html", "r", encoding="utf-8", errors="replace").read()
body_idx = html.lower().find("<body")
out = []
out.append(f"BODY AT {body_idx}\n")
chunk = html[body_idx:body_idx + 40000]
chunk = chunk.replace("><", ">\n<")
out.append(chunk)
open("_body_start.txt", "w", encoding="utf-8").write("".join(out))
print("wrote", body_idx)
