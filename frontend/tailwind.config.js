/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1C2536",
        "secondary": "#9747FF",
        "text-blue": "#492CFF",
        "button-blue": "#3793FE",
        "button-blue-hover": "#3B37FE",
        "black": "#040507",
        "white": "#FFFFFF",
        "gray": "#9DA4AE",
      }
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"]
    }
  },
  plugins: [],
}

