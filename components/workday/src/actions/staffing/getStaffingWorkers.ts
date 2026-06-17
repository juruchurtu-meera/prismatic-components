import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getStaffingWorkersExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { getStaffingWorkersInputs } from "../../inputs";
export const getStaffingWorkers = action({
  display: {
    label: "Get Staffing Workers",
    description:
      "Retrieves a collection of workers and current staffing information from the Staffing service.",
  },
  perform: async (context, { connection, params, fetchAll, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.staffing}/workers`,
      params,
      fetchAll,
      limit,
      offset,
    });
  },
  inputs: getStaffingWorkersInputs,
  examplePayload: getStaffingWorkersExamplePayload,
});
