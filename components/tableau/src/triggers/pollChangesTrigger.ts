import { pollingTrigger } from "@prismatic-io/spectral";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { PollingState, TableauRecord } from "../types";
import { fetchTableauRecordsSince, getTableauClient } from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected Tableau resource type on a configured schedule.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      debug: context.debug.enabled,
    });
    const { records, truncated } = await fetchTableauRecordsSince(
      client,
      params.pollResourceType,
      lastPolledAt,
    );
    const lastPolledAtDate = new Date(lastPolledAt);
    const created: TableauRecord[] = [];
    const updated: TableauRecord[] = [];
    for (const record of records) {
      const createdValue = record.createdAt;
      const createdAtDate =
        typeof createdValue === "string" ? new Date(createdValue) : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && params.showNewRecords !== false) created.push(record);
      else if (!isNew && params.showUpdatedRecords !== false)
        updated.push(record);
    }
    let nextCursor = now;
    if (truncated) {
      const latestUpdatedAt = records[records.length - 1]?.updatedAt;
      nextCursor =
        typeof latestUpdatedAt === "string" ? latestUpdatedAt : lastPolledAt;
      context.logger.warn(
        `Polling truncated at the page cap for Tableau ${params.pollResourceType}. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Tableau ${params.pollResourceType}: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }
    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
