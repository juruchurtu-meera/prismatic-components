import { pollingTrigger } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { connection, webinarKey } from "../inputs";
import type { PollingState } from "../types";
import { fetchAllRegistrants, filterRegistrantsRegisteredAfter } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Registrants",
    description:
      "Fetches new registrants added to a GoTo Webinar webinar on a configured schedule.",
  },
  inputs: { connection, webinarKey },
  examplePayload: pollChangesTriggerExamplePayload,
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
    const { client, organizerKey } = createGotoWebinarClient(
      params.connection,
      context.debug.enabled,
    );
    const registrants = await fetchAllRegistrants(
      client,
      organizerKey,
      params.webinarKey,
    );
    const newRegistrants = filterRegistrantsRegisteredAfter(
      registrants,
      lastPolledAt,
    );
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled GoToWebinar registrants (webinar ${params.webinarKey}): ${registrants.length} fetched, ${newRegistrants.length} new`,
      );
    }
    return {
      payload: { ...payload, body: { data: { created: newRegistrants } } },
      polledNoChanges: newRegistrants.length === 0,
    };
  },
});
