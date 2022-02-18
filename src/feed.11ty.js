const RSS = require("rss");

exports.data = { permalink: "/feed.xml" };

exports.render = function render(ctx) {
    const feed = new RSS({
        title: "pspeter3",
        description: ctx.author.name,
        site_url: "https://pspeter3.com",
        feed_url: "https://pspeter3.com/feed.xml",
    });
    for (const post of ctx.collections.posts) {
        feed.item({
            title: post.data.title,
            description: post.data.description,
            url: post.url,
            date: post.date,
            author: post.data.author.name,
            categories: post.tags,
        });
    }
    return feed.xml();
};
