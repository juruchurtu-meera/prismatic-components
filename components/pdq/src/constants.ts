export const API_URL = "https://app.pdq.com";
export const INVALID_CONNECTION = "Invalid connection provided for PDQ.";
export const SUCCESS_EMPTY_PAYLOAD = "CREATED SUCCESSFULLY";
export const POLL_RESOURCE_CONFIG: Record<
  string,
  {
    endpoint: string;
  }
> = {
  Devices: { endpoint: "/devices" },
  Groups: { endpoint: "/groups" },
};
