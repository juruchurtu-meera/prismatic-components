import { action } from "@prismatic-io/spectral";
import { firestore } from "firebase-admin";
import { createClient } from "../../client";
import { removeFieldExamplePayload } from "../../examplePayloads";
import { removeFieldInputs } from "../../inputs";
export const removeField = action({
  display: {
    label: "Remove Field",
    description:
      "Completely removes a field from a given document (may not work on a field with a null value)",
  },
  perform: async (_context, params) => {
    const client = createClient({
      firebaseConnection: params.firebaseConnection,
    });
    const result = await client
      .firestore()
      .collection(params.collection)
      .doc(params.document)
      .update({
        [params.fieldToRemove]: firestore.FieldValue.delete(),
      });
    await client.delete();
    return {
      data: result,
    };
  },
  inputs: removeFieldInputs,
  examplePayload: removeFieldExamplePayload,
});
