import { pollingTrigger } from "@prismatic-io/spectral";
import { createDB } from "../client";
import { pollTableExamplePayload } from "../examplePayloads";
import { pollTableInputs } from "../inputs";
import type { PollingState } from "../types";
export const pollTable = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a table on a configured schedule.",
  },
  inputs: pollTableInputs,
  examplePayload: pollTableExamplePayload,
  perform: async (context, payload, params) => {
    const db = createDB({
      connection: params.postgresConnection,
      castTimestampsToString: params.castTimestampsToString,
    });
    const state = context.polling.getState() as unknown as PollingState;
    if (
      !state?.cursor ||
      state.cursorField !== params.cursorField ||
      state.tableName !== params.tableName
    ) {
      try {
        const { cursor } = await db.one(
          "SELECT MAX(${cursorField:name}) AS cursor FROM ${table:name}",
          { cursorField: params.cursorField, table: params.tableName },
        );
        const newState: PollingState = {
          cursor,
          cursorField: params.cursorField,
          tableName: params.tableName,
        };
        context.polling.setState(newState);
        context.logger.log(
          `First time running. Next time records with "${params.cursorField}" greater than "${cursor}" will be fetched.`,
        );
        return {
          payload,
          polledNoChanges: true,
        };
      } finally {
        await db.$pool.end();
      }
    }
    try {
      const {
        records,
        cursorQuery: { cursor },
      } = await db.tx(async (task) => {
        return {
          records: await task.manyOrNone(
            "SELECT * FROM ${table:name} WHERE ${cursorField:name} > ${oldCursor}",
            {
              table: params.tableName,
              cursorField: params.cursorField,
              oldCursor: state.cursor,
            },
          ),
          cursorQuery: await task.one(
            "SELECT MAX(${cursorField:name}) AS cursor FROM ${table:name}",
            { cursorField: params.cursorField, table: params.tableName },
          ),
        };
      });
      if (records.length > 0) {
        const newState: PollingState = {
          cursor,
          cursorField: params.cursorField,
          tableName: params.tableName,
        };
        context.polling.setState(newState);
        return {
          payload: { ...payload, body: { data: records } },
          polledNoChanges: false,
        };
      }
      return { payload, polledNoChanges: true };
    } finally {
      await db.$pool.end();
    }
  },
});
