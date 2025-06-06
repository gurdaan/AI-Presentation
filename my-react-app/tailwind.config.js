/** @type {import('tailwindcss').Config} */
module.exports = { // Note: CRA uses module.exports syntax
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS, JSX, TS, TSX files in the src folder
    "./public/index.html",         // Also scans your main HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}