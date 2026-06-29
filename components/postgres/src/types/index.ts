export interface PollingState extends Record<string, unknown> {
  cursor: string;
  cursorField: string;
  tableName: string;
}
