import { pollingTrigger } from "@prismatic-io/spectral";
import { getGuruClient } from "../client";
import { pollCardsInputs } from "../inputs";
import type { GuruCard, PollingState } from "../types";
import {
  classifyCardsByPollDate,
  fetchGuruResults,
  toGuruDateFilter,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Cards",
    description:
      "Checks for new and updated Cards in Guru on a configured schedule.",
  },
  inputs: pollCardsInputs,
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
    const client = getGuruClient(params.connection, context.debug.enabled);
    const q = `lastModified > ${toGuruDateFilter(lastPolledAt)}`;
    const cards = await fetchGuruResults<GuruCard>(
      client,
      "/search/query",
      true,
      { q },
    );
    const { created, updated } = classifyCardsByPollDate(cards, lastPolledAt);
    const emittedCreated = params.showNewRecords ? created : [];
    const emittedUpdated = params.showUpdatedRecords ? updated : [];
    const totalMatched = emittedCreated.length + emittedUpdated.length;
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Guru cards: ${cards.length} fetched, ${emittedCreated.length} created, ${emittedUpdated.length} updated`,
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
