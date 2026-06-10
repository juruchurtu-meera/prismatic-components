export interface Envelope {
  envelope_id: string;
  envelope: string;
  status: string;
  created_at: string;
}
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
