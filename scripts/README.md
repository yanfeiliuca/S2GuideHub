# Publishing Scripts

These scripts keep the static S2GuideHub site easier to publish.

Windows may block direct `.ps1` execution. Use `powershell -NoProfile -ExecutionPolicy Bypass -File ...` from the repository root.

## Update sitemap only

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\update-sitemap.ps1"
```

This scans all public `.html` files and rewrites `sitemap.xml` with clean URLs.

## Test IndexNow without sending

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\submit-indexnow.ps1" -DryRun
```

## Submit sitemap URLs to IndexNow

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\submit-indexnow.ps1"
```

The script reads `sitemap.xml`, reads `indexnow-key.txt`, and sends the URLs to the IndexNow endpoint.

## One-step publish helper

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\publish.ps1" -Message "Update guide pages"
```

This updates the sitemap, commits, pushes to GitHub, waits briefly for Cloudflare Pages, and submits the sitemap URLs to IndexNow.

## Safer first run

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\publish.ps1" -Message "Update guide pages" -DryRunIndexNow
```

Google Search Console note: Google has deprecated unauthenticated sitemap ping. Keep `sitemap.xml` submitted in GSC and keep `lastmod` accurate. Use the Search Console API later only if OAuth setup becomes worth the extra complexity.