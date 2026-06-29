import { action, util } from "@prismatic-io/spectral";
import { getTableauClient } from "../../util";
import { listUsersInputs } from "../../inputs";
import { listUsersExamplePayload } from "../../examplePayloads";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "Retrieve a list of users from a Tableau site.",
  },
  examplePayload: listUsersExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get("/users", {
      params: {
        pageSize: util.types.toNumber(params.pageSize) || undefined,
        pageNumber: util.types.toNumber(params.pageNumber) || undefined,
      },
    });
    return {
      data: response.data,
    };
  },
  inputs: listUsersInputs,
});
