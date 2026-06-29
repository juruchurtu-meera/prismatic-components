import {
  type ActionContext,
  type TriggerPayload,
  trigger,
} from "@prismatic-io/spectral";
import { getTableauClient } from "../util";
import {
  deleteWebhooksInstance,
  createWebhookSubscriptions,
  getEventInfo,
} from "../util";
import tableauEvents from "../tableauEvents.json";
import type { TableauTriggerPayload } from "../types";
import { tableauTriggerInputs } from "../inputs";
import { tableauWebhookExamplePayload } from "../examplePayloads";
const performFunction = async (
  context: ActionContext,
  payload: TriggerPayload,
  { connectionInput, apiVersion, timeout },
): Promise<{
  payload: TriggerPayload;
}> => {
  const data = payload.body.data as TableauTriggerPayload;
  const filteredEvents = tableauEvents.filter(
    (event) => event.apiEventName === data.event_type,
  );
  if (filteredEvents.length === 0) {
    throw new Error(
      `Event ${data.event_type} is not supported by this trigger.`,
    );
  }
  const client = await getTableauClient({
    tableauConnection: connectionInput,
    timeout,
    debug: context.debug.enabled,
    apiVersion,
  });
  const eventInfo = await getEventInfo(client, data);
  payload.body.data = eventInfo;
  return Promise.resolve({
    payload,
    response: {
      statusCode: 200,
    },
  });
};
export const tableauTrigger = trigger({
  display: {
    label: "Webhook Events",
    description:
      "Receive event notifications from Tableau. Automatically creates and manages a webhook subscription for the selected events when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  allowsBranching: false,
  inputs: tableauTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: tableauWebhookExamplePayload,
  perform: performFunction,
  webhookLifecycleHandlers: {
    create: async (
      context,
      { connectionInput, events, timeout, apiVersion },
    ) => {
      const endpoint = context.webhookUrls[context.flow.name];
      const client = await getTableauClient({
        tableauConnection: connectionInput,
        timeout,
        debug: context.debug.enabled,
        apiVersion,
      });
      await createWebhookSubscriptions(client, endpoint, events);
    },
    delete: async (context, { connectionInput, timeout, apiVersion }) => {
      const client = await getTableauClient({
        debug: context.debug.enabled,
        apiVersion,
        timeout,
        tableauConnection: connectionInput,
      });
      const endpoint = context.webhookUrls[context.flow.name];
      await deleteWebhooksInstance(client, endpoint);
    },
  },
});
