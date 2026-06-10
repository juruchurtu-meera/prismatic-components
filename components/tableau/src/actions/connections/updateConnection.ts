import { action, util } from "@prismatic-io/spectral";
import { getTableauClient } from "../../util";
import { updateConnectionInputs } from "../../inputs";
import { updateConnectionExamplePayload } from "../../examplePayloads";
export const updateConnection = action({
  display: {
    label: "Update Connection",
    description:
      "Update the information and metadata of an existing connection by ID.",
  },
  examplePayload: updateConnectionExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.put(
      `/workbooks/${params.workbookId}/connections/${params.connectionId}`,
      {
        connection: {
          serverAddress: params.serverAddress || undefined,
          serverPort: params.serverPort || undefined,
          userName: params.connectionUsername || undefined,
          password: params.connectionPassword || undefined,
          embedPassword: params.embedPassword || undefined,
          queryTaggingEnabled: params.queryTaggingEnabled || undefined,
        },
      },
    );
    return {
      data: response.data,
    };
  },
  inputs: updateConnectionInputs,
});
