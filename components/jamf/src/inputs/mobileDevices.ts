import {
  connection,
  fetchAll,
  page,
  pageSize,
  resourceId,
  sort,
} from "./common";
const mobileDeviceResourceId = {
  ...resourceId,
  label: "Mobile Device",
  comments: "The unique identifier of the mobile device.",
  dataSource: "selectMobileDevice",
};
export const listMobileDevicesInputs = {
  connection,
  page,
  pageSize,
  sort,
  fetchAll,
};
export const getMobileDeviceInputs = {
  connection,
  resourceId: mobileDeviceResourceId,
};
