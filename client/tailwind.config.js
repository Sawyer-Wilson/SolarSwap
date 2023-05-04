const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.js", "./public/index.html"],
  theme: {
    extend: {},
    colors: {
      'rose': {
        light: '#F43F5E',
        dark: '#BE123C'
      },
      'blue': {
        light: '#5AADD3',
        dark: '#2f88b1'
      },
      'red': colors.red,
      'green': colors.green,
      'gray': colors.gray,
      'white': colors.white,
    },
  },
  plugins: [],
}