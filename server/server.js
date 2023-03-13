const app = require("./app.js")
const PORT = process.env.PORT || 3002;

// load environment variables 
require('dotenv').config();

// Setup MongoDB database connection through Mongoose
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.set('strictQuery', false);
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clustersolarswap.zpruhuy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {useNewUrlParser: "true"});
mongoose.connection.on("error", err => {
  console.log("err", err)
});
mongoose.connection.on("connected", () => {
  console.log("mongoose is connected")
});

// start the server
app.listen(PORT, console.log(`Server listing on PORT: ${PORT}`));
