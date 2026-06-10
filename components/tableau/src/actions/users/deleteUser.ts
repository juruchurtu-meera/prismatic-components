import { action, util } from "@prismatic-io/spectral";
import { getTableauClient } from "../../util";
import { deleteUserInputs } from "../../inputs";
import { deleteUserExamplePayload } from "../../examplePayloads";
export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Delete an existing user by ID.",
  },
  examplePayload: deleteUserExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.delete(`/users/${params.userId}`);
    return {
      data: response.data,
    };
  },
  inputs: deleteUserInputs,
});
