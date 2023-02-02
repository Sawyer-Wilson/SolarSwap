const { response } = require("express");
const express = require("express");
const router = express.Router();

// Load seller model
const Seller = require("./../models/Seller");

/* -------------------------- Endpoints ------------------------ */

// Register a seller
// TODO: 
// - add contraints + check that user is not already registered 
// - make sellerID auto incriment 
router.post("/", async (req, res) => {
  const { sellerID, firstName, lastName, email, energyListed } = req.body;
  
  let newSeller = new Seller({
    sellerID: sellerID,
    firstName: firstName,
    lastName: lastName,
    email: email,
    energyListed: energyListed
  });

  await newSeller.save()
    .then((result) => res.json(newSeller))
    .catch((err) => res.send(err));
});

// Gets list of all sellers
router.get("/", async (req, res) => {
  await Seller.find({}, "sellerID firstName lastName email")
    .then((sellers) => res.json(sellers))
    .catch((err) => res.send(err));
});

/* ------------------------------------------------------------- */


module.exports = router;
