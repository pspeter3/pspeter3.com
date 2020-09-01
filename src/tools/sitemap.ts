import fs from "fs";
import path from "path";
import util from "util";
import { SitemapStream, streamToPromise } from "sitemap";
import { exec } from "./cli";
import * as author from "../config/author.json";
import { loadBlogPosts } from "./blog";
import { parseDate, toSlug } from "./utils";

const writeFile = util.promisify(fs.writeFile);

const main = async (): Promise<void> => {
  const filename = "sitemap.xml";
  const sitemap = new SitemapStream({
    hostname: author.site,
  });
  const blog = await loadBlogPosts();
  blog.forEach((post) => {
    sitemap.write({
      url: `/blog/${toSlug(post.basename)}`,
      lastmod: parseDate(post.basename),
    });
  });
  const lastmod = new Date();
  const write = (url: string) => sitemap.write({ url, lastmod });
  write("/");
  write("/blog");
  write("/feed.xml");
  sitemap.end();
  const data = await streamToPromise(sitemap);
  await writeFile(path.join(process.cwd(), "public", filename), data);
};

if (require.main === module) {
  exec(main);
}
