import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDocumentExamplePayload } from "../../examplePayloads";
import { getDocumentInputs } from "../../inputs";
export const getDocument = action({
  display: {
    label: "Get Document",
    description:
      "Get the contents of a document in a Cloud Firestore collection",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });
    const result = await client
      .firestore()
      .collection(params.collection)
      .doc(params.document)
      .get();
    await client.delete();
    return {
      data: {
        data: result.data(),
        id: result.id,
        createTime: result.createTime?.toDate(),
        updateTime: result.updateTime?.toDate(),
        exists: result.exists,
        readTime: result.readTime?.toDate(),
      },
    };
  },
  inputs: getDocumentInputs,
  examplePayload: getDocumentExamplePayload,
});
