import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../client";
import { listChildrenExamplePayload } from "../examplePayloads";
import {
  oneDriveConnection,
  driveId,
  itemId,
  fetchAll,
  pageLimit,
  pageToken,
} from "../inputs";
export const listChildren = action({
  display: {
    label: "List Children",
    description: "Returns all child elements on a given drive item",
  },
  inputs: {
    connection: oneDriveConnection,
    driveId,
    itemId,
    fetchAll,
    pageLimit,
    pageToken,
  },
  perform: async (
    context,
    { connection, driveId, itemId, fetchAll, pageLimit, pageToken },
  ) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `/drives/${driveId}/items/${itemId}/children`,
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  examplePayload: listChildrenExamplePayload,
});
