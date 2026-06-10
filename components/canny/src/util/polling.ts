import type { Post } from "../types";
export const classifyPostsByPollDate = (
  posts: Post[],
  lastPolledAt: string,
): {
  created: Post[];
  updated: Post[];
} => {
  const lastPolledAtMs = new Date(lastPolledAt).getTime();
  const created: Post[] = [];
  const updated: Post[] = [];
  for (const post of posts) {
    const createdMs = post.created
      ? new Date(post.created).getTime()
      : Number.NaN;
    const statusChangedMs = post.statusChangedAt
      ? new Date(post.statusChangedAt).getTime()
      : Number.NaN;
    const isNew = !Number.isNaN(createdMs) && createdMs > lastPolledAtMs;
    const isUpdated =
      !isNew &&
      !Number.isNaN(statusChangedMs) &&
      statusChangedMs > lastPolledAtMs;
    if (isNew) {
      created.push(post);
    } else if (isUpdated) {
      updated.push(post);
    }
  }
  return { created, updated };
};
