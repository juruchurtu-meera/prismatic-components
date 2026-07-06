import { action, util } from "@prismatic-io/spectral";
import { listProductsInputs } from "../../inputs";
import { listProductsExamplePayload } from "../../payloadExamples";
import { listProductsGql } from "../graphql/products/listProducts";
export const listProducts = action({
  display: {
    label: "List Products",
    description: "Lists all products.",
  },
  perform: async (context, params) => {
    const { data } = await listProductsGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      pagination: {
        limit: params.pagination.limit
          ? util.types.toInt(params.pagination.limit)
          : 50,
        endCursor: params.pagination.pageInfo || undefined,
      },
      getAlldata: params.getAlldata,
    });
    return {
      data,
    };
  },
  inputs: listProductsInputs,
  examplePayload: {
    data: listProductsExamplePayload,
  },
});
