import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listTaxCodesPayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import {
  connection,
  site,
  company,
  fetchAll,
  filterDataAfterDate,
} from "../../inputs/general";
import { filterDataChangedAfter } from "../../util";
export const listTaxCodes = action({
  display: {
    label: "List Tax Codes",
    description: "Retrieve a list of tax codes",
  },
  perform: async (
    context,
    { connection, site, company, fetchAll, filterDataAfterDate },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await paginateResults({
      client,
      endpoint: "/tax_codes",
      fetchAll,
    });
    return {
      data: filterDataAfterDate
        ? filterDataChangedAfter(data, filterDataAfterDate)
        : data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    fetchAll,
    filterDataAfterDate,
  },
  examplePayload: listTaxCodesPayload,
});
