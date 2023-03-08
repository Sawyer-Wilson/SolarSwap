const express = require("express");
const router = express.Router({mergeParams: true});

// Load Offer model
const Offer = require("./../models/Offer");

/* -------------------------- Endpoints ------------------------ */

/* 
 * GET /sellers/:id/offers
 * Returns all the offers of the seller with the specified ID
 */
router.get("/", async (req, res) => {
  await Offer.find({ sellerID: req.params.id })
    .then((offers) => {
      if (offers.length === 0) {
        res.status(404).json({ error: "No Offers Found for specified seller" });
      } else {
        res.status(200).json(offers);
      }
    })
    .catch((err) => res.status(400).json(err));
});

/* 
 * POST /sellers/:id/offers
 * Adds a new offer to the Database linked to the seller with the specified ID
 * and returns the created offer
 */
router.post("/", async (req, res) => {
  const { email, message } = req.body;

  // Create a new Offer instance with the provided fields
  const newOffer = new Offer({
    sellerID: req.params.id,
    email: email,
    message: message
  });

  // Save the new offer in the database
  await newOffer.save()
    .then((savedOffer) => res.status(200).json(savedOffer))
    .catch((err) => res.status(400).json(err));
});

/* 
 * DELETE /sellers/:id/offers/:id
 * Deletes the offer with the specified ID
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let error = {};

  // Ensure offer exists
  await Offer.exists({ _id: id})
    .then((offerId) => {
      if (!offerId) {
        error = { message: `No offer found with id: ${id}` };
      }
    })
    .catch((err) => { error = err });

    // Return immediately if any errors were found
    if (Object.keys(error).length > 0) {
      return res.status(400).json(error);
    }

  // Delete offer from database
  await Offer.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: `Deleted offer with id: ${id}` })
    })
    .catch((err) => res.status(400).json(err));
});

/* ------------------------------------------------------------- */

module.exports = router;
