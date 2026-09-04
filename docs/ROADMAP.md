# Web-Scaffolder Progressive Upgrade Roadmap

## Vision

Web-Scaffolder should evolve from a project generator into a **stack-aware development foundation**: predictable scaffolding, explainable architecture choices, safer defaults, reproducible versions, and a clean upgrade path for generated projects.

## Upgrade pillars

### 1. Developer experience (DX) of Web-Scaffolder
- Make the scaffolder interview clearer and progressive: ask only questions that affect the selected stack.
- Add a non-interactive configuration path for CI and repeatable generation.
- Provide dry-run/preview output before writing files.
- Improve diagnostics with actionable remediation instead of raw errors.
- Make adding a new technology stack a repeatable extension workflow.

### 2. Modern generated foundations
- Keep generated projects strict by default.
- Prefer current stable runtime/tooling profiles through the compatibility catalog.
- Generate health/readiness checks where a backend exists.
- Generate security-conscious defaults without pretending that scaffolding replaces application security review.

### 3. Agent-native projects
- Keep `AGENTS.md` small and always-loaded.
- Keep detailed guidance in task-specific playbooks.
- Generate a machine-readable project profile so coding agents can understand stack, architecture, auth intent, and compatibility profile without scanning the whole repository.
- Add validation that generated agent documentation matches the selected manifest.

### 4. Reproducibility and upgrades
- Treat compatibility profiles as immutable snapshots.
- Add explicit profile selection and migration documentation.
- Add generated-output contract tests for every supported pairing.
- Make dependency/version changes reviewable independently from scaffolding logic.

### 5. Generated application UX (UX) — separate from scaffolder DX
- Treat UX as a property of the **generated application**, not the Web-Scaffolder CLI.
- Generate accessible, responsive foundations where the selected frontend supports them.
- Provide consistent loading, error, empty, and form-validation states.
- Keep authentication UX and security architecture aligned without mixing them into the scaffolder's developer workflow.
- Add stack-specific UI guidance through generated playbooks rather than CLI concerns.

### 6. Quality and security
- Fail closed when required configuration is missing.
- Avoid shell-string interpolation when invoking external tools.
- Validate generated paths and refuse unsafe destinations.
- Keep CI permissions minimal and dependency installation deterministic.
- Add regression tests for every bug discovered in the generator.

## Suggested next phases

### Phase A — Foundation
- Add CLI command/config separation.
- Add `--dry-run` and structured diagnostics.
- Add a stable generated project metadata file.
- Expand contract tests around manifests and compatibility profiles.

### Phase B — Progressive generation
- Make interview questions conditional on prior answers.
- Add stack capability discovery and conflict explanations.
- Add preview of files, dependencies, scripts, and environment variables.
- Keep generated application UX requirements separate from CLI DX requirements.

### Phase C — Upgrade engine
- Add `doctor` checks for generated projects.
- Add a generator version in generated metadata.
- Add migration checks between compatibility profiles.
- Provide a safe upgrade report before changing a generated project.

### Phase D — Ecosystem
- Add additional stack manifests without duplicating scaffolding logic.
- Add extension points for concerns and playbooks.
- Provide a stack-extension generator and stable adapter contract.
- Publish stable machine-readable schemas for manifests and generated metadata.

## Definition of done

A progressive release should remain backward-compatible where practical, have deterministic generated output, pass the complete contract matrix, document user-visible behavior, and include a migration path whenever generated structure or dependency versions change.
