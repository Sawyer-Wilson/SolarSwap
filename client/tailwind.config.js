const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.js", "./public/index.html"],
  theme: {
    extend: {},
    colors: {
      'red': {
        light: '#F43F5E',
        dark: '#BE123C'
      },
      'blue': '#5AADD3',
      'gray': colors.gray,
      'white': colors.white,
    },
  },
  plugins: [],
}