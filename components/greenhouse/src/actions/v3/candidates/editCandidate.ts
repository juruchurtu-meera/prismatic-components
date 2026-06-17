import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { editCandidateV3ExamplePayload } from "../../../examplePayloads/v3/candidates";
import { editCandidateV3Inputs } from "../../../inputs/v3/candidates";
import { generatePayload } from "../../../util";
export const editCandidateV3 = action({
  display: {
    label: "Edit Candidate",
    description: "Updates an existing candidate.",
  },
  inputs: editCandidateV3Inputs,
  perform: async (
    context,
    {
      connection,
      candidateId,
      firstNameOptional,
      lastNameOptional,
      preferredName,
      company,
      title,
      timeZone,
      canEmail,
      isPrivateCandidate,
      phoneNumbers,
      addresses,
      emailAddresses,
      websiteAddresses,
      socialMediaAddresses,
      tags,
      linkedUserIds,
      customFields,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const body = generatePayload({
      first_name: firstNameOptional,
      last_name: lastNameOptional,
      preferred_name: preferredName,
      company,
      title,
      time_zone: timeZone,
      can_email: canEmail,
      is_private: isPrivateCandidate,
      phone_numbers: phoneNumbers,
      addresses,
      email_addresses: emailAddresses,
      website_addresses: websiteAddresses,
      social_media_addresses: socialMediaAddresses,
      tags,
      linked_user_ids: linkedUserIds,
      custom_fields: customFields,
    });
    const { data } = await client.patch(`/candidates/${candidateId}`, body);
    return { data };
  },
  examplePayload: editCandidateV3ExamplePayload,
});
