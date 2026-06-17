import { util } from "@prismatic-io/spectral";
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const toOptionalObject = (value: unknown): object | undefined =>
  value ? util.types.toObject(value) : undefined;
export const toOptionalBoolean = (value: unknown): boolean | undefined => {
  const str = util.types.toString(value);
  return str === "" ? undefined : util.types.toBool(value);
};
export const toStringArray = (value: unknown): string[] | undefined =>
  Array.isArray(value) && value.length > 0
    ? (value as unknown[]).map((v) => util.types.toString(v))
    : undefined;
export const toNumberArray = (value: unknown): number[] | undefined =>
  Array.isArray(value) && value.length > 0
    ? (value as unknown[]).map((v) => util.types.toNumber(v))
    : undefined;
