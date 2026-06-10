export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface ShipbobOrder extends Record<string, unknown> {
  id: number;
  created_date?: string;
}
