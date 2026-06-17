export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface Sage200Record {
  date_time_created?: string;
  date_time_updated?: string;
  [key: string]: unknown;
}
export interface PaginateOptions {
  client: import("@prismatic-io/spectral/dist/clients/http").HttpClient;
  endpoint: string;
  fetchAll: boolean;
  pageSize?: number;
}
