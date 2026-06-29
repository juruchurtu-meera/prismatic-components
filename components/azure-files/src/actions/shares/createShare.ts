import type { ShareCreateResponse } from "@azure/storage-file-share";
import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { createShareInputs } from "../../inputs";
import { createShareExamplePayload } from "../../examplePayloads";
export const createShare = action({
  display: {
    label: "Create Share",
    description: "Create a file share.",
  },
  perform: async (context, { shareName, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const { shareCreateResponse } = await client.createShare(shareName);
    return {
      data: shareCreateResponse as Omit<ShareCreateResponse, "_response">,
    };
  },
  inputs: createShareInputs,
  examplePayload: createShareExamplePayload,
});
