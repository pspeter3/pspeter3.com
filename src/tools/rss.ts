import fs from "fs";
import path from "path";
import util from "util";
import RSS from "rss";
import { exec } from "./cli";
import * as author from "../config/author.json";
import { loadBlogPosts } from "./blog";
import { parseDate, toSlug } from "./utils";

const writeFile = util.promisify(fs.writeFile);

const main = async (): Promise<void> => {
  const filename = "feed.xml";
  const feed = new RSS({
    title: "pspeter3",
    description: author.name,
    site_url: author.site,
    feed_url: `${author.site}/${filename}`,
  });
  const blog = await loadBlogPosts();
  blog.forEach((post) => {
    feed.item({
      title: post.title,
      description: "",
      url: `${author.site}/blog/${toSlug(post.basename)}`,
      date: parseDate(post.basename),
      author: author.name,
      categories: post.tags as string[],
    });
  });
  await writeFile(path.join(process.cwd(), "public", filename), feed.xml());
};

if (require.main === module) {
  exec(main);
}
