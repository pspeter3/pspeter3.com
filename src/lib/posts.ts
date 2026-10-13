import { getCollection, type CollectionEntry } from "astro:content";

import { parsePostFilename } from "./post-filename";

export type Post = ReturnType<typeof parsePostFilename> & {
  entry: CollectionEntry<"blog">;
};
export async function getPosts(): Promise<Post[]> {
  const posts = (await getCollection("blog")).map((entry) => ({
    entry,
    ...parsePostFilename(entry.id),
  }));
  posts.sort(
    (a, b) =>
      b.date.getTime() - a.date.getTime() ||
      (a.entry.id < b.entry.id ? 1 : a.entry.id > b.entry.id ? -1 : 0),
  );
  if (new Set(posts.map((post) => post.path)).size !== posts.length)
    throw new Error("Duplicate post URLs");
  return posts;
}
export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
