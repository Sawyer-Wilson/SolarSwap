const express = require("express");
const router = express.Router();
const passport = require('passport');
const { encrypt } = require('./../utils/encryption');

// Load Seller model
const Seller = require("./../models/Seller");

/* -------------------------- Endpoints ------------------------ */

/* 
 * POST /auth/login
 * Authenticates a user, sets session token in database, and adds cookie 
 * containing session token to the response header using Passport.js.
 * Returns the user ID if authorized and "Unauthorized" if not
 */
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json(req.user._id);
});


/* 
 * POST /auth/register
 * Adds a user to the database and logs them in, returning their user ID
 */
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let error = {};

  // Check to make sure email is not already in use
  if (email) {
    try {
      const sellerId = await Seller.exists({ email: email });
      if (sellerId) {
        error = { error: "Email already in use" };
      }
    } catch (err) {
      error = err;
    }
  }

  // Ensure a password was provided
  if (!password) {
    error= "Must provide a password";
  }

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }

  // Encrypt user provided password
  const { salt, encryptedPass } = encrypt(password);

  // Create a new Seller instance with the provided fields and encrypted pass
  const newSeller = new Seller({
    firstName: firstName,
    lastName: lastName,
    email: email,
    hash: encryptedPass,
    salt: salt
  });

  // Save the new seller in the database
  let savedSeller;
  try {
    savedSeller = await newSeller.save();
  } catch (error) {
    res.status(400).json(error);
  }

  // Login and return created seller
  req.login(savedSeller, ((err) => {
    if (err) { 
      res.status(400).json(err);
      return next(err); 
    } else {
      res.status(200).json(savedSeller._id);
    }
  }));
});


/* 
 * POST /auth/logout
 * Logs out a user
 */
router.post('/logout', (req, res) => {
  req.logout(((err) => {
    if (err) {
      res.status(400).json(err);
      return next(err); 
    } else {
      res.status(200).json({ message: "Successfully logged out" });
    }
  }));
});


/* 
 * GET /auth/current-user
 * Verify a user's session cookie and return the logged in user's ID or false
 * to signify user is not logged in
 */
router.get('/current-session', (req, res) => {
  if (req.user) {
    res.send(req.user._id);
  } else {
    res.send(false)
  }
});


module.exports = router;