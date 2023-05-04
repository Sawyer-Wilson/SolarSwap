const express = require("express");
const { requireSellerID } = require("../middleware/authenticate");
const router = express.Router({mergeParams: true});

// Load Offer model
const Offer = require("./../models/Offer");

/* -------------------------- Endpoints ------------------------ */

/* 
 * GET /sellers/:id/offers
 * Returns all the offers of the seller with the specified ID
 */
router.get("/", requireSellerID, async (req, res) => {
  try {
    const offers = await Offer.find({ sellerID: req.params.id });
    res.status(200).json(offers);
  } catch (error) {
    res.status(400).json(error);
  }
});

/* 
 * POST /sellers/:id/offers
 * Adds a new offer to the Database linked to the seller with the specified ID
 * and returns the created offer
 */
router.post("/", async (req, res) => {
  const { email, message, amount } = req.body;

  // Create a new Offer instance with the provided fields
  const newOffer = new Offer({
    sellerID: req.params.id,
    email: email,
    message: message,
    amount: amount
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
router.delete("/:offerId", requireSellerID, async (req, res) => {
  const { offerId } = req.params;
  let error = {};
  let errorCode = 400;

  // Ensure offer exists
  try {
    const id = await Offer.exists({ _id: offerId});
    if (!id) {
      error = { message: `No offer found with id: ${offerId}` };
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
    await Offer.findByIdAndDelete(offerId);
    res.status(200).json({ _id: offerId });
  } catch (error) {
    res.status(400).json(error);
  }
});

/* ------------------------------------------------------------- */

module.exports = router;
