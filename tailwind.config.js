module.exports = {
    purge: ["./src/**/*.tsx"],
    darkMode: false,
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        a: {
                            "text-decoration": "none",
                            '&:focus': {
                                outline: "none",
                                "text-decoration": "underline",
                            },
                        },
                    },
                },
            }
        },
    },
    variants: {
        extend: {
            textDecoration: ["group-focus"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
