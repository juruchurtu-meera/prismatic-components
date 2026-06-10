import { util } from "@prismatic-io/spectral";
export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const toOptionalBool = (value: unknown) =>
  value === undefined || value === null || value === ""
    ? undefined
    : util.types.toBool(value);
export const asStringArray = (value: unknown) => value as string[];
