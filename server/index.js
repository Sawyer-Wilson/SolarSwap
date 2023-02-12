// setup express server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

// load environment variables 
require('dotenv').config();

// express body parser for request objects
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup MongoDB database connection through Mongoose
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.set('strictQuery', false);
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clustersolarswap.zpruhuy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", err => {
  console.log("err", err)
});
mongoose.connection.on("connected", () => {
  console.log("mongoose is connected")
});

// CORS
// const cors = require('cors');
// app.use(cors({
//     origin: 'https://www.solarswap.org'
// }));

// routes
app.use("/sellers", require("./routes/sellers"));
app.use("/listings", require("./routes/sellers_listings"));

// If in production environment ... serve static REACT files
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
  });
}

// start the server
app.listen(PORT, console.log(`Server listing on PORT: ${PORT}`));
