/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          900: "#4B1979",
          700: "#7126B5",
          500: "#A06ECE",
          300: "#D0B7E6",
          100: "#E2D4F0",
        },
        gray: {
          900: "#8A8A8A",
          700: "#D0D0D0",
          500: "#E5E5E5",
          200: "#EEEEEE",
        },
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
