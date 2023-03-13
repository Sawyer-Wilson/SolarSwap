// setup express application
const express = require("express");
const app = express();

// use Helmet to secure HTTP headers
const helmet = require("helmet");
app.use(helmet());

// express body parser for request objects
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/sellers", require("./routes/sellers"));
app.use("/sellers/:id/offers", require("./routes/offers"));
app.use("/energy-listings", require("./routes/energy-listings"));

// If in production environment ... serve static REACT files
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
  });
}

module.exports = app;
