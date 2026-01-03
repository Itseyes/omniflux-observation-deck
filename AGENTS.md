# AGENTS

## Purpose
This repository provides a read-only observability surface for OmniFlux. It is strictly for witnessing, analytics, and UI display—never for control or mutation.

## Repo Classification
**OBSERVER**

## Authority Boundary
- **MUST** only read from approved, immutable sources (event log, health endpoints)
- **MUST NOT** mutate, trigger, or replay any state
- **MUST NOT** expose credentials or secrets
- **MUST** enforce GET-only API routes

## Allowed Operations
- Fetch and display event, health, and graveyard data
- UI rendering and analytics
- Read-only API calls

## Forbidden Operations
- Any POST, PUT, PATCH, DELETE, or mutation
- Database writes or direct DB access
- Filesystem writes
- Background jobs, schedulers, or auto-remediation
- UI controls that change state

## Safe Commands
- `pnpm install`
- `pnpm run build`
- `pnpm run typecheck`
- `pnpm run dev`
- `pwsh scripts/read-only-check.ps1`

## Repo Map
- `src/` — Application code (read-only)
- `public/` — Static assets
- `docs/` — Documentation
- `scripts/` — Hygiene and enforcement scripts

## Change Policy
- All changes must preserve read-only boundary
- Any boundary violation must be rejected and escalated

## Escalation / Human-in-the-Loop Rule
- If any change could enable mutation or control, escalate to project lead for review
