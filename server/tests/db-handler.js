const mongoose = require("mongoose");
require('dotenv').config();

// Connect to the testing database
module.exports.connect = async () => {
  const connectionString = 'mongodb+srv://' + process.env.DB_USER + 
    ':' + process.env.DB_PASSWORD + '@clustersolarswap.zpruhuy.mongodb.net/'
    + process.env.DB_NAME + '?retryWrites=true&w=majority';

  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(connectionString, {useNewUrlParser: "true"});
  } catch (error) {
    process.exit(error);
  }
}

// Disconnect from the testing database
module.exports.disconnect = async () => {
  try {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  } catch (error) {
    process.exit(error);
  }
}

// Remove all data stored in testing database
module.exports.clear = async () => {
  try {
    await mongoose.connection.db.dropDatabase();
  } catch (error) {
    process.exit(error);
  }
}
