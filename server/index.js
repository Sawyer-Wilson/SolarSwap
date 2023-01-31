// setup express server
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3001

// express body parser for request objects
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup MongoDB database connection through Mongoose
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://admin:vKj8V4k6rles2CDu@clustersolarswap.zpruhuy.mongodb.net/solarSwapDB?retryWrites=true&w=majority", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

// Cors
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
