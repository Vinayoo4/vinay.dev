/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        foreground: '#111827',
        tech: '#233CB5',
        naturals: '#2F4F2F',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant"', 'serif'],
        sans: ['"Inter"', '"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}