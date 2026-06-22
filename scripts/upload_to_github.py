import base64, json, os, sys, requests

TOKEN = "gho_vDp41B78EDqojBPW5UAvC3IfHF99Cq3sLRQj"
OWNER = "wli426220-sys"
REPO = "nx-cd-marketplace"
BRANCH = "codex/nxcd-marketplace-mvp"
API = "https://api.github.com"
HEADERS = {
    "Authorization": f"token {TOKEN}",
    "Accept": "application/vnd.github.v3+json",
}

# Files to upload (path in repo -> local path)
FILES = [
    "requirements.txt",
    "scripts/screener.py",
    "package.json",
    "next.config.js",
    "tsconfig.json",
    "tailwind.config.ts",
    "postcss.config.js",
    "vitest.config.ts",
    "wrangler.toml",
    ".eslintrc.json",
    ".gitignore",
    ".env.example",
    "AGENTS.md",
    "README.md",
    "src/types/index.ts",
    "src/data/scan-results.json",
]

for f in FILES:
    if not os.path.exists(f):
        print(f"SKIP {f} (not found)")
        continue
    with open(f, "rb") as fh:
        content = base64.b64encode(fh.read()).decode()
    payload = {"message": f"Add {f}", "content": content, "branch": BRANCH}
    r = requests.put(
        f"{API}/repos/{OWNER}/{REPO}/contents/{f}", headers=HEADERS, json=payload
    )
    if r.status_code in (200, 201):
        print(f"OK   {f}")
    else:
        data = r.json()
        print(f"FAIL {f}: {data.get('message', r.status_code)}")
