import type {
  DatabaseAdapter,
  DatabaseAdapterConstructor,
  DatabaseProvider,
} from "./database.types.js";

const registry = new Map<
  DatabaseProvider,
  DatabaseAdapterConstructor
>();

export function registerDatabase(
  provider: DatabaseProvider,
  adapter: DatabaseAdapterConstructor,
): void {
  if (registry.has(provider)) {
    throw new Error(`Provider already registered: ${provider}`);
  }

  registry.set(provider, adapter);
}

export function createDatabase(
  provider: DatabaseProvider,
): DatabaseAdapter {
  const Adapter = registry.get(provider);

  if (!Adapter) {
    throw new Error(`No adapter registered for: ${provider}`);
  }

  return new Adapter();
}