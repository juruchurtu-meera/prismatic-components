import { getTableauClient } from "../../util";
import { action } from "@prismatic-io/spectral";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhook } from "../../util";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
export const deleteWebhookAction = action({
  display: {
    label: "Delete Webhook",
    description: "Delete the specified webhook.",
  },
  examplePayload: deleteWebhookExamplePayload,
  perform: async (
    context,
    { apiVersion, tableauConnection, timeout, webhookId },
  ) => {
    const client = await getTableauClient({
      tableauConnection,
      timeout,
      debug: context.debug.enabled,
      apiVersion,
    });
    const { data } = await deleteWebhook(client, webhookId);
    return {
      data,
    };
  },
  inputs: deleteWebhookInputs,
});
