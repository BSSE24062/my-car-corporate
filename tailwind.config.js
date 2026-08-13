/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'bg-1':'#070708',
        'bg-2':'#0E0E10',
        'accent':'#D1C7BD'
      },
      fontFamily: {
        display: ['Syne','Cormorant Garamond','serif'],
        sans: ['Plus Jakarta Sans','Satoshi','ui-sans-serif']
      }
    }
  },
  plugins: []
};
