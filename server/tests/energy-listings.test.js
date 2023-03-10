const request = require("supertest");
const app = require("../app.js");
const dbHandler = require('./db-handler');
const energyListing = require('../models/EnergyListing.js');

// Connect to the database before the tests get run
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test
afterEach(async () => await dbHandler.clear());

// Disconnect from database after all tests get run
afterAll(async () => await dbHandler.disconnect());

// Example Energy Listings and IDs used for testing
const invalidID = '640144225ddba807cfd501a';
const unusedID = '6401459da2389d29fef1577d';
listings = [
  {
    sellerID: "63fee38d058ec6cf3217bdba",
    loadZoneID: 1,
    utilityCompany: "eversource",
    annualProduction: 75,
    annualConsumption: 50,
    avgMonthlyOverage: 2,
    plannedUsage: "less",
    pctOverageToSell: 100,
    askingRate: 70
  }, {
    sellerID: "63fee38d058ec6cf3217bdbb",
    loadZoneID: 4,
    utilityCompany: "national grid",
    annualProduction: 80,
    annualConsumption: 40,
    avgMonthlyOverage: 4,
    plannedUsage: "more",
    pctOverageToSell: 80,
    askingRate: 65
  }
]

// --------------------------------- TESTS --------------------------------- //

// Get all energy listings
describe("GET /energy-listings/", () => {

  describe("when there are listings in the database", () => {
    // seed database with example listings
    beforeEach(async () => {
      await energyListing.create(listings);
    });
    it("should return an array of listings", async () => {
      await request(app).get(`/energy-listings`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body[1]._id).toBeDefined();
          expect(res.body[1].sellerID).toBe(`${listings[1].sellerID}`);
          expect(res.body[1].loadZoneID).toBe(listings[1].loadZoneID);
          expect(res.body[1].utilityCompany).toBe(listings[1].utilityCompany);
          expect(res.body[1].annualProduction).toBe(listings[1].annualProduction);
          expect(res.body[1].annualConsumption).toBe(listings[1].annualConsumption);
          expect(res.body[1].avgMonthlyOverage).toBe(listings[1].avgMonthlyOverage);
          expect(res.body[1].plannedUsage).toBe(listings[1].plannedUsage);
          expect(res.body[1].pctOverageToSell).toBe(listings[1].pctOverageToSell);
          expect(res.body[1].askingRate).toBe(listings[1].askingRate);
        });
    });
  });

  describe("when there are no listings in the database", () => {
    it("should return 404 with an json error message", async () => {
      await request(app).get(`/energy-listings`)
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });
});

// Get a specific listing
describe("GET /energy-listings/:id", () => {

  // seed database with an example listing and get listing id
  let listingID;
  beforeEach(async () => {
    listingID = (await energyListing.create(listings[0]))._id;
  });

  describe("when the provided id matches a listing", () => {
    it("should return the listing object", async () => {
      await request(app).get(`/energy-listings/${listingID}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body._id).toBe(`${listingID}`);
          expect(res.body.sellerID).toBe(`${listings[0].sellerID}`);
          expect(res.body.loadZoneID).toBe(listings[0].loadZoneID);
          expect(res.body.utilityCompany).toBe(listings[0].utilityCompany);
          expect(res.body.annualProduction).toBe(listings[0].annualProduction);
          expect(res.body.annualConsumption).toBe(listings[0].annualConsumption);
          expect(res.body.avgMonthlyOverage).toBe(listings[0].avgMonthlyOverage);
          expect(res.body.plannedUsage).toBe(listings[0].plannedUsage);
          expect(res.body.pctOverageToSell).toBe(listings[0].pctOverageToSell);
          expect(res.body.askingRate).toBe(listings[0].askingRate);
        });
    });
  });

  describe("when the provided id does not match a listing", () => {
    it("should return 404 with an json error message", async () => {
      await request(app).get(`/energy-listings/${unusedID}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe("when the provided id is invalid", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).get(`/energy-listings/${invalidID}`)
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});

// Add a new listing
describe("POST /energy-listings/", () => {

  describe("when given valid listing parameters", () => {
    it("should save the new listing object in the database", async () => {
      await request(app).post(`/energy-listings`).send(listings[0]);
      const foundListing = await energyListing.findOne({ sellerID: listings[0].sellerID });
      expect(foundListing._id).toBeDefined();
      expect(JSON.stringify(foundListing.sellerID)).toBe(JSON.stringify(listings[0].sellerID));
      expect(foundListing.loadZoneID).toBe(listings[0].loadZoneID);
      expect(foundListing.utilityCompany).toBe(listings[0].utilityCompany);
      expect(foundListing.annualProduction).toBe(listings[0].annualProduction);
      expect(foundListing.annualConsumption).toBe(listings[0].annualConsumption);
      expect(foundListing.avgMonthlyOverage).toBe(listings[0].avgMonthlyOverage);
      expect(foundListing.plannedUsage).toBe(listings[0].plannedUsage);
      expect(foundListing.pctOverageToSell).toBe(listings[0].pctOverageToSell);
      expect(foundListing.askingRate).toBe(listings[0].askingRate);
    });

    it("should return the saved energy listing", async () => {
      await request(app).post(`/energy-listings`)
        .send(listings[0])
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body._id).toBeDefined();
          expect(res.body.sellerID).toBe(`${listings[0].sellerID}`);
          expect(res.body.loadZoneID).toBe(listings[0].loadZoneID);
          expect(res.body.utilityCompany).toBe(listings[0].utilityCompany);
          expect(res.body.annualProduction).toBe(listings[0].annualProduction);
          expect(res.body.annualConsumption).toBe(listings[0].annualConsumption);
          expect(res.body.avgMonthlyOverage).toBe(listings[0].avgMonthlyOverage);
          expect(res.body.plannedUsage).toBe(listings[0].plannedUsage);
          expect(res.body.pctOverageToSell).toBe(listings[0].pctOverageToSell);
          expect(res.body.askingRate).toBe(listings[0].askingRate);
        });
    });
  });

  describe("when given invalid listing parameters", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).post(`/energy-listings`)
        .send({
          sellerID: "63fee38d058ec6cf3217bdba",
          loadZoneID: 1,
          utilityCompany: "eversource",
          annualProduction: 75,
          annualConsumption: 50,
          avgMonthlyOverage: 2,
          plannedUsage: "even more",
          pctOverageToSell: 100,
          askingRate: 70
        })
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });

  describe("when not given all required listing parameters", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).post(`/energy-listings`)
        .send({
          sellerID: "63fee38d058ec6cf3217bdba",
          loadZoneID: 1
        })
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});

