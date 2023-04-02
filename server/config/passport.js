const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Seller = require('../models/Seller');
const { isEqual } = require('./../utils/encryption');

// Authentication is based on these fields
const customFields = {
  usernameField: 'email', 
  passwordField: 'password'
};

// Verify a user's credentials 
async function verifyCredentials (email, password, done) {
  try {
    const seller = await Seller.findOne({ email : email });
    if (!seller) {
      return done(null, false);
    }
    const isVerified = isEqual(password, seller.hash, seller.salt); 
    if (isVerified) {
      return done(null, seller);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

// Use a local strategy (i.e. email and username to login)
const strategy = new LocalStrategy(customFields, verifyCredentials);
passport.use(strategy);

// Save user id value in the user session
passport.serializeUser((seller, done) => {
  done(null, seller.id);
})

// Get user from database by their ID
passport.deserializeUser(async (sellerId, done) => {
  try {
    const seller = await Seller.findById(sellerId);
    done (null, seller);
  } catch (error) {
    done(error);
  }
});
