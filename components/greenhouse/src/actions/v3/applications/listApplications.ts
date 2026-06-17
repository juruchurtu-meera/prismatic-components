import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { listApplicationsV3ExamplePayload } from "../../../examplePayloads/v3/applications";
import { listApplicationsV3Inputs } from "../../../inputs/v3/applications";
import type { V3Application } from "../../../types";
import { generatePayload, paginateV3 } from "../../../util";
export const listApplicationsV3 = action({
  display: {
    label: "List Applications",
    description: "Retrieves a list of applications.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      perPage,
      cursor,
      createdAtGte,
      createdAtLte,
      updatedAtGte,
      updatedAtLte,
      lastActivityAtGte,
      lastActivityAtLte,
      ids,
      candidateIds,
      jobIds,
      prospectiveJobIds,
      jobPostIds,
      sourceIds,
      referrerIds,
      stageIds,
      status,
      stageName,
      prospect,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const filterParams = generatePayload({
      ids,
      candidate_ids: candidateIds,
      job_ids: jobIds,
      prospective_job_ids: prospectiveJobIds,
      job_post_ids: jobPostIds,
      source_ids: sourceIds,
      referrer_ids: referrerIds,
      stage_ids: stageIds,
      status,
      stage_name: stageName,
      prospect,
      "created_at[gte]": createdAtGte,
      "created_at[lte]": createdAtLte,
      "updated_at[gte]": updatedAtGte,
      "updated_at[lte]": updatedAtLte,
      "last_activity_at[gte]": lastActivityAtGte,
      "last_activity_at[lte]": lastActivityAtLte,
    });
    const data = await paginateV3<V3Application>(
      client,
      "/applications",
      fetchAll,
      { perPage, cursor, params: filterParams },
    );
    return { data };
  },
  inputs: listApplicationsV3Inputs,
  examplePayload: listApplicationsV3ExamplePayload,
});
