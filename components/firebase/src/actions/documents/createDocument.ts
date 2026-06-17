import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createDocumentExamplePayload } from "../../examplePayloads";
import { createDocumentInputs } from "../../inputs";
export const createDocument = action({
  display: {
    label: "Create Document",
    description: "Create a document in a Cloud Firestore collection",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });
    const result = await client
      .firestore()
      .collection(params.collection)
      .add(params.data);
    await client.delete();
    return {
      data: { id: result.id, path: result.path },
    };
  },
  inputs: createDocumentInputs,
  examplePayload: createDocumentExamplePayload,
});
