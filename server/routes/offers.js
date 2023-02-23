const express = require("express");
const router = express.Router();

// Load Offer model
const Offer = require("../models/Offer");

/* -------------------------- Endpoints ------------------------ */

// Gets list of every offer
router.get("/", async (req, res) => {
  await Offer.find({}, "")
    .then((offers) => res.json(offers))
    .catch((err) => res.send(err));
});

/* ------------------------------------------------------------- */

module.exports = router;
