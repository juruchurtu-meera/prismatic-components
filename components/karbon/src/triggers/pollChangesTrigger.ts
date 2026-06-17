import { pollingTrigger } from "@prismatic-io/spectral";
import { createKarbonClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import pollChangesInputs from "../inputs/triggers/pollChanges";
import type { PollingState } from "../interfaces/PollingState";
import { filterRecordsModifiedAfter, getPaginatedData } from "../utils";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "Updated Records",
    description:
      "Checks for updated contacts or invoices in Karbon on a configured schedule.",
  },
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const config = POLL_RESOURCE_CONFIG[params.pollResourceType];
    if (!config) {
      throw new Error(`Unsupported resource type: ${params.pollResourceType}`);
    }
    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();
    if (!pollState?.lastPolledAt) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { updated: [] } } },
        polledNoChanges: true,
      };
    }
    const { lastPolledAt } = pollState;
    const client = createKarbonClient(params.connection, context.debug.enabled);
    const response = await getPaginatedData<Record<string, unknown>>({
      client,
      endpoint: config.endpoint,
      getAllData: true,
      pagination: {},
    });
    const records = filterRecordsModifiedAfter(
      response.value ?? [],
      config.timestampField,
      lastPolledAt,
    );
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Karbon ${params.pollResourceType}: ${(response.value ?? []).length} fetched, ${records.length} changed`,
      );
    }
    return {
      payload: { ...payload, body: { data: { updated: records } } },
      polledNoChanges: records.length === 0,
    };
  },
});
