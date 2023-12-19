/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '24': '24px',
      },
      borderRadius: {
        '20': '20px',
      },
      colors: {
        primary: {
          100: "#dedee0",
          200: "#bdbec1",
          300: "#9b9da1",
          400: "#7a7d82",
          500: "#595c63",
          600: "#474a4f",
          700: "#35373b",
          800: "#242528",
          900: "#121214"
        },
        secundary: {
          100: "#fad3d1",
          200: "#f5a7a4",
          300: "#ef7b76",
          400: "#ea4f49",
          500: "#e5231b",
          600: "#b71c16",
          700: "#891510",
          800: "#5c0e0b",
          900: "#2e0705"
        },
        tertiary: {
          100: "#e7e7e7",
          200: "#cfcece",
          300: "#b7b6b6",
          400: "#9f9d9d",
          500: "#878585",
          600: "#6c6a6a",
          700: "#515050",
          800: "#363535",
          900: "#1b1b1b"
        },
        fourth: {
          100: "#d9deee",
          200: "#b3bddc",
          300: "#8c9ccb",
          400: "#667bb9",
          500: "#405aa8",
          600: "#334886",
          700: "#263665",
          800: "#1a2443",
          900: "#0d1222"
        },


      }

    },
  },
  layers: {
    utilities: ['custom-stroke'],
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.custom-stroke': {
          '-webkit-text-stroke-width': '2px',
          '-webkit-text-stroke-color': '#fff',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}