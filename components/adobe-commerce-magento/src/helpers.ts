import type { Connection } from "@prismatic-io/spectral";
import { getClient } from "./client";
import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGES,
  MAX_POLL_PAGES,
  POLL_PAGE_SIZE,
  POLL_RESOURCE_CONFIG,
} from "./constants";
import type {
  MagentoListResponse,
  MagentoRecord,
  PaginateOptions,
} from "./types";
export const removeUndefinedValuesFromObject = (
  obj: Record<string, unknown>,
): Record<string, unknown> => {
  const newObj: Record<string, unknown> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
export const validateJSON = (
  jsonString: string,
): Record<string, unknown> | false => {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (error) {
    return false;
  }
};
export const paginateResults = async ({
  client,
  endpoint,
  queryParams = {},
  fetchAll,
}: PaginateOptions) => {
  if (fetchAll) {
    const allItems: unknown[] = [];
    const limit =
      (queryParams["searchCriteria[pageSize]"] as string) || DEFAULT_PAGE_SIZE;
    const {
      "searchCriteria[pageSize]": _ps,
      "searchCriteria[currentPage]": _cp,
      ...filterParams
    } = queryParams;
    let page = 1;
    do {
      const params = {
        ...filterParams,
        "searchCriteria[pageSize]": limit,
        "searchCriteria[currentPage]": String(page),
      };
      const { data } = await client.get<MagentoListResponse>(endpoint, {
        params,
      });
      const items = Array.isArray(data?.items) ? data.items : [];
      allItems.push(...items);
      if (items.length < Number(limit)) break;
      page++;
    } while (page <= MAX_PAGES);
    return { data: allItems };
  }
  const { data } = await client.get(endpoint, {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
  return { data };
};
export const toMagentoDateTime = (iso: string): string =>
  iso
    .replace("T", " ")
    .replace(/\.\d+Z$/, "")
    .replace(/Z$/, "");
export const fetchMagentoRecordsSince = async (
  connection: Connection,
  resourceType: string,
  lastPolledAt: string,
  debug: boolean,
): Promise<{
  records: MagentoRecord[];
  truncated: boolean;
}> => {
  const config = POLL_RESOURCE_CONFIG[resourceType];
  if (!config) {
    throw new Error(`Unsupported resource type: ${resourceType}`);
  }
  const client = await getClient(connection, debug);
  const magentoDateTime = toMagentoDateTime(lastPolledAt);
  const records: MagentoRecord[] = [];
  for (let page = 1; page <= MAX_POLL_PAGES; page++) {
    const params = {
      "searchCriteria[filterGroups][0][filters][0][field]": "updated_at",
      "searchCriteria[filterGroups][0][filters][0][conditionType]": "gteq",
      "searchCriteria[filterGroups][0][filters][0][value]": magentoDateTime,
      "searchCriteria[sortOrders][0][field]": "updated_at",
      "searchCriteria[sortOrders][0][direction]": "DESC",
      "searchCriteria[pageSize]": String(POLL_PAGE_SIZE),
      "searchCriteria[currentPage]": String(page),
    };
    const { data } = await client.get(config.endpoint, { params });
    const items: MagentoRecord[] = Array.isArray(data?.items) ? data.items : [];
    records.push(...items);
    if (items.length < POLL_PAGE_SIZE) {
      return { records, truncated: false };
    }
  }
  return { records, truncated: true };
};
