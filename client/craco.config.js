const path = require('path');

module.exports = {
  webpack: {
    alias: { '@utils': path.resolve(__dirname, './src/utils'),
             '@views': path.resolve(__dirname, './src/views'),
             '@components': path.resolve(__dirname, './src/components')
            },
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
