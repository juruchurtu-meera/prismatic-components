import { action } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../client";
import { listDrivesExamplePayload } from "../examplePayloads";
import {
  oneDriveConnection,
  groupId,
  siteId,
  userId,
  fetchAll,
  pageLimit,
  pageToken,
} from "../inputs";
export const listDrives = action({
  display: {
    label: "List My Drives",
    description: "Returns a list of all drives available to the current user",
  },
  perform: async (context, { connection, fetchAll, pageLimit, pageToken }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: "/me/drives",
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
  examplePayload: listDrivesExamplePayload,
});
export const listDrivesByUser = action({
  display: {
    label: "List Drives By User",
    description: "Returns a list of all drives available to the given user",
  },
  perform: async (
    context,
    { connection, userId, fetchAll, pageLimit, pageToken },
  ) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `/users/${userId}/drives`,
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  inputs: {
    connection: oneDriveConnection,
    userId,
    fetchAll,
    pageLimit,
    pageToken,
  },
  examplePayload: listDrivesExamplePayload,
});
export const listDrivesByGroup = action({
  display: {
    label: "List Drives By Group",
    description: "Returns a list of all drives available to the given group",
  },
  perform: async (
    context,
    { connection, groupId, fetchAll, pageLimit, pageToken },
  ) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `/groups/${groupId}/drives`,
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  inputs: {
    connection: oneDriveConnection,
    groupId,
    fetchAll,
    pageLimit,
    pageToken,
  },
  examplePayload: listDrivesExamplePayload,
});
export const listDrivesBySite = action({
  display: {
    label: "List Drives By Site",
    description: "Returns a list of all drives available to the given site",
  },
  perform: async (
    context,
    { connection, siteId, fetchAll, pageLimit, pageToken },
  ) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `/sites/${siteId}/drives`,
      fetchAll,
      pageSize: pageLimit,
      pageToken,
    });
  },
  inputs: {
    connection: oneDriveConnection,
    siteId,
    fetchAll,
    pageLimit,
    pageToken,
  },
  examplePayload: listDrivesExamplePayload,
});
export default {
  listDrives,
  listDrivesByGroup,
  listDrivesByUser,
  listDrivesBySite,
};
