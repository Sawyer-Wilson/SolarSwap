const express = require("express");
const router = express.Router();

// Load seller model
const Seller = require("./../models/Seller");

/* -------------------------- Endpoints ------------------------ */

// Register a seller
// TODO: 
// - add contraints + check that user is not already registered 
// - make sellerID auto incriment 
router.post("/register", async (req, res) => {
  const { sellerID, firstName, lastName, email, energyListed } = req.body;
  
  let newSeller = new Seller({
    sellerID: sellerID,
    firstName: firstName,
    lastName: lastName,
    email: email,
    energyListed: energyListed
  });

  newSeller.save()
    .then((result) => {
      console.log(result);
      res.send("New seller added to database!")
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  
});

// Gets list of all sellers
router.get("/", async (req, res) => {

  console.log("getting list of all sellers...");

  res.send("Here's a list of all the sellers: [john, jake, carly]");

});

/* ------------------------------------------------------------- */


module.exports = router;
