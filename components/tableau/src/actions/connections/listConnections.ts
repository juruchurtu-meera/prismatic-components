import { action, util } from "@prismatic-io/spectral";
import { getTableauClient } from "../../util";
import { listConnectionsInputs } from "../../inputs";
import { listConnectionsExamplePayload } from "../../examplePayloads";
export const listConnections = action({
  display: {
    label: "List Connections",
    description: "Retrieve a list of connections from a Tableau workbook.",
  },
  examplePayload: listConnectionsExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(
      `/workbooks/${params.workbookId}/connections/`,
      {
        params: {
          pageSize: util.types.toNumber(params.pageSize) || undefined,
          pageNumber: util.types.toNumber(params.pageNumber) || undefined,
        },
      },
    );
    return {
      data: response.data,
    };
  },
  inputs: listConnectionsInputs,
});
