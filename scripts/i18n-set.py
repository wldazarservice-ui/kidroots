# Ajoute ou remplace des cles de traduction dans src/i18n.js : python3 scripts/i18n-set.py fichier.json
# fichier.json = { "fr": { "cle": "texte" }, "en": {...}, ... }
import json, re, sys
p = 'src/i18n.js'
s = open(p, encoding='utf-8').read()
data = json.load(open(sys.argv[1], encoding='utf-8'))
for lang, kv in data.items():
    start = s.index(f"\n  {lang}: {{\n")
    end = s.index("\n  },", start)
    block = s[start:end]
    for k, v in kv.items():
        line = f"    {k}: {json.dumps(v, ensure_ascii=False)},"
        pat = re.compile(rf"^    {re.escape(k)}: .*,$", re.M)
        if pat.search(block):
            block = pat.sub(lambda m: line, block, count=1)
        else:
            block = block + "\n" + line
    s = s[:start] + block + s[end:]
open(p, 'w', encoding='utf-8').write(s)
print('ok')
