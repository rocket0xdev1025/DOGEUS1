from pathlib import Path
import re

files = [
    Path(r"C:\Users\Tony\Downloads\Sol\Dogeus\_next\static\chunks\0uamy1~2wxupa.js"),
    Path(r"C:\Users\Tony\Downloads\Sol\Dogeus\_next\static\chunks\08ytni0gsalw..js"),
]
out = []
for p in files:
    t = p.read_text(encoding="utf-8", errors="ignore")
    out.append(f"\n==== {p.name}\n")
    for m in re.finditer(r"0x[a-fA-F0-9]{8,}", t):
        out.append(f"addr {m.start()} {m.group(0)[:20]}... {t[max(0,m.start()-80):m.end()+80]}\n\n")
    for k in ["geckoterminal", "dexscreener.com/latest", "api.dexscreener", "moralis", "coingecko", "priceUsd", "holders", "marketCap", "CONTRACT", "tokenAddress", "EthIcon", "symbol:\"ETH\"", 'children:"ETH"', "You pay", "Ethereum Mainnet", "Swap ETH", "I Am Ethereum", "ETH ETH", "Eyes On Ethereum"]:
        i = 0
        c = 0
        while c < 2:
            j = t.find(k, i)
            if j < 0:
                break
            out.append(f"--- {k} @{j}\n{t[max(0,j-90):j+160]}\n\n")
            i = j + len(k)
            c += 1
Path(r"C:\Users\Tony\Downloads\Sol\Dogeus\_extract_out.txt").write_text("".join(out), encoding="utf-8")
print("ok", len(out))
