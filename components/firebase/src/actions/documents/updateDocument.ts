import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateDocumentExamplePayload } from "../../examplePayloads";
import { updateDocumentInputs } from "../../inputs";
export const updateDocument = action({
  display: {
    label: "Update Document",
    description: "Update a document in a Cloud Firestore collection",
  },
  perform: async (
    _context,
    { collection, document, data, firebaseConnection },
  ) => {
    const client = createClient({
      firebaseConnection: firebaseConnection,
    });
    const result = await client
      .firestore()
      .collection(collection)
      .doc(document)
      .update(data);
    await client.delete();
    return {
      data: result,
    };
  },
  inputs: updateDocumentInputs,
  examplePayload: updateDocumentExamplePayload,
});
