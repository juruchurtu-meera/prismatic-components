import { showNewRecords, showUpdatedRecords } from "../v1/triggers";
import { connectionInput } from "./common";
export const pollChangesV3Inputs = {
  connection: connectionInput,
  showNewRecords,
  showUpdatedRecords,
};
