/** @type {import('tailwindcss').Config} */

const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")


export default {
  darkMode: 'class',
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', 'sans'] },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(["lucide"]),
    }),
  ],
};