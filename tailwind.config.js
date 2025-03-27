/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4FD1C5'
      },
      boxShadow: {
        custom: '0px 7px 23px 0px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  plugins: []
};
