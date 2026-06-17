export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface MagentoRecord extends Record<string, unknown> {
  created_at?: string;
  updated_at?: string;
}
export interface MagentoListResponse {
  items?: unknown[];
  total_count?: number;
  search_criteria?: Record<string, unknown>;
}
export interface PaginateOptions {
  client: import("@prismatic-io/spectral/dist/clients/http").HttpClient;
  endpoint: string;
  queryParams?: Record<string, unknown>;
  fetchAll: boolean;
}
