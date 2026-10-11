from pathlib import Path
needle = "dogeus_maximus.sys"
for p in Path("_next/static/chunks").glob("*.js"):
    text = p.read_text(encoding="utf-8", errors="replace")
    i = text.find(needle)
    if i >= 0:
        Path("_boot_snip.txt").write_text(text[max(0,i-500):i+2500], encoding="utf-8")
        print("FILE", p.name, "at", i, "wrote snip")
