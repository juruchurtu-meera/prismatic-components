import { getTableauClient } from "../../util";
import { action } from "@prismatic-io/spectral";
import { testWebhookInputs } from "../../inputs";
import { testWebhookExamplePayload } from "../../examplePayloads";
export const testWebhook = action({
  display: {
    label: "Test Webhook",
    description:
      "Test the specified webhook by sending an empty payload to its configured destination URL and returning the server response.",
  },
  examplePayload: testWebhookExamplePayload,
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
    const { data } = await client.get(`/webhooks/${webhookId}/test`);
    return {
      data,
    };
  },
  inputs: testWebhookInputs,
});
