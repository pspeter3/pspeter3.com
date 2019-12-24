const { SitemapStream, streamToPromise } = require("sitemap");

class Sitemap {
  data() {
    return {
      permalink: "/sitemap.xml",
    };
  }

  async render(ctx) {
    const stream = new SitemapStream({
      hostname: "https://pspeter3.com",
    });
    ctx.collections.all.forEach(item => {
      stream.write({
        url: item.url,
        lastmod: item.date,
      });
    });
    stream.end();
    return await streamToPromise(stream);
  }
}

module.exports = Sitemap;
