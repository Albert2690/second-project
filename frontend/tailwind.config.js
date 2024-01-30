/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "bg-gradient-to-r from-blue-300 to-cyan-200",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4E545F",
        'blue-gray': {
          50: '#f8fafc',
          100: '#f1f5f9',
          // ... other shades
        },
      },
    },
  },
  plugins: [],
}