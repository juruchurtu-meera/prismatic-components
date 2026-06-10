export const MAX_PAGE_SIZE = 1000;
export const WEBHOOK_EVENTS = [
  "ComputerAdded",
  "ComputerCheckIn",
  "ComputerInventoryCompleted",
  "ComputerPatchPolicyCompleted",
  "ComputerPolicyFinished",
  "ComputerPushCapabilityChanged",
  "MobileDeviceCheckIn",
  "MobileDeviceCommandCompleted",
  "MobileDeviceEnrolled",
  "MobileDeviceInventoryCompleted",
  "MobileDevicePushSent",
  "MobileDeviceUnenrolled",
  "JSSStartup",
  "JSSShutdown",
  "DeviceAddedToDEP",
  "SmartGroupComputerMembershipChange",
  "SmartGroupMobileDeviceMembershipChange",
  "SmartGroupUserMembershipChange",
  "PatchSoftwareTitleUpdated",
  "PushSent",
  "RestAPIOperation",
  "SCEPChallenge",
];
export const WEBHOOK_AUTH_HEADER = "X-Jamf-Signature";
export const WEBHOOK_NAME_MAX_LENGTH = 100;
