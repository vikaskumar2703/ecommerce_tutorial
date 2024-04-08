/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { honk: ["Honk", "system-ui"] },
    },
  },
  plugins: [],
  fontFamily: {
    sans: ["Roboto", "sans-serif"],
  },
};
