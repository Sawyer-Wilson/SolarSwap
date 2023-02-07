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

// Cors - TODO: make sure this works
const cors = require("cors");
app.use(
	cors({
		origin: ["http://localhost:3000"],  // TODO: add production link
		credentials: true,
	})
);

// routes
app.use("/sellers", require("./routes/sellers"));
app.use("/listings", require("./routes/sellers_listings"));

// start the server
app.listen(PORT, console.log(`Server listing on PORT: ${PORT}`));
