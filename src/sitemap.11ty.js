const { SitemapStream, streamToPromise } = require("sitemap");

exports.data = {
    permalink: "/sitemap.xml",
};

exports.render = async function render(ctx) {
    const stream = new SitemapStream({
        hostname: ctx.author.site,
    });
    for (const item of ctx.collections.all) {
        stream.write({
            url: item.url,
            lastmod: item.date,
        });
    }
    stream.end();
    return await streamToPromise(stream);
};
