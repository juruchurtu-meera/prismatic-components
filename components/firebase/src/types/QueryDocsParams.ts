import type { app } from "firebase-admin";
export interface QueryDocsParams {
  client: app.App;
  collection: string;
  queryOperatorCode: string;
  orderBy: string;
}
