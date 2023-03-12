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
  try {
    const seller = await Seller.findById(req.params.id);
    if (seller) {
      res.status(200).json(seller);
    } else {
      res.status(404).json({ error: "Seller not found"});
    }
  } catch (error) {
    res.status(400).json(error);
  }
});


/* 
 * POST /sellers
 * Adds a new seller to the Database and returns the created seller
 */
router.post("/", async (req, res) => {
  const { energyListingID, firstName, lastName, email } = req.body;
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
  try {
    const savedSeller = await newSeller.save();
    res.status(200).json(savedSeller);
  } catch (error) {
    res.status(400).json(error);
  }
});


/* 
 * PUT /sellers/:id
 * Updates the seller with the specified ID and returns the updated seller
 */
router.put("/:id", async (req, res) => {
  const { energyListingID, firstName, lastName, email } = req.body;
  const { id } = req.params;
  let error = {};
  let errorCode = 400;

  // Ensure seller exists
  let seller;
  try {
    const foundSeller = await Seller.findById(id);
    if (!foundSeller) {
      error = { message: `No seller found with id: ${id}` };
      errorCode = 404;
    } else {
      seller = foundSeller;
    }
  } catch (err) {
    error = err;
  }

  // Ensure email is unique
  if (email) {
    try {
      const sellerId = await Seller.exists({ email: email });
      if (sellerId) {
        error = { error: `Another user with email: ${email} already exists` };
      }
    } catch (err) {
      error = err;
    }
  }

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(errorCode).json(error);
  }

  // Update fields
  if (energyListingID) seller.energyListingID = energyListingID;
  if (firstName) seller.firstName = firstName;
  if (lastName) seller.lastName = lastName;
  if (email) seller.email = email;

  // Save updated seller to database
  try {
    const savedSeller = await seller.save();
    res.status(200).json(savedSeller);
  } catch (error) {
    res.status(400).json(error);
  }
});


/* 
 * DELETE /sellers/:id
 * Deletes the seller with the specified ID
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let error = {};
  let errorCode = 400;

  // Ensure seller exists
  try {
    const sellerId = await Seller.exists({ _id: id});
    if (!sellerId) {
      error = { message: `No seller found with id: ${id}` };
      errorCode = 404;
    }
  } catch (err) {
    error = err
  }

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(errorCode).json(error);
  }

  // Delete seller from database
  try {
    await Seller.findByIdAndDelete(id);
    res.status(200).json({ _id: id });
  } catch (error) {
    res.status(400).json(error);
  }
});

/* ------------------------------------------------------------- */

module.exports = router;
