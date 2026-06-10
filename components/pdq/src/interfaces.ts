export interface Package {
  id: string;
  name: string;
}
export interface Group {
  id: string;
  name: string;
}
export interface Device {
  id: string;
  name: string;
}
export interface PollableRecord {
  id: string;
  insertedAt?: string;
  [key: string]: unknown;
}
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
