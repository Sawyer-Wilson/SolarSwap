const express = require("express");
const router = express.Router();

// Load Seller model
const Seller = require("./../models/Seller");

/* -------------------------- Endpoints ------------------------ */

/* 
 * GET /sellers/:id
 * Returns the seller with the specified ID
 */
router.get("/:id", async (req, res) => {
  await Seller.findById(req.params.id)
    .then((seller) => {
      if (seller) {
        res.status(200).json(seller);
      } else {
        res.status(404).json({ error: "Seller not found"});
      }
    })
    .catch((err) => res.status(400).json(err));
});


/* 
 * POST /sellers
 * Adds a new seller to the Database and returns the created seller
 */
router.post("/", async (req, res) => {
  const { energyListingID, firstName, lastName, email } = req.body;
  let error = {};

  // Check to make sure seller does not already exist
  if (email) {
    await Seller.exists({ email: email })
      .then((sellerId) => {
        if (sellerId) {
          error = { error: "User already exists" };
        }
      })
      .catch((err) => { error = err });
  }

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }

  // Create a new Seller instance with the provided fields
  const newSeller = new Seller({
    energyListingID: energyListingID,
    firstName: firstName,
    lastName: lastName,
    email: email
  });

  // Save the new seller in the database
  await newSeller.save()
    .then((savedSeller) => res.status(200).json(savedSeller))
    .catch((err) => res.status(400).json(err));
});


/* 
 * PUT /sellers/:id
 * Updates the seller with the specified ID and returns the updated seller
 */
router.put("/:id", async (req, res) => {
  const { energyListingID, firstName, lastName, email } = req.body;
  const { id } = req.params;
  let error = {};

  // Ensure seller exists
  let seller;
  await Seller.findById(id)
    .then((foundSeller) => {
      if (!foundSeller) {
        error = { message: `No seller found with id: ${id}` };
      } else {
        seller = foundSeller;
      }
    })
    .catch((err) => { error = err });

  // Ensure email is unique
  if (email) {
    await Seller.exists({ email: email })
      .then((sellerId) => {
        if (sellerId) {
          error = { error: `Another user with email: ${email} already exists` };
        }
      })
      .catch((err) => { error = err });
  }

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }

  // Update fields
  if (energyListingID) seller.energyListingID = energyListingID;
  if (firstName) seller.firstName = firstName;
  if (lastName) seller.lastName = lastName;
  if (email) seller.email = email;

  // Save updated seller to database
  await seller.save()
    .then((seller) => res.status(200).json(seller))
    .catch((err) => res.status(400).json(err));
});


/* 
 * DELETE /sellers/:id
 * Deletes the seller with the specified ID and returns 
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let error = {};

  // Ensure seller exists
  await Seller.exists({ _id: id})
    .then((sellerId) => {
      if (!sellerId) {
        error = { message: `No seller found with id: ${id}` };
      }
    })
    .catch((err) => { error = err });

    // Return immediately if any errors were found
    if (Object.keys(error).length > 0) {
      return res.status(400).json(error);
    }

  // Delete seller from database
  await Seller.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Deleted seller with id: ${id}` }))
    .catch((err) => res.status(400).json(err));
});

/* ------------------------------------------------------------- */

module.exports = router;
