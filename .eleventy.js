const path = require("path");
const htmlMinifier = require("html-minifier");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const pad = (value, length) => {
  let result = value.toString();
  while (result.length < length) {
    result = `0${result}`;
  }
  return result;
};

const configure = config => {
  config.setUseGitIgnore(false);
  config.addPassthroughCopy(path.join("src", "img"));
  config.addPassthroughCopy(path.join("src", "static"));
  config.addShortcode("assets", manifest => {
    if (!manifest) {
      return "";
    }
    return Object.keys(manifest)
      .reverse()
      .map(key => {
        const value = manifest[key];
        switch (path.extname(key)) {
          case ".js":
            return `<script src="${value}" defer></script>`;
          case ".css":
            return `<link rel="stylesheet" href="${value}">`;
          default:
            console.warn(`Unrecognized asset type for ${key}`);
        }
        return "";
      })
      .join("");
  });
  config.addShortcode("reverse", array => Array.from(array).reverse());
  config.addShortcode("limit", (array, limit) => array.slice(0, limit));
  config.addShortcode(
    "iso",
    date =>
      `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(
        date.getDate(),
        2,
      )}`,
  );
  config.addShortcode("group", collection => {
    const keys = [];
    const data = collection.reduce((map, item) => {
      const year = item.date.getFullYear();
      if (map[year] === undefined) {
        map[year] = [];
        keys.push(year);
      }
      map[year].push(item);
      return map;
    }, {});
    return keys.map(title => {
      const collection = data[title];
      return { title, collection };
    });
  });
  config.addCollection("posts", collection =>
    collection.getFilteredByGlob("*/blog/**/*.md"),
  );
  config.addTransform("html-minifier", (content, outputPath) => {
    if (outputPath.endsWith("html")) {
      return htmlMinifier.minify(content, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
      });
    }
    return content;
  });
  config.addPlugin(syntaxHighlight);
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};

module.exports = configure;
