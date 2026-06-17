import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataParams } from "../general";
export const listPurchaseReceiptLinesInputs = {
  connection: connectionInput,
  companyId,
  fetchAll,
  ...odataParams,
};
