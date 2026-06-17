import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listPricingTypesPayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { connection, site, company, fetchAll } from "../../inputs/general";
export const listPricingTypes = action({
  display: {
    label: "List Pricing Types",
    description: "Retrieve a list of pricing types",
  },
  perform: async (context, { connection, site, company, fetchAll }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    return await paginateResults({
      client,
      endpoint: "/pricing_types",
      fetchAll,
    });
  },
  inputs: {
    connection,
    site,
    company,
    fetchAll,
  },
  examplePayload: listPricingTypesPayload,
});
