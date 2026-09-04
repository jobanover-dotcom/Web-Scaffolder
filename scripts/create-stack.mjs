#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const [, , id, kind = 'frontend', label] = process.argv
const kinds = new Set(['frontend', 'backend', 'data'])

if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
  throw new Error('Usage: npm run stack:new -- <id> [frontend|backend|data] [label]')
}
if (!kinds.has(kind)) throw new Error(`Unsupported stack kind: ${kind}`)

const displayLabel = label?.trim() || id
const root = process.cwd()
const playbookRoot = path.join(root, 'playbooks', 'stack')
const stackDir = path.join(playbookRoot, id)
const manifestPath = path.join(playbookRoot, `${id}.manifest.json`)
const adapterDir = path.join(root, 'lib', 'stacks', id)
const adapterPath = path.join(adapterDir, 'index.js')

for (const target of [manifestPath, adapterPath]) {
  try {
    await fs.access(target)
    throw new Error(`Refusing to overwrite existing file: ${path.relative(root, target)}`)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

const architectureProfiles = ['small', 'medium', 'large']
const manifest = {
  id,
  kind,
  label: displayLabel,
  architectureProfiles,
  playbooks: [`stack/${id}/architecture.md`, `stack/${id}/runtime.md`, `stack/${id}/security.md`, `stack/${id}/structure.md`, `stack/${id}/testing.md`],
  deps: [],
  devDeps: [],
  env: [],
  concerns: [],
}

const compatibleWith = kind === 'frontend'
  ? { backend: [] }
  : kind === 'backend'
    ? { frontend: [] }
    : {}

const adapter = `import { defineStackAdapter } from '../contract.js'\n\nexport const ${id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Adapter = defineStackAdapter({\n  id: '${id}',\n  kind: '${kind}',\n  label: '${displayLabel.replaceAll("'", "\\'")}',\n  compatibleWith: ${JSON.stringify(compatibleWith, null, 2)},\n  capabilities: {\n    applicationShapes: ['fullstack', 'separate', 'api', 'mobile'],\n    architectureProfiles: ${JSON.stringify(architectureProfiles)},\n    authenticationModels: [],\n  },\n  contributes: {},\n})\n`

const placeholders = {
  architecture: `# ${displayLabel} Architecture\n\nDescribe the supported architecture profiles and boundaries.\n`,
  runtime: `# ${displayLabel} Runtime\n\nDocument how generated projects run locally and in production.\n`,
  security: `# ${displayLabel} Security\n\nDocument secure defaults, secrets, and runtime security requirements.\n`,
  structure: `# ${displayLabel} Structure\n\nDocument the generated project structure and responsibilities.\n`,
  testing: `# ${displayLabel} Testing\n\nDocument unit, integration, and end-to-end testing expectations.\n`,
}

await fs.mkdir(stackDir, { recursive: true })
await fs.mkdir(adapterDir, { recursive: true })
await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
await fs.writeFile(adapterPath, adapter, 'utf8')
for (const [name, content] of Object.entries(placeholders)) {
  await fs.writeFile(path.join(stackDir, `${name}.md`), content, 'utf8')
}

console.log(`Created stack extension skeleton for ${displayLabel}.`)
console.log(`Manifest: ${path.relative(root, manifestPath)}`)
console.log(`Adapter:  ${path.relative(root, adapterPath)}`)
console.log('Next: register the adapter in lib/stacks/index.js, define compatibility entries, complete the playbooks, and add contract/behavior tests.')
