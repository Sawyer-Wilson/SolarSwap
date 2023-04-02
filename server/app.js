// setup express application
const express = require("express");
const app = express();

// load environment variables 
require('dotenv').config();

// connect to MongoDB database
const connection = require('./config/database');

// setup Passport and sessions for endpoint authentication
var passport = require('passport');
require('./config/passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// create session, cookie, and database store
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, 
  store: MongoStore.create({
    client: connection.getClient(),
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24  // equals 1 day
  }
}));

// refreshing passport middleware every time we load a route => checks that there is a logged in user
app.use(passport.initialize());
app.use(passport.session());

// use Helmet to secure HTTP headers
const helmet = require("helmet");
app.use(helmet());

// express body parser for request objects
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/sellers", require("./routes/sellers"));
app.use("/sellers/:id/offers", require("./routes/offers"));
app.use("/energy-listings", require("./routes/energy-listings"));
app.use("/auth", require("./routes/auth"));

// If in production environment ... serve static REACT files
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
  });
}

module.exports = app;
