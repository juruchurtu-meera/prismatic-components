import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs/polling";
import type { PollingState } from "../types";
import { fetchJobsSince, getJobCreationMs } from "../utils/polling";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Jobs",
    description:
      "Checks for newly created jobs in BigQuery on a recurring schedule. Jobs expose only a creation time, so this detects new jobs since the last run, not changes to existing ones.",
  },
  inputs: pollChangesInputs,
  examplePayload: pollChangesExamplePayload,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState;
    const lastPolledAt = state?.lastPolledAt ?? now;
    const client = createClient(params.connectionInput);
    const { jobs, truncated } = await fetchJobsSince(
      client,
      params.projectId,
      new Date(lastPolledAt).getTime(),
      state?.drainUntil,
    );
    if (truncated) {
      const oldestMs = jobs.reduce<number | null>((min, job) => {
        const ms = getJobCreationMs(job);
        return ms !== null && (min === null || ms < min) ? ms : min;
      }, null);
      context.polling.setState({
        lastPolledAt,
        drainUntil: oldestMs ?? state?.drainUntil,
        highWater: state?.highWater ?? now,
      } as PollingState);
      context.logger.warn(
        `BigQuery jobs poll truncated at the page cap. Draining the backlog older than ${oldestMs} on the next poll.`,
      );
    } else {
      context.polling.setState({
        lastPolledAt: state?.highWater ?? now,
      } as PollingState);
    }
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled BigQuery jobs: ${jobs.length} fetched, truncated=${truncated}`,
      );
    }
    return {
      payload: { ...payload, body: { data: { created: jobs } } },
      polledNoChanges: jobs.length === 0,
    };
  },
});
