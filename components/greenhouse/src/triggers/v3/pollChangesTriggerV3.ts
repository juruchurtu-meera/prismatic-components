import { pollingTrigger } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { pollChangesTriggerV3ExamplePayload } from "../../examplePayloads/v3/triggers";
import { pollChangesV3Inputs } from "../../inputs/v3/triggers";
import type { PollingState, V3Application } from "../../types";
import { partitionApplicationsByTimestamp } from "../../util";
import { fetchAllV3 } from "../../util/v3";
export const pollChangesTriggerV3 = pollingTrigger({
  display: {
    label: "New and Updated Applications",
    description:
      "Checks for new and updated applications in Greenhouse on a configured schedule.",
  },
  inputs: pollChangesV3Inputs,
  perform: async (
    context,
    payload,
    { connection, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    const sinceDate = lastState?.lastPolledAt
      ? new Date(lastState.lastPolledAt)
      : now;
    const client = createV3Client(connection, context.debug.enabled);
    const applications = await fetchAllV3<V3Application>(
      client,
      "/applications",
      { "last_activity_at[gte]": sinceDate.toISOString() },
    );
    const { created, updated } = partitionApplicationsByTimestamp(
      applications,
      sinceDate,
    );
    context.polling.setState({
      lastPolledAt: now.toISOString(),
    } as Record<string, unknown>);
    const result = {
      created: showNewRecords ? created : [],
      updated: showUpdatedRecords ? updated : [],
    };
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled applications (v3): ${applications.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }
    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges:
        result.created.length === 0 && result.updated.length === 0,
    };
  },
  examplePayload: pollChangesTriggerV3ExamplePayload,
});
