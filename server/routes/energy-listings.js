const express = require("express");
const router = express.Router();

// Load SellerListing model
const EnergyListing = require("./../models/EnergyListing");

/* -------------------------- Endpoints ------------------------ */

/* 
 * GET /energy-listings
 * Returns all energy listings
 */
router.get("/", async (req, res) => {
  await EnergyListing.find()
    .then((energyListings) => {
      if (energyListings.length === 0) {
        res.status(404).json({ error: "No Energy Listings Found"});
      } else {
        res.status(200).json(energyListings);
      }
    })
    .catch((err) => res.status(400).json(err));
});


/* 
 * GET /energy-listings/:id
 * Returns the energy listing with the specified ID
 */
router.get("/:id", async (req, res) => {
  await EnergyListing.findById(req.params.id)
    .then((energyListing) => {
      if (energyListing) {
        res.status(200).json(energyListing);
      } else {
        res.status(404).json({ error: "Energy Listing not found"});
      }
    })
    .catch((err) => res.status(400).json(err));
});


/* 
 * POST /energy-listings
 * Adds a new energy listing to the Database and returns the created listing
 */
router.post("/", async (req, res) => {
  const { sellerID, loadZoneID, utilityCompany, annualProduction,
          annualConsumption, avgMonthlyOverage, plannedUsage, pctOverageToSell,
          askingRate } = req.body;
  let error = {};

  // Make sure there are no other listings associated with that seller
  if (sellerID) {
    await EnergyListing.exists({ sellerID: sellerID })
      .then((energyListingID) => {
        if (energyListingID) {
          error = { error: "SellerID already associated with an Energy Listing" };
        }
      })
      .catch((err) => { error = err });
  }

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }

  // Create a new Energy Listing instance with the provided fields
  const newListing = new EnergyListing({
    sellerID: sellerID, 
    loadZoneID: loadZoneID, 
    utilityCompany: utilityCompany, 
    annualProduction: annualProduction,
    annualConsumption: annualConsumption, 
    avgMonthlyOverage: avgMonthlyOverage, 
    plannedUsage: plannedUsage, 
    pctOverageToSell: pctOverageToSell,
    askingRate: askingRate
  });

  // Save the new Energy Listing in the database
  await newListing.save()
    .then((savedListing) => res.status(200).json(savedListing))
    .catch((err) => res.status(400).json(err));
});


/* 
 * PUT /energy-listings
 * Updates the energy listing with the specified ID and returns the updated 
 * listing
 */
router.put("/:id", async (req, res) => {
  const { loadZoneID, utilityCompany, annualProduction, annualConsumption, 
          avgMonthlyOverage, plannedUsage, pctOverageToSell, askingRate 
        } = req.body;
  const { id } = req.params;
  let error = {};

  // Ensure energy listing exists
  let listing;
  await EnergyListing.findById(id)
    .then((foundListing) => {
      if (!foundListing) {
        error = { message: `No energy listing found with id: ${id}` };
      } else {
        listing = foundListing;
      }
    })
    .catch((err) => { error = err });

  // Return immediately if any errors were found
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }

  // Update fields
  if (loadZoneID) listing.loadZoneID = loadZoneID;
  if (utilityCompany) listing.utilityCompany = utilityCompany;
  if (annualProduction) listing.annualProduction = annualProduction;
  if (annualConsumption) listing.annualConsumption = annualConsumption;
  if (avgMonthlyOverage) listing.avgMonthlyOverage = avgMonthlyOverage;
  if (plannedUsage) listing.plannedUsage = plannedUsage;
  if (pctOverageToSell) listing.pctOverageToSell = pctOverageToSell;
  if (askingRate) listing.askingRate = askingRate;

  // Save updated energy listing to database
  await listing.save()
    .then((listing) => res.status(200).json(listing))
    .catch((err) => res.status(400).json(err));
});


/* 
 * DELETE /energy-listings/:id
 * Deletes the energy listing with the specified ID
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let error = {};

  // Ensure listing exists
  await EnergyListing.exists({ _id: id})
    .then((listingId) => {
      if (!listingId) {
        error = { message: `No Energy Listing found with id: ${id}` };
      }
    })
    .catch((err) => { error = err });

    // Return immediately if any errors were found
    if (Object.keys(error).length > 0) {
      return res.status(400).json(error);
    }

  // Delete energy listing from database
  await EnergyListing.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: `Deleted Energy Listing with id: ${id}` })
    })
    .catch((err) => res.status(400).json(err));
});

/* ------------------------------------------------------------- */

module.exports = router;
