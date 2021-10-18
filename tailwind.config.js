const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./src/**/*.tsx"],
    darkMode: "media",
    theme: {
        extend: {
            colors: {
                blue: colors.sky,
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        a: {
                            "text-decoration": "none",
                            "&:focus": {
                                outline: "none",
                                "text-decoration": "underline",
                            },
                        },
                    },
                },
                light: {
                    css: [
                        {
                            color: theme("colors.gray.400"),
                            '[class~="lead"]': {
                                color: theme("colors.gray.300"),
                            },
                            a: {
                                color: theme("colors.blue.300"),
                            },
                            strong: {
                                color: theme("colors.gray.200"),
                            },
                            "ol > li::before": {
                                color: theme("colors.gray.400"),
                            },
                            "ul > li::before": {
                                backgroundColor: theme("colors.gray.600"),
                            },
                            hr: {
                                borderColor: theme("colors.gray.700"),
                            },
                            blockquote: {
                                color: theme("colors.gray.200"),
                                borderLeftColor: theme("colors.gray.700"),
                            },
                            h1: {
                                color: theme("colors.gray.200"),
                            },
                            h2: {
                                color: theme("colors.gray.200"),
                            },
                            h3: {
                                color: theme("colors.gray.200"),
                            },
                            h4: {
                                color: theme("colors.gray.200"),
                            },
                            "figure figcaption": {
                                color: theme("colors.gray.400"),
                            },
                            code: {
                                color: theme("colors.gray.200"),
                            },
                            "a code": {
                                color: theme("colors.blue.300"),
                            },
                            pre: {
                                color: theme("colors.gray.200"),
                                backgroundColor: theme("colors.gray.800"),
                            },
                            thead: {
                                color: theme("colors.gray.200"),
                                borderBottomColor: theme("colors.gray.600"),
                            },
                            "tbody tr": {
                                borderBottomColor: theme("colors.gray.700"),
                            },
                        },
                    ],
                },
            }),
        },
    },
    variants: {
        extend: {
            textDecoration: ["group-focus"],
            typography: ["dark"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
