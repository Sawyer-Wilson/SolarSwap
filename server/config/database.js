// Setup MongoDB database connection through Mongoose
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` + 
            `@clustersolarswap.zpruhuy.mongodb.net/${process.env.DB_NAME}` + 
            `?retryWrites=true&w=majority`;

// Attempt to connect
mongoose.connect(uri, {useNewUrlParser: "true"});
mongoose.connection.on("error", err => {
  console.log("err", err)
});
mongoose.connection.on("connected", () => {
  console.log("mongoose is connected")
});

module.exports = mongoose.connection;