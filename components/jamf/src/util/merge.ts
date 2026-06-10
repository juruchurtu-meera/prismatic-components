export const mergeDefined = <T extends object>(
  existing: T,
  overrides: Record<string, unknown>,
): T =>
  ({
    ...existing,
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, value]) => value !== undefined),
    ),
  }) as T;
