import fs from "fs";
import glob from "fast-glob";
import path from "path";
import util from "util";
import matter from "gray-matter";

const readFile = util.promisify(fs.readFile);

const loadBlogPost = async (filename: string): Promise<BlogPost> => {
  const basename = path.basename(filename, ".md");
  const contents = await readFile(filename, "utf8");
  const { data, content } = matter(contents);
  if (typeof data.title !== "string") {
    throw new Error(`Missing title for ${filename}`);
  }
  if (data.tags === undefined) {
    data.tags = [];
  }
  if (!Array.isArray(data.tags)) {
    throw new Error(`Invalid tags for ${filename}`);
  }
  const { title, tags } = data;
  return { basename, title, tags, content };
};

export interface BlogPost {
  readonly basename: string;
  readonly title: string;
  readonly tags: ReadonlyArray<string>;
  readonly content: string;
}

export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  const filenames = await glob(path.join(process.cwd(), "src", "blog", "*.md"));
  return await Promise.all(filenames.map(loadBlogPost));
};
