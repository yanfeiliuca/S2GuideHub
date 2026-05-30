param(
  [string]$RepoRoot,
  [string]$SiteUrl = "https://www.s2guidehub.com",
  [string]$OutputPath
)

$ErrorActionPreference = "Stop"

if (-not $RepoRoot) {
  $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

if (-not $OutputPath) {
  $OutputPath = Join-Path $RepoRoot "sitemap.xml"
}

$SiteUrl = $SiteUrl.TrimEnd("/")
$today = (Get-Date).ToString("yyyy-MM-dd")

function Convert-HtmlPathToUrlPath {
  param([string]$RelativePath)

  $path = ($RelativePath -replace "\\", "/")
  if ($path -eq "index.html") {
    return "/"
  }

  if ($path.EndsWith("/index.html")) {
    return "/" + $path.Substring(0, $path.Length - "/index.html".Length)
  }

  return "/" + ($path -replace "\.html$", "")
}

function Get-UrlMeta {
  param([string]$UrlPath)

  if ($UrlPath -eq "/") {
    return @{ priority = "1.0"; changefreq = "weekly"; order = 0 }
  }

  if ($UrlPath.StartsWith("/unlocks/")) {
    return @{ priority = "0.8"; changefreq = "weekly"; order = 10 }
  }

  if ($UrlPath.StartsWith("/blog/")) {
    return @{ priority = "0.7"; changefreq = "weekly"; order = 20 }
  }

  if ($UrlPath -in @("/about", "/contact")) {
    return @{ priority = "0.5"; changefreq = "monthly"; order = 30 }
  }

  if ($UrlPath -eq "/privacy") {
    return @{ priority = "0.4"; changefreq = "yearly"; order = 40 }
  }

  return @{ priority = "0.6"; changefreq = "weekly"; order = 25 }
}

function Get-LastModifiedDate {
  param(
    [string]$RepoRoot,
    [string]$RelativePath,
    [System.IO.FileInfo]$File
  )

  $status = & git -C $RepoRoot status --porcelain -- $RelativePath 2>$null
  if ($LASTEXITCODE -eq 0 -and $status) {
    return $today
  }

  $gitDate = & git -C $RepoRoot log -1 --format=%cs -- $RelativePath 2>$null
  if ($LASTEXITCODE -eq 0 -and $gitDate) {
    return ($gitDate | Select-Object -First 1).Trim()
  }

  return $File.LastWriteTime.ToString("yyyy-MM-dd")
}

$htmlFiles = Get-ChildItem -LiteralPath $RepoRoot -Recurse -Filter "*.html" -File |
  Where-Object {
    $_.FullName -notmatch "[\\/]\.git[\\/]" -and
    $_.FullName -notmatch "[\\/]\.edge-" -and
    $_.Name -notmatch "^404\.html$"
  }

$entries = foreach ($file in $htmlFiles) {
  $relative = $file.FullName.Substring($RepoRoot.Length).TrimStart("\", "/") -replace "\\", "/"
  $urlPath = Convert-HtmlPathToUrlPath -RelativePath $relative
  $meta = Get-UrlMeta -UrlPath $urlPath

  [pscustomobject]@{
    UrlPath = $urlPath
    Loc = "$SiteUrl$urlPath"
    LastMod = Get-LastModifiedDate -RepoRoot $RepoRoot -RelativePath $relative -File $file
    ChangeFreq = $meta.changefreq
    Priority = $meta.priority
    Order = $meta.order
  }
}

$entries = $entries | Sort-Object Order, UrlPath

$settings = New-Object System.Xml.XmlWriterSettings
$settings.Encoding = New-Object System.Text.UTF8Encoding($false)
$settings.Indent = $true
$settings.NewLineChars = "`n"

$writer = [System.Xml.XmlWriter]::Create($OutputPath, $settings)
try {
  $writer.WriteStartDocument()
  $writer.WriteStartElement("urlset", "http://www.sitemaps.org/schemas/sitemap/0.9")

  foreach ($entry in $entries) {
    $writer.WriteStartElement("url")
    $writer.WriteElementString("loc", $entry.Loc)
    $writer.WriteElementString("lastmod", $entry.LastMod)
    $writer.WriteElementString("changefreq", $entry.ChangeFreq)
    $writer.WriteElementString("priority", $entry.Priority)
    $writer.WriteEndElement()
  }

  $writer.WriteEndElement()
  $writer.WriteEndDocument()
}
finally {
  $writer.Close()
}

Write-Host "Updated sitemap: $OutputPath"
Write-Host "URL count: $($entries.Count)"