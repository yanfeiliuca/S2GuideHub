param(
  [string]$RepoRoot,
  [string]$SiteUrl = "https://www.s2guidehub.com",
  [string]$SitemapPath,
  [string]$KeyFile = "indexnow-key.txt",
  [string]$Endpoint = "https://api.indexnow.org/indexnow",
  [string[]]$Urls,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

if (-not $RepoRoot) {
  $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

if (-not $SitemapPath) {
  $SitemapPath = Join-Path $RepoRoot "sitemap.xml"
}

$keyPath = Join-Path $RepoRoot $KeyFile
if (-not (Test-Path -LiteralPath $keyPath)) {
  throw "IndexNow key file not found: $keyPath"
}

$key = (Get-Content -LiteralPath $keyPath -Raw -Encoding UTF8).Trim()
if ($key -notmatch "^[A-Za-z0-9-]{8,128}$") {
  throw "IndexNow key must be 8-128 characters and contain only letters, numbers, or dashes."
}

if (-not $Urls -or $Urls.Count -eq 0) {
  if (-not (Test-Path -LiteralPath $SitemapPath)) {
    throw "Sitemap not found: $SitemapPath"
  }

  [xml]$sitemap = Get-Content -LiteralPath $SitemapPath -Raw -Encoding UTF8
  $namespace = New-Object System.Xml.XmlNamespaceManager($sitemap.NameTable)
  $namespace.AddNamespace("sm", "http://www.sitemaps.org/schemas/sitemap/0.9")
  $Urls = $sitemap.SelectNodes("//sm:url/sm:loc", $namespace) | ForEach-Object { $_.InnerText.Trim() }
}

$Urls = $Urls | Where-Object { $_ } | Sort-Object -Unique
if ($Urls.Count -eq 0) {
  throw "No URLs to submit."
}

if ($Urls.Count -gt 10000) {
  throw "IndexNow accepts up to 10,000 URLs per request. Current count: $($Urls.Count)"
}

$siteUri = [Uri]$SiteUrl
$keyLocation = $SiteUrl.TrimEnd("/") + "/" + $KeyFile

$body = [ordered]@{
  host = $siteUri.Host
  key = $key
  keyLocation = $keyLocation
  urlList = @($Urls)
}

$json = $body | ConvertTo-Json -Depth 4

Write-Host "IndexNow endpoint: $Endpoint"
Write-Host "Host: $($siteUri.Host)"
Write-Host "Key location: $keyLocation"
Write-Host "URL count: $($Urls.Count)"

if ($DryRun) {
  Write-Host "Dry run only. No request sent."
  $Urls | ForEach-Object { Write-Host " - $_" }
  exit 0
}

try {
  $response = Invoke-WebRequest -Uri $Endpoint -Method Post -ContentType "application/json; charset=utf-8" -Body $json -UseBasicParsing
  Write-Host "IndexNow status: $($response.StatusCode) $($response.StatusDescription)"
}
catch {
  if ($_.Exception.Response) {
    $statusCode = [int]$_.Exception.Response.StatusCode
    $statusDescription = $_.Exception.Response.StatusDescription
    throw "IndexNow request failed: $statusCode $statusDescription"
  }

  throw
}