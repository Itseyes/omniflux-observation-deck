# Observation Deck Read-Only Covenant

This repository is an Observation Deck. It is glass, not a steering wheel.

## Non-Negotiables
- No write operations: no job triggers, no mutations, no admin actions.
- API routes are GET-only. Any non-GET must return 405.
- No direct database access (Supabase service role, Postgres clients, Prisma, SQL writes).
- No secrets in git. Track only env examples (e.g. .env.local.example).
- No UI controls that change state (no “save”, “run”, “execute”, “approve”, “delete”).
- Tokens/keys must never be exposed to the browser.

## Enforcement
Any change that violates these rules must be rejected.
