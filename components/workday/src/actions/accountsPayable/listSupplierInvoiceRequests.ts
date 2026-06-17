import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listSupplierInvoiceRequestsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { listSupplierInvoiceRequestsInputs } from "../../inputs";
export const listSupplierInvoiceRequests = action({
  display: {
    label: "List Supplier Invoice Requests",
    description: "Retrieves all supplier invoices.",
  },
  perform: async (context, { connection, params, fetchAll, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.accountsPayable}/supplierInvoiceRequests`,
      params,
      fetchAll,
      limit,
      offset,
    });
  },
  inputs: listSupplierInvoiceRequestsInputs,
  examplePayload: listSupplierInvoiceRequestsExamplePayload,
});
