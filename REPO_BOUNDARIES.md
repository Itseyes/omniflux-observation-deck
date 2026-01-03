# REPO BOUNDARIES

## Classification
OBSERVER — This repository is strictly read-only. No mutation, no control, no privileged operations.

## Authority Boundary
- Only fetches and displays data from immutable sources
- No write operations, no job triggers, no admin actions
- No direct database access
- No secrets in git

## Enforcement
- API routes are GET-only
- UI is display-only
- Any violation must be rejected and reported
