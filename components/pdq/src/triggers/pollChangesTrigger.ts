import { pollingTrigger } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesInputs } from "../inputs/triggers";
import type { PollableRecord, PollingState } from "../interfaces";
import { fetchAllData, filterRecordsInsertedAfter } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Checks for new Devices or Groups added to PDQ on a configured schedule.",
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
        payload: { ...payload, body: { data: { created: [] } } },
        polledNoChanges: true,
      };
    }
    const { lastPolledAt } = pollState;
    const client = createHttpClient(params.connection, context.debug.enabled);
    const { data: fetched } = (await fetchAllData(
      client,
      config.endpoint,
      { sort: "insertedAtDesc" },
      true,
    )) as {
      data: PollableRecord[];
    };
    const records = filterRecordsInsertedAfter(fetched ?? [], lastPolledAt);
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled PDQ ${params.pollResourceType}: ${(fetched ?? []).length} fetched, ${records.length} new`,
      );
    }
    return {
      payload: { ...payload, body: { data: { created: records } } },
      polledNoChanges: records.length === 0,
    };
  },
});
