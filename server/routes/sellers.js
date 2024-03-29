const express = require("express");
const { requireSellerID } = require("../middleware/authenticate");
const { encrypt } = require('./../utils/encryption');
const router = express.Router();

// Load Seller model
const Seller = require("./../models/Seller");

/* -------------------------- Endpoints ------------------------ */

/* 
 * GET /sellers/:id
 * Returns the seller with the specified ID
 */
router.get("/:id", requireSellerID, async (req, res) => {
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
 * PUT /sellers/:id
 * Updates the seller with the specified ID and returns the updated seller
 */
router.put("/:id", requireSellerID, async (req, res) => {
  const { listingID, firstName, lastName, email, password } = req.body;
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
  if (email && email !== seller.email) {
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
  if (listingID === "NONE") { seller.listingID = undefined }
  else if (listingID) { seller.listingID = listingID }
  if (firstName) seller.firstName = firstName;
  if (lastName) seller.lastName = lastName;
  if (email) seller.email = email;
  if (password) { 
    const { salt, encryptedPass } = encrypt(password);
    seller.salt = salt;
    seller.hash = encryptedPass;
  }

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
router.delete("/:id", requireSellerID, async (req, res) => {
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
