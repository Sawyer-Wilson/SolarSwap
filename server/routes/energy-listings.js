const express = require("express");
const { requireLogin, requireListingID } = require("../middleware/authenticate");
const router = express.Router();

// Load SellerListing model
const EnergyListing = require("./../models/EnergyListing");

/* -------------------------- Endpoints ------------------------ */

/* 
 * GET /energy-listings
 * Returns all active energy listings
 */
router.get("/", async (req, res) => {
  try {
    const listings = await EnergyListing.find({ isActive: true });
    if (listings.length === 0) {
      res.status(404).json({ error: "No Active Energy Listings Found"});
    } else {
      res.status(200).json(listings);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});


/* 
 * GET /energy-listings/:id
 * Returns the energy listing with the specified ID
 */
router.get("/:id", requireListingID, async (req, res) => {
  try {
    const listing = await EnergyListing.findById(req.params.id);
    if (listing) {
      res.status(200).json(listing);
    } else {
      res.status(404).json({ error: "Energy Listing not found"});
    }
  } catch (error) {
    res.status(400).json(error);
  }
});


/* 
 * POST /energy-listings
 * Adds a new energy listing to the Database and returns the created listing
 */
router.post("/", requireLogin, async (req, res) => {
  const { sellerID, sellerFirstName, municipality, utilityProvider, 
          avgMonthlyOverage, pctOverageToSell, askingRate } = req.body;
  let error = {};

  // Make sure there are no other listings associated with that seller
  if (sellerID) {
    try {
      const listingId = await EnergyListing.exists({ sellerID: sellerID });
      if (listingId) {
        error = { error: "SellerID already associated with an Energy Listing" };
      }
    } catch (err) {
      error = err;
    }
  }

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }

  // Create a new Energy Listing instance with the provided fields
  const newListing = new EnergyListing({
    sellerID: sellerID, 
    sellerFirstName: sellerFirstName,
    municipality: municipality, 
    utilityProvider: utilityProvider, 
    avgMonthlyOverage: avgMonthlyOverage, 
    pctOverageToSell: pctOverageToSell,
    askingRate: askingRate
  });

  // Save the new Energy Listing in the database
  try {
    const savedListing = await newListing.save();
    res.status(200).json(savedListing);
  } catch (error) {
    res.status(400).json(error);
  }
});


/* 
 * PUT /energy-listings
 * Updates the energy listing with the specified ID and returns the updated 
 * listing
 */
router.put("/:id", requireListingID, async (req, res) => {
  const { sellerFirstName, municipality, utilityProvider, avgMonthlyOverage, 
          pctOverageToSell, askingRate } = req.body;
  const { id } = req.params;
  let error = {};
  let errorCode = 400;

  // Ensure energy listing exists
  let listing;
  try {
    const foundListing = await EnergyListing.findById(id);
    if (!foundListing) {
      error = { message: `No energy listing found with id: ${id}` };
      errorCode = 404;
    } else {
      listing = foundListing;
    }
  } catch (err) {
    error = err;
  }

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(errorCode).json(error);
  }

  // Update fields
  if (sellerFirstName) listing.sellerFirstName = sellerFirstName;
  if (municipality) listing.municipality = municipality;
  if (utilityProvider) listing.utilityProvider = utilityProvider;
  if (avgMonthlyOverage) listing.avgMonthlyOverage = avgMonthlyOverage;
  if (pctOverageToSell) listing.pctOverageToSell = pctOverageToSell;
  if (askingRate) listing.askingRate = askingRate;

  // Save updated energy listing to database
  try {
    const updatedListing = await listing.save();
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(400).json(error);
  }
});


/* 
 * DELETE /energy-listings/:id
 * Deletes the energy listing with the specified ID
 */
router.delete("/:id", requireListingID, async (req, res) => {
  const { id } = req.params;
  let error = {};
  let errorCode = 400;

  // Ensure listing exists
  try {
    const listingId = await EnergyListing.exists({ _id: id});
    if (!listingId) {
      error = { message: `No Energy Listing found with id: ${id}` };
      errorCode = 404;
    }
  } catch (err) {
    error = err;
  }

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(errorCode).json(error);
  }

  // Delete energy listing from database
  try {
    await EnergyListing.findByIdAndDelete(id);
    res.status(200).json({ _id: id });
  } catch (err) {
    res.status(400).json(err);
  }
});

/* ------------------------------------------------------------- */

module.exports = router;
