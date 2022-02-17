module.exports = function configure(eleventyConfig) {
    eleventyConfig.setLiquidOptions({ timezoneOffset: 0 });
    return { dir: { input: "src" } };
};
