import { action, util } from "@prismatic-io/spectral";
import { getTableauClient } from "../../util";
import { getProjectInputs } from "../../inputs";
import { getProjectExamplePayload } from "../../examplePayloads";
export const getProject = action({
  display: {
    label: "Get Project",
    description: "Retrieve an existing project by ID.",
  },
  examplePayload: getProjectExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get("/projects", {
      params: {
        filter: `name:eq:${params.projectName}`,
      },
    });
    return {
      data: response.data,
    };
  },
  inputs: getProjectInputs,
});
