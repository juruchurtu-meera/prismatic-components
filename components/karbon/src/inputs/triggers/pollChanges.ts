import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../../utils";
import { connection } from "../shared";
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  default: "Contacts",
  model: pollResourceModel,
  comments: "The type of Karbon resource to poll for updated records.",
  clean: util.types.toString,
});
export default {
  connection,
  pollResourceType,
};
