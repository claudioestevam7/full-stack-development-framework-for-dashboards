/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f6e1d6",
          200: "#edc4ac",
          300: "#e3a683",
          400: "#da8959",
          500: "#d16b30",
          600: "#a75626",
          700: "#7d401d",
          800: "#542b13",
          900: "#2a150a"
        },
        secundary: {
          100: "#d2dce4",
          200: "#a6bac9",
          300: "#7997ae",
          400: "#4d7593",
          500: "#205278",
          600: "#1a4260",
          700: "#133148",
          800: "#0d2130",
          900: "#061018"
        },
      }

    },
  },
  plugins: [],
}