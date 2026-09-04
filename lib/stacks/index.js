import { createStackRegistry } from './registry.js'
import { laravelAdapter } from './laravel/index.js'

// This is the only place built-in stack adapters are assembled. Entries stay
// explicit so adding a source file never silently changes supported behavior.
export const stackRegistry = createStackRegistry([
  laravelAdapter,
])

/**
 * Register an additional stack adapter at runtime.
 *
 * This is intentionally a thin public boundary: validation and duplicate-id
 * protection remain inside the registry/adapter contract. Future CLI or
 * package-extension tooling can build on this without changing the generator.
 */
export function registerStackAdapter(adapter) {
  return stackRegistry.register(adapter)
}
