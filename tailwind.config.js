/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'gray-46': 'rgb(46,46,46)',
        'black-23': 'rgb(14, 17, 23)'
      },
      fontSize: {
        'xsl': '0.75rem'
      },
    },
  },
  plugins: [],
}

