import { dataSource, type Element } from "@prismatic-io/spectral";
import { queryDocs } from "../util";
import { createClient } from "../client";
import { selectDocumentInputs } from "../inputs";
export const selectDocument = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Document",
    description:
      "Select a document from your Firebase Cloud Firestore collection",
  },
  perform: async (
    _context,
    { collection, firebaseConnection, queryOperatorCode, orderBy },
  ) => {
    const client = createClient({
      firebaseConnection: firebaseConnection,
    });
    const docs = await queryDocs({
      client,
      collection: collection,
      queryOperatorCode: queryOperatorCode,
      orderBy: orderBy,
    });
    return {
      result: docs.map(
        (item): Element => ({
          key: item.id,
          label: item.ref.path,
        }),
      ),
    };
  },
  inputs: selectDocumentInputs,
});
