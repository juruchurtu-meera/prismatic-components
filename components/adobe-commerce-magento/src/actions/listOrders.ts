import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { listOrdersExamplePayload } from "../examplePayloads";
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
export const listOrders = action({
  display: {
    label: "List Orders",
    description: "Lists orders that match specified search criteria.",
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
        endpoint: "/orders",
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
  examplePayload: listOrdersExamplePayload,
});
export default { listOrders };
