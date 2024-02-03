/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      neptune: {
        50: "#f2f8f9",
        100: "#dfeeee",
        200: "#c2dedf",
        300: "#87bcbf",
        400: "#66a5aa",
        500: "#4b898f",
        600: "#417279",
        700: "#3a5e64",
        800: "#354f55",
        900: "#304449",
        950: "#1c2b30",
      },
      copperfield: {
        50: "#fcf5f0",
        100: "#f8e8dc",
        200: "#f0ceb8",
        300: "#e6ac8b",
        400: "#d97d54",
        500: "#d3653c",
        600: "#c54f31",
        700: "#a33d2b",
        800: "#833229",
        900: "#6a2c24",
        950: "#391411",
      },
    },
    extend: {},
  },
  plugins: [],
};
