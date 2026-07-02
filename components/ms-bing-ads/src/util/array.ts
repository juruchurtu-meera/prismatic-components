export const toArray = <T>(responseItem: T | T[]): T[] =>
  Array.isArray(responseItem)
    ? responseItem
    : responseItem
      ? [responseItem]
      : [];
