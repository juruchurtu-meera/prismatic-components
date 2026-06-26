export interface Subscription {
  id: string;
  notificationUrl: string;
  resource: string;
  changeType: string;
  [key: string]: unknown;
}
