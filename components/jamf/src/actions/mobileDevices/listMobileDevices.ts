import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listMobileDevicesExamplePayload } from "../../examplePayloads";
import { listMobileDevicesInputs } from "../../inputs";
import type { MobileDeviceInventory } from "../../types";
import { paginateResults } from "../../util";
export const listMobileDevices = action({
  display: {
    label: "List Mobile Devices",
    description:
      "List mobile device inventory records with optional filtering and pagination.",
  },
  inputs: listMobileDevicesInputs,
  perform: async (
    context,
    { connection, page, pageSize, sort, filter, section, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateResults<MobileDeviceInventory>(
      client,
      "/v2/mobile-devices/detail",
      fetchAll,
      { page, "page-size": pageSize, sort, filter, section },
    );
    return { data };
  },
  examplePayload: listMobileDevicesExamplePayload,
});
