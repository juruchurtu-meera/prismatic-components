import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataParams } from "../general";
export const listPurchaseOrdersInputs = {
  connection: connectionInput,
  companyId,
  fetchAll,
  ...odataParams,
};
