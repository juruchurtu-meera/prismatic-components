export const mapModel = (values: string[]) =>
  values.map((value) => ({
    value,
    label: value,
  }));
