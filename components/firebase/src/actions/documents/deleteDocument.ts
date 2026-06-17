import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteDocumentExamplePayload } from "../../examplePayloads";
import { deleteDocumentInputs } from "../../inputs";
export const deleteDocument = action({
  display: {
    label: "Delete Document",
    description: "Remove a document from a Cloud Firestore collection",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });
    const result = await client
      .firestore()
      .collection(params.collection)
      .doc(params.document)
      .delete();
    await client.delete();
    return {
      data: result,
    };
  },
  inputs: deleteDocumentInputs,
  examplePayload: deleteDocumentExamplePayload,
});
