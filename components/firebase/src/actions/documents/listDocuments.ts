import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDocumentsExamplePayload } from "../../examplePayloads";
import { listDocumentsInputs } from "../../inputs";
import { queryDocs } from "../../util";
export const listDocuments = action({
  display: {
    label: "List Documents",
    description: "List all documents in a Cloud Firestore collection",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });
    const result = await queryDocs({
      client,
      collection: params.collection,
      queryOperatorCode: params.queryOperatorCode,
      orderBy: params.orderBy,
    });
    await client.delete();
    return {
      data: result.map((item) => ({
        id: item.id,
        path: item.ref.path,
        data: item.data(),
      })),
    };
  },
  inputs: listDocumentsInputs,
  examplePayload: listDocumentsExamplePayload,
});
