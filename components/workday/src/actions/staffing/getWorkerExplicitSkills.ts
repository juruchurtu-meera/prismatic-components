import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkerExplicitSkillsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { getWorkerExplicitSkillsInputs } from "../../inputs";
export const getWorkerExplicitSkills = action({
  display: {
    label: "Get Worker Explicit Skills",
    description:
      "Retrieves explicit skills for the specified worker ID. Supports optional filtering by skill name or skill source.",
  },
  perform: async (
    context,
    { connection, workerId, params, fetchAll, limit, offset },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.staffing}/workers/${workerId}/explicitSkills`,
      params,
      fetchAll,
      limit,
      offset,
    });
  },
  inputs: getWorkerExplicitSkillsInputs,
  examplePayload: getWorkerExplicitSkillsExamplePayload,
});
