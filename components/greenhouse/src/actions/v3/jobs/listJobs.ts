import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { listJobsV3ExamplePayload } from "../../../examplePayloads/v3/jobs";
import { listJobsV3Inputs } from "../../../inputs/v3/jobs";
import type { V3Job } from "../../../types";
import { generatePayload, paginateV3 } from "../../../util";
export const listJobsV3 = action({
  display: {
    label: "List Jobs",
    description: "Retrieves a list of jobs.",
  },
  inputs: listJobsV3Inputs,
  perform: async (
    context,
    {
      connection,
      fetchAll,
      perPage,
      cursor,
      ids,
      requisitionId,
      status,
      departmentId,
      officeId,
      confidential,
      createdAtGte,
      createdAtLte,
      updatedAtGte,
      updatedAtLte,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const filterParams = generatePayload({
      ids,
      requisition_id: requisitionId,
      status,
      department_id: departmentId,
      office_id: officeId,
      confidential,
      "created_at[gte]": createdAtGte,
      "created_at[lte]": createdAtLte,
      "updated_at[gte]": updatedAtGte,
      "updated_at[lte]": updatedAtLte,
    });
    const data = await paginateV3<V3Job>(client, "/jobs", fetchAll, {
      perPage,
      cursor,
      params: filterParams,
    });
    return { data };
  },
  examplePayload: listJobsV3ExamplePayload,
});
