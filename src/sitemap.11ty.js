const { SitemapStream, streamToPromise } = require("sitemap");

exports.data = {
    permalink: "/sitemap.xml",
};

exports.render = async function render(ctx) {
    const stream = new SitemapStream({
        hostname: ctx.author.site,
    });
    ctx.collections.all.forEach((item) => {
        stream.write({
            url: item.url,
            lastmod: item.date,
        });
    });
    stream.end();
    return await streamToPromise(stream);
};
