const RSS = require("rss");

class Feed {
  data() {
    return {
      permalink: "/feed.xml",
    };
  }

  render(ctx) {
    const feed = new RSS({
      title: "pspeter3",
      description: ctx.author.name,
      site_url: "https://pspeter3.com",
      feed_url: "https://pspeter3.com/feed.xml",
    });
    ctx.collections.posts.forEach(post => {
      feed.item({
        title: post.data.title,
        description: post.data.description,
        url: post.url,
        date: post.date,
        author: post.data.author.name,
        categories: post.tags,
      });
    });
    return feed.xml({ indent: true });
  }
}

module.exports = Feed;
