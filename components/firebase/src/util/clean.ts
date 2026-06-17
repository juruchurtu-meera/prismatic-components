import { type KeyValuePair, util } from "@prismatic-io/spectral";
export const keyValuePairsToObject = (values: unknown) =>
  util.types.keyValPairListToObject(values as KeyValuePair<unknown>[]);
export function validateJSON(json: unknown) {
  try {
    return JSON.parse(util.types.toString(json));
  } catch (_err) {
    throw new Error("Invalid JSON format.");
  }
}
