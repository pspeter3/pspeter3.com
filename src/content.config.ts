import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { parsePostFilename } from "./lib/posts";

const blog = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/blog",
    generateId: ({ entry }) => {
      parsePostFilename(entry);
      return entry.replace(/\.md$/, "");
    },
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});
export const collections = { blog };
