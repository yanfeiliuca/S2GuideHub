param(
  [Parameter(Mandatory = $true)][string]$Message,
  [string]$RepoRoot,
  [string]$SiteUrl = "https://www.s2guidehub.com",
  [int]$DeployWaitSeconds = 90,
  [switch]$SkipPush,
  [switch]$SkipIndexNow,
  [switch]$DryRunIndexNow
)

$ErrorActionPreference = "Stop"

if (-not $RepoRoot) {
  $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

Write-Host "Repo: $RepoRoot"
Write-Host "Updating sitemap..."
& (Join-Path $PSScriptRoot "update-sitemap.ps1") -RepoRoot $RepoRoot -SiteUrl $SiteUrl

$status = & git -C $RepoRoot status --porcelain
if (-not $status) {
  Write-Host "No local changes to commit."
}
else {
  Write-Host "Staging changes..."
  & git -C $RepoRoot add .

  Write-Host "Committing changes..."
  & git -C $RepoRoot commit -m $Message
}

if ($SkipPush) {
  Write-Host "Skipping git push."
}
else {
  Write-Host "Pushing to GitHub..."
  & git -C $RepoRoot push
}

if ($SkipIndexNow) {
  Write-Host "Skipping IndexNow submission."
  exit 0
}

if (-not $SkipPush -and $DeployWaitSeconds -gt 0) {
  Write-Host "Waiting $DeployWaitSeconds seconds for Cloudflare Pages deployment before IndexNow..."
  Start-Sleep -Seconds $DeployWaitSeconds
}

Write-Host "Submitting sitemap URLs to IndexNow..."
& (Join-Path $PSScriptRoot "submit-indexnow.ps1") -RepoRoot $RepoRoot -SiteUrl $SiteUrl -DryRun:$DryRunIndexNow