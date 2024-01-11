/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'weatherBg': "url('../../img/bgimg.jpg')",
      },
      fontFamily: {
        maven: ['Maven Pro', 'sans-serif']
      }
    },
  },
  plugins: [],
}