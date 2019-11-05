const path = require("path");

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
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};

module.exports = configure;
