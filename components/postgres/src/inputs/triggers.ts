import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";
export const tableName = input({
  label: "Table Name",
  comments: "The name of the table to monitor for new and updated records.",
  placeholder: "Enter a table name",
  example: "people",
  type: "string",
  required: true,
  clean: util.types.toString,
});
export const cursorField = input({
  label: "Cursor Field",
  default: "updated_at",
  placeholder: "Enter a column name",
  comments:
    "The column used to track new results. If the table has an auto incrementing integer ID, that ID can be used. If it has a 'created at' or 'updated at' timestamp, those can be used. Each time this trigger runs, it checks for records with values greater than the largest value from the last run.",
  type: "string",
  required: true,
  clean: util.types.toString,
});
export const castTimestampsToString = input({
  label: "Cast Timestamps to Strings",
  default: "true",
  comments:
    "When true, timestamp values are cast to strings to retain precision. PostgreSQL tracks microseconds, but JavaScript dates are measured in milliseconds, so precision can be lost when fetching TIME, TIMETZ, TIMESTAMP, and TIMESTAMPTZ fields. Enable this when the cursor field is a timestamp.",
  type: "boolean",
  clean: util.types.toBool,
});
export const pollTableInputs = {
  postgresConnection: connectionInput,
  tableName,
  cursorField,
  castTimestampsToString,
};
