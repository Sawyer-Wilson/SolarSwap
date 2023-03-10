const mongoose = require("mongoose");
require('dotenv').config();

// Connect to the testing database
module.exports.connect = async () => {
  const connectionString = 'mongodb+srv://' + process.env.DB_USER + 
    ':' + process.env.DB_PASSWORD + '@clustersolarswap.zpruhuy.mongodb.net/'
    + process.env.DB_NAME + '?retryWrites=true&w=majority';

  mongoose.set('strictQuery', false);
  await mongoose.connect(connectionString, {useNewUrlParser: "true"});

  // Wipe database for a clean testing slate 
  const collections = mongoose.connection.collections;

  for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
  }
}

// Disconnect from the testing database
module.exports.disconnect = async () => {
  await mongoose.connection.close();
}

// Remove all data stored in testing database
module.exports.clear = async () => {
  const collections = mongoose.connection.collections;

   for (const key in collections) {
       const collection = collections[key];
       await collection.deleteMany();
   }
}
