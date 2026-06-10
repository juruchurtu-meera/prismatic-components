import type { Element } from "@prismatic-io/spectral";
import type { MobileDevice, MobileDeviceDetail, PagedResponse } from "../types";
const mobileDeviceExample: MobileDevice = {
  id: "5",
  managementId: "mgmt-abc-123",
  name: "iPad-001",
  udid: "B3D6E19F-4321-8765-DCBA-EF0A1B2C3D4E",
  serialNumber: "DMPC123456789",
  wifiMacAddress: "a4:5e:60:ab:cd:ef",
  phoneNumber: null,
  username: "jdoe",
  type: "ios",
  model: "iPad Pro (11-inch) (4th generation)",
  modelIdentifier: "iPad14,3",
  softwareUpdateDeviceId: null,
};
export const getMobileDeviceExamplePayload: {
  data: MobileDeviceDetail;
} = {
  data: {
    ...mobileDeviceExample,
    osVersion: "17.4",
    osType: "iOS",
    realname: "Jane Doe",
    email: "jdoe@example.com",
    department: "Engineering",
  },
};
export const listMobileDevicesExamplePayload: {
  data: PagedResponse<MobileDevice>;
} = {
  data: {
    results: [mobileDeviceExample],
    totalCount: 1,
  },
};
export const selectMobileDeviceExamplePayload: {
  result: Element[];
} = {
  result: [{ key: "5", label: "iPad-001" }],
};
