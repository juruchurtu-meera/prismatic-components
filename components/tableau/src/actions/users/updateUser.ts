import { action, util } from "@prismatic-io/spectral";
import { getTableauClient } from "../../util";
import { updateUserInputs } from "../../inputs";
import { updateUserExamplePayload } from "../../examplePayloads";
export const updateUser = action({
  display: {
    label: "Update User",
    description: "Update the information and metadata of an existing user.",
  },
  examplePayload: updateUserExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = client.put(`/users/${params.userId}`, {
      user: {
        name: params.username,
        siteRole: params.siteRole,
        authSetting: params.authSetting,
      },
    });
    return {
      data: (await response).data,
    };
  },
  inputs: updateUserInputs,
});
