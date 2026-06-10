import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listMobileDevicesExamplePayload } from "../../examplePayloads";
import { listMobileDevicesInputs } from "../../inputs";
import type { MobileDevice } from "../../types";
import { paginateResults } from "../../util";
export const listMobileDevices = action({
  display: {
    label: "List Mobile Devices",
    description: "List all mobile device records with optional pagination.",
  },
  inputs: listMobileDevicesInputs,
  perform: async (context, { connection, page, pageSize, sort, fetchAll }) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateResults<MobileDevice>(
      client,
      "/v2/mobile-devices",
      fetchAll,
      { page, "page-size": pageSize, sort },
    );
    return { data };
  },
  examplePayload: listMobileDevicesExamplePayload,
});
