import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../client";
import { listSharedFilesExamplePayload } from "../examplePayloads";
import { oneDriveConnection, fetchAll, pageLimit, pageToken } from "../inputs";
export const listSharedFiles = action({
  display: {
    label: "List Files Shared With Me",
    description: "Returns all files shared with your account",
  },
  perform: async (context, { connection, fetchAll, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: "/me/drive/sharedWithMe",
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
  examplePayload: listSharedFilesExamplePayload,
});
