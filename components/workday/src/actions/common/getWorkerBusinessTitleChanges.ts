import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkerBusinessTitleChangesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { getWorkerBusinessTitleChangesInputs } from "../../inputs";
export const getWorkerBusinessTitleChanges = action({
  display: {
    label: "Get Worker Business Title Changes",
    description:
      "Retrieves a collection of business title changes for the specified worker.",
  },
  perform: async (
    context,
    { connection, workerId, fetchAll, limit, offset },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.common}/workers/${workerId}/businessTitleChanges`,
      fetchAll,
      limit,
      offset,
    });
  },
  inputs: getWorkerBusinessTitleChangesInputs,
  examplePayload: getWorkerBusinessTitleChangesExamplePayload,
});
