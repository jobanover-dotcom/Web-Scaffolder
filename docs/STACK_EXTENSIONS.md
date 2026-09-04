# Stack Extensions

Web Scaffolding is designed so new technology options can be added without rewriting the core generator.

## Extension model

A stack is represented by two layers:

1. **Manifest** — declares what the stack is, what it supports, its dependencies, environment variables, playbooks, templates, and compatibility metadata.
2. **Adapter** — optional executable behavior for stacks that need framework-specific generation beyond manifest-driven output.

The core orchestration owns side effects. Stack adapters describe capabilities and contributions; they should not directly install packages or write arbitrary files.

## Adding a new stack

For a new frontend/backend technology, add:

```text
playbooks/stack/<id>.manifest.json
playbooks/stack/<id>/
  architecture.md
  runtime.md
  security.md
  structure.md
  testing.md
```

Then add its package versions to `compatibility/profiles.json`. Dependency versions must remain in compatibility profiles rather than manifests.

If the stack requires executable framework-specific generation, add an adapter under:

```text
lib/stacks/<id>/index.js
```

using `defineStackAdapter()` from `lib/stacks/contract.js` and register it in `lib/stacks/index.js`.

## Adapter contract

The stable adapter boundary provides:

- `id` — lowercase kebab-case identifier
- `kind` — `frontend`, `backend`, or `data`
- `label` — human-readable name
- `compatibleWith` — explicit compatibility constraints
- `capabilities` — supported application shapes, architecture profiles, authentication models, and stack-specific capabilities
- `contributes` — optional hooks for prompts, authentication, files, environment, installation, Docker, CI, and verification

Use `defineStackAdapter()` so malformed definitions fail immediately.

## Design rules

- Prefer manifests and playbooks over hardcoded stack checks.
- Keep dependency versions centralized in compatibility profiles.
- Keep user-facing application UX separate from developer experience of the scaffolder.
- Do not make a new stack silently available: register it explicitly and add contract/behavior tests.
- Add CI coverage for the new stack before considering it production-ready.

## Future direction

The next extension-system phase can add a generated stack template and a `stack add` workflow that creates the manifest, adapter skeleton, playbooks, compatibility entries, and tests together. The goal is to make adding a new stack a repeatable contribution workflow rather than a collection of manual edits.
