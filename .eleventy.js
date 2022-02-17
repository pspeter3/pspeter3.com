module.exports = function configure(eleventyConfig) {
    eleventyConfig.addCollection("posts", (collection) =>
        collection.getFilteredByGlob("*/blog/**/*.md"),
    );
    eleventyConfig.setLiquidOptions({ timezoneOffset: 0 });
    return { dir: { input: "src" } };
};
