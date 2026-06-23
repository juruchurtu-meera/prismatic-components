export const mapModelValues = (values: string[], addEmptyValue = false) => {
  if (addEmptyValue) {
    return [
      {
        value: "",
        label: "Empty",
      },
      ...values.map((value) => {
        return {
          value,
          label: value,
        };
      }),
    ];
  }
  return values.map((value) => {
    return {
      value,
      label: value,
    };
  });
};
