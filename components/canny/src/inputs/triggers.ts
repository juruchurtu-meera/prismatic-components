import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";
export const webhookInputs = { connection };
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, posts created since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, posts whose status changed since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
export const pollPostsInputs = {
  connection,
  showNewRecords,
  showUpdatedRecords,
};
