import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import author from "../data/author.json";
import { escapeXml } from "../lib/xml";
import { getPosts } from "../lib/posts";
export const GET: APIRoute = async ({ site }) =>
  rss({
    title: "pspeter3",
    description: author.name,
    site: site!,
    items: (await getPosts()).reverse().map((post) => ({
      title: post.entry.data.title,
      description: post.entry.data.description,
      link: post.path,
      pubDate: post.date,
      customData: `<dc:creator>${escapeXml(author.name)}</dc:creator>`,
    })),
    customData: `<atom:link href="${escapeXml(new URL("/feed.xml", site).href)}" rel="self" type="application/rss+xml" />`,
    xmlns: {
      dc: "http://purl.org/dc/elements/1.1/",
      atom: "http://www.w3.org/2005/Atom",
    },
  });
