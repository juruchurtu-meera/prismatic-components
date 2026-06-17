import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataParams } from "../general";
export const listPurchaseReceiptsInputs = {
  connection: connectionInput,
  companyId,
  fetchAll,
  ...odataParams,
};
