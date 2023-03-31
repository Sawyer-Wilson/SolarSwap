const express = require("express");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router({mergeParams: true});

// Load Offer model
const Offer = require("./../models/Offer");

/* -------------------------- Endpoints ------------------------ */

/* 
 * GET /sellers/:id/offers
 * Returns all the offers of the seller with the specified ID
 */
router.get("/", requireLogin, async (req, res) => {
  try {
    const offers = await Offer.find({ sellerID: req.params.id });
    if (offers.length === 0) {
      res.status(404).json({ error: "No Offers Found for specified seller" });
    } else {
      res.status(200).json(offers);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

/* 
 * POST /sellers/:id/offers
 * Adds a new offer to the Database linked to the seller with the specified ID
 * and returns the created offer
 */
router.post("/", requireLogin, async (req, res) => {
  const { email, message } = req.body;

  // Create a new Offer instance with the provided fields
  const newOffer = new Offer({
    sellerID: req.params.id,
    email: email,
    message: message
  });

  // Save the new offer in the database
  try {
    const savedOffer = await newOffer.save();
    res.status(200).json(savedOffer);
  } catch (error) {
    res.status(400).json(error)
  }
});

/* 
 * DELETE /sellers/:id/offers/:id
 * Deletes the offer with the specified ID
 */
router.delete("/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  let error = {};
  let errorCode = 400;

  // Ensure offer exists
  try {
    const offerId = await Offer.exists({ _id: id});
    if (!offerId) {
      error = { message: `No offer found with id: ${id}` };
      errorCode = 404;
    }
  } catch (err) {
    error = err;
  }

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(errorCode).json(error);
  }

  // Delete offer from database
  try {
    await Offer.findByIdAndDelete(id);
    res.status(200).json({ _id: id });
  } catch (error) {
    res.status(400).json(err);
  }
});

/* ------------------------------------------------------------- */

module.exports = router;
