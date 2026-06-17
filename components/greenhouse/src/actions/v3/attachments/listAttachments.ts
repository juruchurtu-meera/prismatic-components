import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { listAttachmentsV3ExamplePayload } from "../../../examplePayloads/v3/attachments";
import { listAttachmentsV3Inputs } from "../../../inputs/v3/attachments";
import type { V3Attachment } from "../../../types";
import { generatePayload, paginateV3 } from "../../../util";
export const listAttachmentsV3 = action({
  display: {
    label: "List Attachments",
    description: "Retrieves a list of attachments.",
  },
  inputs: listAttachmentsV3Inputs,
  perform: async (
    context,
    {
      connection,
      attachmentIds,
      applicationIds,
      candidateIds,
      attachmentTypeFilter,
      createdAtGte,
      createdAtLte,
      updatedAtGte,
      updatedAtLte,
      fetchAll,
      perPage,
      cursor,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const filterParams = generatePayload({
      ids: attachmentIds,
      application_ids: applicationIds,
      candidate_ids: candidateIds,
      type: attachmentTypeFilter,
      "created_at[gte]": createdAtGte,
      "created_at[lte]": createdAtLte,
      "updated_at[gte]": updatedAtGte,
      "updated_at[lte]": updatedAtLte,
    });
    const data = await paginateV3<V3Attachment>(
      client,
      "/attachments",
      fetchAll,
      { perPage, cursor, params: filterParams },
    );
    return { data };
  },
  examplePayload: listAttachmentsV3ExamplePayload,
});
