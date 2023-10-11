/** @type {import('tailwindcss').Config} */
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")

export default {
  darkMode: 'class',
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / 0.1)",
        ring: "hsl(var(--ring)/0.3)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: { sans: ['Outfit', 'sans'], heading: ['Bespoke Stencil', 'sans'] },
      maxWidth: {
        '8xl': '100rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(["lucide", 'simple-icons', 'ic']),
    }),
  ],
};