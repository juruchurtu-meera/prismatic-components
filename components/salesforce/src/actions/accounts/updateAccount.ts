import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { updateAccountInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const updateAccount = action({
  display: {
    label: "Update Account",
    description: "Update an existing account record.",
  },
  perform: async (
    context,
    {
      recordId,
      version,
      dynamicValues,
      fieldValues,
      name,
      type,
      industry,
      shippingAddress = {},
      billingAddress = {},
      additionalFields = {},
      connection,
    },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const object = {
      Id: recordId,
      name: name,
      phone: additionalFields.phone,
      Website: additionalFields.website,
      Type: type,
      industry: industry,
      description: additionalFields.description,
      NumberOfEmployees: additionalFields.employeeCount,
      AnnualRevenue: additionalFields.revenue,
      BillingCity: billingAddress.billingCity,
      BillingCountry: billingAddress.billingCountry,
      BillingPostalCode: billingAddress.billingPostalCode,
      BillingState: billingAddress.billingState,
      BillingStreet: billingAddress.billingStreet,
      ShippingCity: shippingAddress.city,
      ShippingCountry: shippingAddress.country,
      ShippingPostalCode: shippingAddress.postalCode,
      ShippingState: shippingAddress.state,
      ShippingStreet: shippingAddress.street,
      ...dynamicValues,
      ...fieldValues,
    };
    if (context.debug.enabled) context.logger.debug("Payload", object);
    const command = salesforceClient.sobject("Account").update(object);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  inputs: updateAccountInputs,
  examplePayload: genericCreateUpdateExamplePayload,
});
