import { structuredObjectInput } from "@prismatic-io/spectral";
import {
  connectionInput,
  description,
  dynamicValues,
  fieldValues,
  name,
  recordId,
  version,
} from "./common";
import {
  billingCity,
  billingCountry,
  billingPostalCode,
  billingState,
  billingStreet,
  city,
  country,
  employeeCount,
  industry,
  phone,
  postalCode,
  revenue,
  state,
  street,
  type,
  website,
} from "./fields";
const shippingAddress = structuredObjectInput({
  label: "Shipping Address",
  required: false,
  comments:
    "Street, city, state, postal code, and country for the shipping address.",
  inputs: { street, state, city, postalCode, country },
});
const billingAddress = structuredObjectInput({
  label: "Billing Address",
  required: false,
  comments:
    "Street, city, state, postal code, and country for the billing address.",
  inputs: {
    billingStreet,
    billingState,
    billingCity,
    billingPostalCode,
    billingCountry,
  },
});
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Phone, Website, Description, Number of Employees, and Annual Revenue.",
  inputs: {
    phone,
    website,
    description,
    employeeCount,
    revenue,
  },
});
export const createAccountInputs = {
  version,
  name,
  type,
  industry,
  dynamicValues,
  fieldValues,
  shippingAddress,
  billingAddress,
  additionalFields,
  connection: connectionInput,
};
export const deleteAccountInputs = {
  version,
  recordId,
  fieldValues,
  connection: connectionInput,
};
export const updateAccountInputs = {
  version,
  recordId,
  name,
  type,
  industry,
  dynamicValues,
  fieldValues,
  shippingAddress,
  billingAddress,
  additionalFields,
  connection: connectionInput,
};
