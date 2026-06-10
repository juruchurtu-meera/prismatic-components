import { input, util } from "@prismatic-io/spectral";
import { connection, libraryId } from "./sharedInputs";
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, assets created since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, assets modified since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
export const pollLibraryAssetsInputs = {
  connection,
  libraryId,
  showNewRecords,
  showUpdatedRecords,
};
