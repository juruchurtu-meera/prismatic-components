import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connectionInput,
  showNewRecords,
  showUpdatedRecords,
  version,
} from "../inputs";
import type { PollingState, ShipbobOrder } from "../types/polling";
import {
  classifyOrdersByPollDate,
  getAllPaginatedData,
  toShipbobDate,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Orders",
    description:
      "Checks for new and updated orders in ShipBob on a configured schedule.",
  },
  inputs: { connectionInput, version, showNewRecords, showUpdatedRecords },
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
    const client = createClient(
      params.connectionInput,
      params.version,
      context.debug.enabled,
    );
    const orders = await getAllPaginatedData<ShipbobOrder>(client, "/order", {
      LastUpdateStartDate: toShipbobDate(lastPolledAt),
    });
    const { created, updated } = classifyOrdersByPollDate(orders, lastPolledAt);
    const emittedCreated = params.showNewRecords ? created : [];
    const emittedUpdated = params.showUpdatedRecords ? updated : [];
    const totalMatched = emittedCreated.length + emittedUpdated.length;
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ShipBob orders: ${orders.length} fetched, ${emittedCreated.length} created, ${emittedUpdated.length} updated`,
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
