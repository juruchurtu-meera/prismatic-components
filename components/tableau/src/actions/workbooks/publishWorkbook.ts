import { action, util } from "@prismatic-io/spectral";
import { getTableauClient } from "../../util";
import FormData from "form-data";
import { publishWorkbookInputs } from "../../inputs";
import { publishWorkbookExamplePayload } from "../../examplePayloads";
export const publishWorkbook = action({
  display: {
    label: "Publish Workbook",
    description: "Publish a workbook on the specified site.",
  },
  examplePayload: publishWorkbookExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
      multipartMixed: true,
    });
    const queryParams = {
      ...(params.uploadSessionId && {
        uploadSessionId: params.uploadSessionId,
      }),
      ...(params.workbookType && { workbookType: params.workbookType }),
      overwrite: params.overwrite,
      asJob: params.asJob,
      skipConnectionCheck: params.skipConnectionCheck,
    };
    const form = new FormData();
    form.append("request_payload", params.workbookXml, {
      filename: "publish-workbook.xml",
    });
    form.append("tableau_workbook", params.workbookFileContents.data, {
      filename: "workbook.twbx",
    });
    const response = await client.post("/workbooks", form.getBuffer(), {
      params: queryParams,
      headers: {
        "content-type": "multipart/mixed; boundary=" + form.getBoundary(),
      },
      maxBodyLength: Number.POSITIVE_INFINITY,
    });
    return {
      data: response.data,
    };
  },
  inputs: publishWorkbookInputs,
});
