import { companyId } from "../accounts/getAccountsInputs";
import { connectionInput, fetchAll, odataParams } from "../general";
export const listItemsInputs = {
  connection: connectionInput,
  companyId,
  fetchAll,
  ...odataParams,
};
