import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../client";
import { listSitesExamplePayload } from "../examplePayloads";
import { oneDriveConnection, fetchAll, pageLimit, pageToken } from "../inputs";
export const listSites = action({
  display: {
    label: "List Sites",
    description: "Returns a list of all sites available to the current user",
  },
  perform: async (context, { connection, fetchAll, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: "/sites",
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  inputs: {
    connection: oneDriveConnection,
    fetchAll,
    pageLimit,
    pageToken,
  },
  examplePayload: listSitesExamplePayload,
});
