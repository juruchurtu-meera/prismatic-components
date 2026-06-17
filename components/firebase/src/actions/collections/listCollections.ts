import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCollectionsExamplePayload } from "../../examplePayloads";
import { listCollectionsInputs } from "../../inputs";
export const listCollections = action({
  display: {
    label: "List Collections",
    description: "List all collections in a Cloud Firestore database",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });
    const result = await client.firestore().listCollections();
    await client.delete();
    return {
      data: result.map((item) => ({ id: item.id, path: item.path })),
    };
  },
  inputs: listCollectionsInputs,
  examplePayload: listCollectionsExamplePayload,
});
