module.exports = {
    purge: ["./src/**/*.tsx"],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            textDecoration: ["group-focus"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
