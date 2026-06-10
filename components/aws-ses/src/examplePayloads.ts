export const sendEmailExamplePayload = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "00000000-0000-0000-0000-000000000000",
      attempts: 1,
      totalRetryDelay: 0,
    } as any,
    MessageId: "0000000000000000-00000000-0000-0000-0000-000000000000-000000",
  },
};
export const listIdentitiesExamplePayload = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "4d41a619-b699-444b-9b09-7edbb92fc867",
      attempts: 1,
      totalRetryDelay: 0,
    },
    Identities: ["example@example.com"],
    NextToken: "exampleToken",
  } as any,
};
