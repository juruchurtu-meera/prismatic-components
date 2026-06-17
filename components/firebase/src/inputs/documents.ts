import { input, util } from "@prismatic-io/spectral";
import { keyValuePairsToObject, validateJSON } from "../util";
import {
  collection,
  connectionInput,
  document,
  orderBy,
  queryOperatorCode,
} from "./common";
const data = input({
  label: "Data",
  placeholder: "Data",
  type: "data",
  required: true,
  collection: "keyvaluelist",
  comments: "Provide a key value pair that represents your data.",
  clean: keyValuePairsToObject,
});
const fieldToRemove = input({
  label: "Field To Remove",
  placeholder: "firstName",
  example: "firstName",
  type: "string",
  required: true,
  comments:
    "Provide a string value for the name of the field you would like to remove from the document.",
  clean: util.types.toString,
});
const documents = input({
  type: "code",
  label: "Documents",
  language: "json",
  comments: "An array of documents to be created in the collection.",
  required: true,
  default: JSON.stringify(
    [
      {
        field1: "value1",
        field2: "value2",
      },
      {
        field1: "value3",
        field2: "value4",
      },
    ],
    null,
    2,
  ),
  clean: validateJSON,
});
export const createDocumentInputs = {
  collection,
  data,
  firebaseConnection: connectionInput,
};
export const bulkCreateDocumentsInputs = {
  firebaseConnection: connectionInput,
  collection,
  documents,
};
export const listDocumentsInputs = {
  collection,
  firebaseConnection: connectionInput,
  orderBy,
  queryOperatorCode,
};
export const getDocumentInputs = {
  collection,
  document,
  firebaseConnection: connectionInput,
};
export const updateDocumentInputs = {
  collection,
  document,
  data,
  firebaseConnection: connectionInput,
};
export const deleteDocumentInputs = {
  collection,
  document,
  firebaseConnection: connectionInput,
};
export const removeFieldInputs = {
  collection,
  document,
  fieldToRemove,
  firebaseConnection: connectionInput,
};
