import type { APIRoute } from "astro";
import { getPosts } from "../lib/posts";
import { escapeXml } from "../lib/xml";
export const GET: APIRoute = async ({ site }) => {
  const pages = ["/", "/blog/"].map(
    (path) => `<url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`,
  );
  for (const post of await getPosts())
    pages.push(
      `<url><loc>${escapeXml(new URL(post.path, site).href)}</loc><lastmod>${post.date.toISOString()}</lastmod></url>`,
    );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
