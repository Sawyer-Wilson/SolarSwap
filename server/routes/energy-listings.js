const express = require("express");
const router = express.Router();

// Load SellerListing model
const EnergyListing = require("../models/EnergyListing");

/* -------------------------- Endpoints ------------------------ */

// Gets list of every energy listing
router.get("/", async (req, res) => {
  await EnergyListing.find({}, "")
    .then((energyListings) => res.json(energyListings))
    .catch((err) => res.send(err));
});

/* ------------------------------------------------------------- */

module.exports = router;
