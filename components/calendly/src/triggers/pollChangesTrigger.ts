import { pollingTrigger } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../client";
import {
  connection,
  organization,
  showNewRecords,
  showUpdatedRecords,
  user,
} from "../inputs";
import type { CalendlyEvent, PollingState } from "../types";
import { classifyEventsByPollDate, getEvents } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Events",
    description:
      "Checks for new and updated Events in Calendly on a configured schedule.",
  },
  inputs: {
    connection,
    organization: {
      ...organization,
      required: true,
      dataSource: "organizations",
      comments: "Poll events scheduled with the organization at this URI.",
    },
    user,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (context, payload, params) => {
    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();
    if (!pollState?.lastPolledAt) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created: [], updated: [] } } },
        polledNoChanges: true,
      };
    }
    const { lastPolledAt } = pollState;
    const client = getCalendlyClient(params.connection, context.debug.enabled);
    const events = (await getEvents(
      client,
      undefined,
      undefined,
      undefined,
      params.organization,
      undefined,
      undefined,
      params.user,
    )) as CalendlyEvent[];
    const { created, updated } = classifyEventsByPollDate(events, lastPolledAt);
    const emittedCreated = params.showNewRecords ? created : [];
    const emittedUpdated = params.showUpdatedRecords ? updated : [];
    const totalMatched = emittedCreated.length + emittedUpdated.length;
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Calendly events: ${events.length} fetched, ${emittedCreated.length} created, ${emittedUpdated.length} updated`,
      );
    }
    return {
      payload: {
        ...payload,
        body: { data: { created: emittedCreated, updated: emittedUpdated } },
      },
      polledNoChanges: totalMatched === 0,
    };
  },
});
