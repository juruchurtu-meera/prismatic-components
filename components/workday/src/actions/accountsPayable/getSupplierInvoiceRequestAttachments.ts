import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getSupplierInvoiceRequestAttachmentsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { getSupplierInvoiceRequestAttachmentsInputs } from "../../inputs";
export const getSupplierInvoiceRequestAttachments = action({
  display: {
    label: "Get Supplier Invoice Request Attachments",
    description: "Retrieves all attachments associated with supplier invoices.",
  },
  perform: async (
    context,
    { connection, supplierInvoiceRequestId, fetchAll, limit, offset },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.accountsPayable}/supplierInvoiceRequests/${supplierInvoiceRequestId}/attachments`,
      fetchAll,
      limit,
      offset,
    });
  },
  inputs: getSupplierInvoiceRequestAttachmentsInputs,
  examplePayload: getSupplierInvoiceRequestAttachmentsExamplePayload,
});
