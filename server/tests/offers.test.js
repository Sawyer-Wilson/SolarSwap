const request = require("supertest");
const app = require("../app.js");
const dbHandler = require('./db-handler');
const Offer = require('../models/Offer.js');

// Connect to the database before the tests get run
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test
afterEach(async () => await dbHandler.clear());

// Disconnect from database after all tests get run
afterAll(async () => await dbHandler.disconnect());

// Example Offers and IDs used for testing
const invalidID = '640144225ddba807cfd501a';
const unusedID = '6401459da2389d29fef1577d';
offers = [
  {
    sellerID: "63f6fbd84c96ed49a448746a",
    email: "test1@gmail.com",
    message: "Hello! I am interested in buying your solar."
  }, {
    sellerID: "63f6fbd84c96ed49a448746a",
    email: "test2@gmail.com",
    message: "Hi there, I was wondering if you are still looking for a buyer."
  }, {
    sellerID: "63f6fbd84c96ed49a448746b",
    email: "test3@gmail.com",
    message: "I would like to purchase your utility credits."
  }
]

// --------------------------------- TESTS --------------------------------- //

// Get all offers for a seller
describe("GET /sellers/:id/offers/", () => {

  describe("when the seller has offers in the database", () => {
    // seed database with example offers
    let dbOffers;
    beforeEach(async () => {
      dbOffers = await Offer.create(offers) 
    });

    it("should return an array of offers", async () => {
      const res = await request(app).get(`/sellers/${offers[0].sellerID}/offers`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(JSON.parse(JSON.stringify(dbOffers[0]))).toMatchObject(res.body[0]);
      expect(JSON.parse(JSON.stringify(dbOffers[1]))).toMatchObject(res.body[1]);
    });
  });

  describe("when the seller has no offers in the database", () => {
    it("should return 404 with an json error message", async () => {
      await request(app).get(`/sellers/${offers[0].sellerID}/offers`)
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });
});

// Add a new offer
describe("POST /sellers/:id/offers", () => {

  describe("when given valid offer parameters", () => {
    it("should save the new offer object in the database", async () => {
      await request(app).post(`/sellers/${offers[0].sellerID}/offers`)
        .send(offers[0]);
      const foundOffer = await Offer.findOne({ sellerID: offers[0].sellerID });
      expect(foundOffer._id).toBeDefined();
      expect(JSON.stringify(foundOffer.sellerID)).toBe(JSON.stringify(offers[0].sellerID));
      expect(foundOffer.email).toBe(offers[0].email);
      expect(foundOffer.message).toBe(offers[0].message);
    });

    it("should return the saved offer", async () => {
      const res = await request(app).post(`/sellers/${offers[0].sellerID}/offers`)
        .send(offers[0])
        .expect('Content-Type', /json/)
        .expect(200);
      const foundOffer = await Offer.findOne({ sellerID: offers[0].sellerID });
      expect(res.body).toMatchObject(JSON.parse(JSON.stringify(foundOffer)));
    });
  });

  describe("when given invalid offer parameters", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).post(`/sellers/${invalidID}/offers`)
        .send(offers[0])
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });

  describe("when not given all required offer parameters", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).post(`/sellers/${offers[0].sellerID}/offers`)
        .send({ email: "test@gmail.com" })
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});

// Delete an offer
describe("DELETE /sellers/:id/offers/:id", () => {

  // seed database with an example offer and get offer id
  let offerID;
  beforeEach(async () => {
    offerID = (await Offer.create(offers[2]))._id;
  });

  describe("when the provided id matches an offer", () => {
    it("should delete the offer object from the database", async () => {
      await request(app).delete(`/sellers/${offers[2].sellerID}/offers/${offerID}`);
      const foundOffer = await Offer.findById(offerID);
      expect(foundOffer).toBeNull();
    });

    it("should return the deleted offer's _id", async () => {
      const res = await request(app).delete(`/sellers/${offers[2].sellerID}/offers/${offerID}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body._id).toBe(`${offerID}`);
    });
  });

  describe("when the provided id does not match an offer", () => {
    it("should return 404 with an json error message", async () => {
      await request(app).delete(`/sellers/${offers[2].sellerID}/offers/${unusedID}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe("when the provided id is invalid", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).delete(`/sellers/${offers[2].sellerID}/offers/${invalidID}`)
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});