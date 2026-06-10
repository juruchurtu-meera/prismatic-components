export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface CalendlyEvent extends Record<string, unknown> {
  uri: string;
  created_at?: string;
  updated_at?: string;
}
