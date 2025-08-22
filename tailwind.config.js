/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "vertical-lines": `repeating-linear-gradient(
          to right,
          rgba(0, 0, 0, 0.05) 1px,
          transparent 1px,
          transparent 100px
        )`,
      },
    },
  },
  plugins: [],
};
