import { input, util } from "@prismatic-io/spectral";
import {
  apiVersion,
  connectionInput,
  pageNumber,
  pageSize,
  timeout,
  webhookId,
} from "./common";
import tableauEvents from "../tableauEvents.json";
const webhookName = input({
  label: "Webhook Name",
  type: "string",
  required: true,
  comments: "A name for the webhook.",
  example: "My Webhook",
  clean: util.types.toString,
});
export const events = input({
  label: "API Event Name",
  type: "string",
  required: true,
  comments: "The name of the Tableau event that triggers the webhook.",
  clean: util.types.toString,
  model: tableauEvents.map((event) => {
    return { label: event.apiEventName, value: event.apiEventName };
  }),
});
const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments:
    "The destination URL for the webhook. The webhook destination URL must be https and have a valid certificate.",
  example: "https://example.com/webhook",
  clean: util.types.toString,
});
const webhookEnabled = input({
  label: "Webhook Enabled",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "If true (default), the newly created webhook is enabled. If false then the webhook will be disabled.",
  clean: util.types.toBool,
});
const webhookDisableReason = input({
  label: "Webhook Disable Reason",
  type: "string",
  required: false,
  comments: "The reason a webhook is disabled.",
  example: "This webhook is disabled because of a reason.",
  clean: util.types.toString,
});
export const listWebhooksInputs = {
  timeout,
  pageSize,
  pageNumber,
  tableauConnection: connectionInput,
  apiVersion,
};
export const getWebhookInputs = {
  tableauConnection: connectionInput,
  webhookId,
  timeout,
  apiVersion,
};
export const deleteWebhookInputs = {
  tableauConnection: connectionInput,
  webhookId,
  timeout,
  apiVersion,
};
export const testWebhookInputs = {
  tableauConnection: connectionInput,
  webhookId,
  timeout,
  apiVersion,
};
export const createWebhookInputs = {
  tableauConnection: connectionInput,
  webhookName: {
    ...webhookName,
    required: false,
  },
  events: {
    ...events,
    required: false,
  },
  webhookUrl: {
    ...webhookUrl,
    required: false,
  },
  webhookEnabled,
  timeout,
  apiVersion,
};
export const updateWebhookInputs = {
  tableauConnection: connectionInput,
  webhookId,
  webhookName: {
    ...webhookName,
    required: false,
  },
  events: {
    ...events,
    required: false,
  },
  webhookUrl: {
    ...webhookUrl,
    required: false,
  },
  webhookEnabled,
  webhookDisableReason,
  timeout,
  apiVersion,
};
