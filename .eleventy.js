const feather = require("feather-icons");
const path = require("path");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function configure(config) {
  // Collections
  config.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("*/blog/**/*.md")
  );
  // Passthrough Copies
  config.addPassthroughCopy(path.join("src", "img"));
  // Plugins
  config.addPlugin(syntaxHighlight);
  // Shortcodes
  config.addShortcode("group", (collection) => {
    const groups = new Map();
    for (const item of collection) {
      const key = item.date.getUTCFullYear();
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(item);
    }
    return Array.from(groups.keys())
      .sort((a, b) => b - a)
      .map((year) => ({ title: year, items: groups.get(year) }));
  });
  config.addShortcode("icon", (name) => feather.icons[name].toSvg());
  config.addShortcode("iso", (date) =>
    [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()]
      .map((value, index) =>
        value.toString().padStart(index === 0 ? 4 : 2, "0")
      )
      .join("-")
  );
  config.addShortcode("limit", (array, limit) => array.slice(0, limit));
  config.addShortcode("reverse", (array) => Array.from(array).reverse());
  config.addShortcode("utc", (date) =>
    date.toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  );
  // Template Options
  config.setLiquidOptions({ timezoneOffset: 0 });
  // Configuration
  return { dir: { input: "src" } };
};
