const express = require("express");
const router = express.Router();

// Load Seller model
const Seller = require("./../models/Seller");


// REFERENCE
// Gets list of all sellers
router.get("/", async (req, res) => {
  await Seller.find({}, "sellerID firstName lastName email")
    .then((sellers) => res.json(sellers))
    .catch((err) => res.send(err));
});


/* -------------------------- Endpoints ------------------------ */

/* 
 * GET /sellers/:id
 * Returns the seller with the specified ID
 */
router.get("/:id", async (req, res) => {
  await Seller.findOne({ _id: req.params.id })
    .then((seller) => res.json(seller))
    .catch((err) => res.send(err));
});

/* 
 * POST /sellers
 * Adds a new seller to the Database and returns the created seller
 */
router.post("/", async (req, res) => {
  // Create a new Seller instance with the provided fields
  const { energyListingID, firstName, lastName, email } = req.body;
  const newSeller = new Seller({
    energyListingID: energyListingID,
    firstName: firstName,
    lastName: lastName,
    email: email
  });

  // Save the new seller in the database
  await newSeller.save()
    .then((savedSeller) => res.json(savedSeller))
    .catch((err) => res.send(err));
});

/* 
PUT /sellers/:id
Updates the seller with the specified ID and returns the updated seller
*/


/* 
DELETE /sellers/:id
Deletes the seller with the specified ID and returns 
*/


/* ------------------------------------------------------------- */

module.exports = router;
