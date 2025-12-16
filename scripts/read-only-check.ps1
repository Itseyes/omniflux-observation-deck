$ErrorActionPreference = "Stop"

Write-Host "[deck] read-only check..."

# Fail if any tracked env files exist (examples allowed)
$trackedEnv = git ls-files | Select-String -Pattern "\.env" | ForEach-Object { $_.Line }
if ($trackedEnv) {
  $bad = $trackedEnv | Where-Object { $_ -notmatch "\.example$" }
  if ($bad) {
    Write-Error "Tracked env files found (not allowed):`n$($bad -join "`n")"
  }
}

# Fail if any non-GET handlers appear in API routes
# Note: git grep returns exit code 1 if no matches found, which is good here.
# We use try/catch or ignore exit code to capture output.
$apiHits = try { git grep -nE "export\s+async\s+function\s+(POST|PUT|PATCH|DELETE)" -- "src/app/api" 2>$null } catch {}
if ($LASTEXITCODE -eq 0 -and $apiHits) { Write-Error "Non-GET route handlers found:`n$apiHits" }

# Fail on obvious DB client usage
$dbHits = try { git grep -nE "supabase|prisma|pg_|postgres|INSERT|UPDATE|DELETE" -- "src" 2>$null } catch {}
if ($LASTEXITCODE -eq 0 -and $dbHits) { Write-Error "Direct DB usage detected:`n$dbHits" }

Write-Host "[deck] read-only check PASSED"
