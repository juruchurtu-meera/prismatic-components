import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";
import type { Envelope, PollingState } from "../interfaces";
import {
  fetchAllRecords,
  filterEnvelopesCreatedAfter,
  toYotiDate,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Envelopes",
    description: "Fetches Yoti Sign Envelopes created on a recurring schedule.",
  },
  inputs: { connection: connectionInput },
  perform: async (context, payload, params) => {
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
    const client = createClient(params.connection, context.debug.enabled);
    const { data: fetched } = await fetchAllRecords<Envelope>(
      client,
      "/organisations/envelopes/search",
      { from_date: toYotiDate(lastPolledAt) },
    );
    const envelopes = filterEnvelopesCreatedAfter(fetched, lastPolledAt);
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Yoti Sign envelopes: ${fetched.length} fetched, ${envelopes.length} new`,
      );
    }
    return {
      payload: { ...payload, body: { data: { created: envelopes } } },
      polledNoChanges: envelopes.length === 0,
    };
  },
});
