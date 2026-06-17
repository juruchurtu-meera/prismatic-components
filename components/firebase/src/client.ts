import { ConnectionError, util } from "@prismatic-io/spectral";
import admin from "firebase-admin";
import type { FirebaseAdmin } from "./types";
export const createClient = ({ firebaseConnection }: FirebaseAdmin) => {
  if (firebaseConnection.key !== "firebaseConnection")
    throw new ConnectionError(
      firebaseConnection,
      `Unsupported connection specified: ${firebaseConnection.key}`,
    );
  let app: admin.app.App;
  if (admin.apps.length === 0) {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: util.types.toString(firebaseConnection.fields.projectId),
        privateKey: util.types
          .toString(firebaseConnection.fields.privateKey)
          .replace(/\\n/g, "\n"),
        clientEmail: util.types.toString(firebaseConnection.fields.clientEmail),
      }),
    });
  } else {
    app = admin.app();
  }
  return app;
};
