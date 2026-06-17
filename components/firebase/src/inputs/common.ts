import { input, util } from "@prismatic-io/spectral";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});
export const collection = input({
  label: "Collection",
  placeholder: "Collection Name",
  type: "string",
  required: true,
  comments: "Provide a string value for the collection name.",
  example: "Customers",
  dataSource: "selectCollection",
  clean: util.types.toString,
});
export const document = input({
  label: "Document",
  placeholder: "Document",
  type: "string",
  required: true,
  comments: "Provide a string value for the unique identifier of the document.",
  dataSource: "selectDocument",
  example: "/path/to/destination/file.txt",
  clean: util.types.toString,
});
export const orderBy = input({
  label: "Order By",
  placeholder: "Field",
  type: "string",
  required: false,
  comments: "Provide a string value for the field to order by.",
  example: "Name",
  clean: util.types.toString,
});
export const queryOperatorCode = input({
  label: "Query Operators",
  type: "code",
  language: "json",
  example: JSON.stringify([
    {
      field: "myFieldName",
      operator: "!=",
      value: "myFieldValue",
    },
    {
      field: "myOtherFieldName",
      operator: "not-in",
      value: ["myOtherFieldValue1", "myOtherFieldValue2"],
    },
  ]),
  clean: util.types.toString,
});
