import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { listProductAttributesExamplePayload } from "../examplePayloads";
import { paginateResults, removeUndefinedValuesFromObject } from "../helpers";
import {
  connectionInput,
  fetchAll,
  searchCriteriaConditionType,
  searchCriteriaCurrentPage,
  searchCriteriaField,
  searchCriteriaPageSize,
  searchCriteriaSortDirection,
  searchCriteriaSortField,
  searchCriteriaValue,
} from "../inputs";
export const listProductAttributes = action({
  display: {
    label: "List Product Attributes",
    description: "Retrieve all attributes for entity type",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      searchCriteriaCurrentPage,
      searchCriteriaConditionType,
      searchCriteriaField,
      searchCriteriaValue,
      searchCriteriaPageSize,
      searchCriteriaSortDirection,
      searchCriteriaSortField,
    },
  ) => {
    const client = await getClient(connection, context.debug.enabled);
    const queryParams = removeUndefinedValuesFromObject({
      "searchCriteria[filterGroups][0][filters][0][conditionType]":
        searchCriteriaConditionType || undefined,
      "searchCriteria[filterGroups][0][filters][0][field]":
        searchCriteriaField || undefined,
      "searchCriteria[filterGroups][0][filters][0][value]":
        searchCriteriaValue || undefined,
      "searchCriteria[sortOrders][0][direction]":
        searchCriteriaSortDirection || undefined,
      "searchCriteria[sortOrders][0][field]":
        searchCriteriaSortField || undefined,
      "searchCriteria[currentPage]": searchCriteriaCurrentPage || undefined,
      "searchCriteria[pageSize]": searchCriteriaPageSize || undefined,
    });
    try {
      return await paginateResults({
        client,
        endpoint: "/products/attributes",
        queryParams,
        fetchAll,
      });
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    searchCriteriaCurrentPage,
    searchCriteriaConditionType,
    searchCriteriaField,
    searchCriteriaValue,
    searchCriteriaPageSize,
    searchCriteriaSortDirection,
    searchCriteriaSortField,
  },
  examplePayload: listProductAttributesExamplePayload,
});
export default { listProductAttributes };
