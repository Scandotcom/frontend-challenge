const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      current: "currentColor",
      white: colors.white,
      black: colors.black,
      neutral: colors.neutral,
      green: {
        500: "#005A55",
        800: "#003232",
        900: "#002323",
      },
      cream: {
        50: "#FCFCFA",
        200: "#ECECE6",
        300: "#D7D7D2",
      },
      pink: {
        100: "#FFE4E9",
        200: "#FFC3CD",
        300: "#FFA1B0",
        400: "#F98A9C",
        500: "#EB7382",
      },
      error: "#EF4444",
      warning: "#EAB308",
      success: "#10B981",
    },
    extend: {},
  },
  plugins: [],
};
