import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkerServiceDatesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { getWorkerServiceDatesInputs } from "../../inputs";
export const getWorkerServiceDates = action({
  display: {
    label: "Get Worker Service Dates",
    description:
      "Retrieves a collection of service dates (hire date, continuous service date, etc.) for the specified worker ID.",
  },
  perform: async (
    context,
    { connection, workerId, fetchAll, limit, offset },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.staffing}/workers/${workerId}/serviceDates`,
      fetchAll,
      limit,
      offset,
    });
  },
  inputs: getWorkerServiceDatesInputs,
  examplePayload: getWorkerServiceDatesExamplePayload,
});
