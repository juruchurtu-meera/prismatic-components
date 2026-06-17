export const BASE_URL = "https://api.karbonhq.com";
export const MAX_PAGE_SIZE = 100;
export const SUCCESS_MESSAGE = "Success";
export const POLL_RESOURCE_CONFIG: Record<
  string,
  {
    endpoint: string;
    timestampField: string;
  }
> = {
  Contacts: {
    endpoint: "/v3/Contacts",
    timestampField: "LastModifiedDateTime",
  },
  Invoices: { endpoint: "/v3/Invoices", timestampField: "UpdatedAt" },
};
