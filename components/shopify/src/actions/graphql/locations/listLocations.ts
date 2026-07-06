import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listLocationsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listLocationsInputs as inputs } from "../../../inputsGql";
import { fetchData } from "../../../util";
import type { PageInfo } from "../../interfaces/PageInfo";
import listLocationsQuery from "../queries/locations/ListLocations.gql";
export const listLocationsGql = action({
  display: {
    label: "List Locations",
    description: "Lists all locations.",
  },
  perform: async (
    context,
    { shopifyConnection, getAlldata, pagination = {} },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
    );
    const data = (await fetchData(
      client,
      ["locations"],
      "locations",
      getAlldata,
      listLocationsQuery,
      {
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
      },
    )) as Record<"locations", unknown[]> & {
      pageInfo: PageInfo;
    };
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
