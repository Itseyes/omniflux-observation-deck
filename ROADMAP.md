# ROADMAP

- Maintain strict read-only boundary: no commands, no mutations, no privileged credentials.
- Enhance observability: richer event and audit log views.
- Improve data source documentation and transparency.
- Harden type safety for all event payloads (prefer `unknown` over `any`).
- Streamline local/dev deployment and onboarding docs.

## We will NOT do
- Add mutation or control features
- Expose privileged credentials
- Allow direct DB or filesystem writes
- Add background jobs or schedulers
- Enable any form of auto-remediation
