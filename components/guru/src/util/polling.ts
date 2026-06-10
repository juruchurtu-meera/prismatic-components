import type { GuruCard } from "../types";
export const toGuruDateFilter = (iso: string): string =>
  iso.replace(/Z$/, "+00:00");
export const classifyCardsByPollDate = (
  cards: GuruCard[],
  lastPolledAt: string,
): {
  created: GuruCard[];
  updated: GuruCard[];
} => {
  const lastPolledAtMs = new Date(lastPolledAt).getTime();
  const created: GuruCard[] = [];
  const updated: GuruCard[] = [];
  for (const card of cards) {
    const createdMs = card.dateCreated
      ? new Date(card.dateCreated).getTime()
      : Number.NaN;
    if (!Number.isNaN(createdMs) && createdMs > lastPolledAtMs) {
      created.push(card);
    } else {
      updated.push(card);
    }
  }
  return { created, updated };
};
