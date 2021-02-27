import { SitemapStream, streamToPromise } from "sitemap";
import * as author from "../../config/author.json";
import { loadBlogPosts } from "../../tools/blog";
import { parseDate, toSlug } from "../../tools/utils";
import { NextApiHandler } from "next";

const sitemapHandler: NextApiHandler = async (req, res) => {
    if (req.method !== "GET") {
        res.status(405);
        res.setHeader("Allow", ["GET"]);
        return res.end();
    }
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
    res.status(200);
    res.setHeader("Content-Type", "application/rss+xml");
    res.send(data);
};

export default sitemapHandler;
