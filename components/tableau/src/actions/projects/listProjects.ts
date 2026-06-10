import { action, util } from "@prismatic-io/spectral";
import { getTableauClient } from "../../util";
import { listProjectsInputs } from "../../inputs";
import { listProjectsExamplePayload } from "../../examplePayloads";
export const listProjects = action({
  display: {
    label: "List Projects",
    description: "Retrieve a list of projects from a Tableau site.",
  },
  examplePayload: listProjectsExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get("/projects", {
      params: {
        pageSize: util.types.toNumber(params.pageSize) || undefined,
        pageNumber: util.types.toNumber(params.pageNumber) || undefined,
      },
    });
    return {
      data: response.data,
    };
  },
  inputs: listProjectsInputs,
});
