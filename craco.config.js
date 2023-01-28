const path = require('path');

module.exports = {
  webpack: {
    alias: { '@': path.resolve(__dirname, './src'),
             '@Home': path.resolve(__dirname, './src/views/Home'),
             '@Buyer': path.resolve(__dirname, './src/views/Buyer'),
             '@Seller': path.resolve(__dirname, './src/views/Seller'),
             '@buttons': path.resolve(__dirname, './src/components/buttons'),
             '@forms': path.resolve(__dirname, './src/components/forms') ,
             '@layouts': path.resolve(__dirname, './src/components/layouts') 
            },
  },
};
