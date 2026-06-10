import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollPostsInputs } from "../inputs";
import type { PollingState, Post } from "../types";
import { classifyPostsByPollDate, paginateOffset } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Posts",
    description:
      "Checks for new and updated Posts in Canny on a configured schedule.",
  },
  inputs: pollPostsInputs,
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
    const client = createClient(params.connection, context.debug.enabled);
    const { posts } = await paginateOffset<"posts", Post>(
      client.post,
      "/posts/list",
      "posts",
      {},
      true,
    );
    const { created, updated } = classifyPostsByPollDate(posts, lastPolledAt);
    const emittedCreated = params.showNewRecords ? created : [];
    const emittedUpdated = params.showUpdatedRecords ? updated : [];
    const totalMatched = emittedCreated.length + emittedUpdated.length;
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Canny posts: ${posts.length} fetched, ${emittedCreated.length} created, ${emittedUpdated.length} updated`,
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
