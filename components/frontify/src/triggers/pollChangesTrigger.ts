import { pollingTrigger } from "@prismatic-io/spectral";
import { listLibraryAssetsQuery } from "../actions/libraries/listLibraryAssets";
import type ListLibraryAssetsResponse from "../actions/types/listLibraryAssets";
import type { AssetResponse } from "../actions/types/shared";
import { createClient } from "../client";
import { pollLibraryAssetsInputs } from "../inputs/triggers";
import type { PollingState } from "../types";
import { classifyAssetsByPollDate } from "../utils/classifyAssets";
import { graphqlFetchAll } from "../utils/graphqlFetchAll";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Assets",
    description:
      "Checks for new and updated Assets in Frontify on a configured schedule.",
  },
  inputs: pollLibraryAssetsInputs,
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
    const client = createClient({
      connection: params.connection,
      debug: context.debug.enabled,
    });
    const responses: ListLibraryAssetsResponse[] = await graphqlFetchAll({
      client,
      query: listLibraryAssetsQuery,
      params: { libraryId: params.libraryId, query: {} },
      hasNextPath: ["library", "assets", "hasNextPage"],
    });
    const assets: AssetResponse[] = responses.flatMap(
      (response) => response.library?.assets?.items ?? [],
    );
    const { created, updated } = classifyAssetsByPollDate(assets, lastPolledAt);
    const emittedCreated = params.showNewRecords ? created : [];
    const emittedUpdated = params.showUpdatedRecords ? updated : [];
    const totalMatched = emittedCreated.length + emittedUpdated.length;
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Frontify assets: ${assets.length} fetched, ${emittedCreated.length} created, ${emittedUpdated.length} updated`,
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
