const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        white: colors.white,
        gray: colors.trueGray,
        blue: colors.blue,
        red: colors.red,
        green: colors.emerald,
        yellow: colors.yellow,
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray.100"),
            a: {
              color: theme("colors.blue.100"),
              "&:hover": {
                color: theme("colors.blue.100"),
              },
            },
            h1: {
              color: theme("colors.gray.300"),
            },
            h2: {
              color: theme("colors.gray.300"),
            },
            h3: {
              color: theme("colors.gray.300"),
            },
            h4: {
              color: theme("colors.gray.300"),
            },
            h5: {
              color: theme("colors.gray.300"),
            },
            h6: {
              color: theme("colors.gray.300"),
            },
            strong: {
              color: theme("colors.gray.100"),
            },
            code: {
              color: theme("colors.gray.200"),
            },
            blockquote: {
              color: theme("colors.gray.200"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
