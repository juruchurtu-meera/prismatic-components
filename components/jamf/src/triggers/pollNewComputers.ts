import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollComputersInputs } from "../inputs";
import type { ComputerInventory, ComputerPollingState } from "../types";
import { paginateResults } from "../util";
export const pollNewComputers = pollingTrigger({
  display: {
    label: "New Computers",
    description:
      "Checks for newly enrolled computers in Jamf Pro on a configured schedule.",
  },
  inputs: pollComputersInputs,
  perform: async (context, payload, { connection }) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as ComputerPollingState;
    const lastPolledAt = pollState.lastPolledAt ?? now;
    context.logger.debug(
      `Polling for new computers enrolled since ${lastPolledAt}`,
    );
    const client = await createClient(connection, context.debug.enabled);
    const { results: computers } = await paginateResults<ComputerInventory>(
      client,
      "/v3/computers-inventory",
      true,
      {
        section: ["GENERAL"],
        filter: `general.lastEnrolledDate>="${lastPolledAt}"`,
      },
    );
    context.logger.debug(`Found ${computers.length} newly enrolled computers`);
    context.polling.setState({ lastPolledAt: now });
    return {
      payload: { ...payload, body: { data: computers } },
      polledNoChanges: computers.length === 0,
    };
  },
});
