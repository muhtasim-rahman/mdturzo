/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4958A3', // Indigo-blue from old site
          dark: '#374151',
        },
        accent: {
          light: '#DE6528', // Orange from old site
          dark: '#F97316',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