// Update a listing
describe("PUT /energy-listings/:id", () => {

  // seed database with an example listing and get listing id
  let listingID;
  beforeEach(async () => {
    listingID = (await energyListing.create(listings[0]))._id;
  });

  describe("when given valid listing parameters", () => {
    it("should update the listing object in the database", async () => {
      await request(app).put(`/energy-listings/${listingID}`)
        .send({
          loadZoneID: listings[1].loadZoneID,
          utilityCompany: listings[1].utilityCompany,
          annualProduction: listings[1].annualProduction,
          annualConsumption: listings[1].annualConsumption
        });
      const foundListing = await energyListing.findById(listingID);
      expect(foundListing._id).toBeDefined();
      expect(JSON.stringify(foundListing.sellerID)).toBe(JSON.stringify(listings[0].sellerID));
      expect(foundListing.loadZoneID).toBe(listings[1].loadZoneID);
      expect(foundListing.utilityCompany).toBe(listings[1].utilityCompany);
      expect(foundListing.annualProduction).toBe(listings[1].annualProduction);
      expect(foundListing.annualConsumption).toBe(listings[1].annualConsumption);
      expect(foundListing.avgMonthlyOverage).toBe(listings[0].avgMonthlyOverage);
      expect(foundListing.plannedUsage).toBe(listings[0].plannedUsage);
      expect(foundListing.pctOverageToSell).toBe(listings[0].pctOverageToSell);
      expect(foundListing.askingRate).toBe(listings[0].askingRate);
    });

    it("should return the updated energy listing", async () => {
      await request(app).put(`/energy-listings/${listingID}`)
        .send({
          loadZoneID: listings[1].loadZoneID,
          utilityCompany: listings[1].utilityCompany,
          annualProduction: listings[1].annualProduction,
          annualConsumption: listings[1].annualConsumption
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body._id).toBeDefined();
          expect(res.body.sellerID).toBe(`${listings[0].sellerID}`);
          expect(res.body.loadZoneID).toBe(listings[1].loadZoneID);
          expect(res.body.utilityCompany).toBe(listings[1].utilityCompany);
          expect(res.body.annualProduction).toBe(listings[1].annualProduction);
          expect(res.body.annualConsumption).toBe(listings[1].annualConsumption);
          expect(res.body.avgMonthlyOverage).toBe(listings[0].avgMonthlyOverage);
          expect(res.body.plannedUsage).toBe(listings[0].plannedUsage);
          expect(res.body.pctOverageToSell).toBe(listings[0].pctOverageToSell);
          expect(res.body.askingRate).toBe(listings[0].askingRate);
        });
    });
  });

  describe("when given invalid listing parameters", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).put(`/energy-listings/${listingID}`)
        .send({
          annualProduction: "seventy five",
          avgMonthlyOverage: 2
        })
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });

  describe("when the provided id does not match a listing", () => {
    it("should return 404 with an json error message", async () => {
      await request(app).put(`/energy-listings/${unusedID}`)
        .send({ avgMonthlyOverage: 2 })
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe("when the provided id is invalid", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).put(`/energy-listings/${invalidID}`)
        .send({ avgMonthlyOverage: 2 })
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});

// Delete a listing
describe("DELETE /energy-listings/:id", () => {

  // seed database with an example listing and get listing id
  let listingID;
  beforeEach(async () => {
    listingID = (await energyListing.create(listings[0]))._id;
  });

  describe("when the provided id matches a listing", () => {
    it("should delete the listing object from the database", async () => {
      await request(app).delete(`/energy-listings/${listingID}`);
      const foundListing = await energyListing.findById(listingID);
      expect(foundListing).toBeNull();
    });

    it("should return the deleted energy listing's _id", async () => {
      await request(app).delete(`/energy-listings/${listingID}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body._id).toBe(`${listingID}`);
        });
    });
  });

  describe("when the provided id does not match a listing", () => {
    it("should return 404 with an json error message", async () => {
      await request(app).delete(`/energy-listings/${unusedID}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe("when the provided id is invalid", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).delete(`/energy-listings/${invalidID}`)
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});
