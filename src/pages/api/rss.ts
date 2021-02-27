import { NextApiHandler } from "next";
import RSS from "rss";
import * as author from "../../config/author.json";
import { loadBlogPosts } from "../../tools/blog";
import { parseDate, toSlug } from "../../tools/utils";

const rssHandler: NextApiHandler = async (req, res) => {
    if (req.method !== "GET") {
        res.status(405);
        res.setHeader("Allow", ["GET"]);
        return res.end();
    }
    const feed = new RSS({
        title: "pspeter3",
        description: author.name,
        site_url: author.site,
        feed_url: `${author.site}/rss.xml`,
    });
    const blog = await loadBlogPosts();
    blog.forEach((post) => {
        feed.item({
            title: post.title,
            description: "",
            url: `/blog/${toSlug(post.basename)}`,
            date: parseDate(post.basename),
            author: author.name,
            categories: post.tags as string[],
        });
    });
    res.status(200);
    res.setHeader("Content-Type", "application/rss+xml");
    return res.send(feed.xml());
};

export default rssHandler;
