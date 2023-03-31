const request = require("supertest");
const app = require("../app.js");
const dbHandler = require('./db-handler');
const Seller = require('../models/Seller.js');

// Connect to the database before the tests get run
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test
afterEach(async () => await dbHandler.clear());

// Disconnect from database after all tests get run
afterAll(async () => await dbHandler.disconnect());

// Example Sellers and IDs used for testing
const invalidID = '640144225ddba807cfd501a';
const unusedID = '6401459da2389d29fef1577d';
sellers = [
  {
    firstName: "john",
    lastName: "doe",
    email: "johndoe@gmail.com"
  }, {
    energyListingID: '6401459da2389d29fef1577c',
    firstName: "jane",
    lastName: "doe",
    email: "johndoe@gmail.com"
  }
]

// --------------------------------- TESTS --------------------------------- //

// Get a specific seller
describe("GET /sellers/:id", () => {

  // seed database with an example seller and get seller id
  let dbSeller;
  beforeEach(async () => {
    dbSeller = await Seller.create(sellers[0]);
  });

  describe("when the provided id matches a seller", () => {
    it("should return the listing object", async () => {
      const res = await request(app).get(`/sellers/${dbSeller._id}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(JSON.parse(JSON.stringify(dbSeller))).toMatchObject(res.body);
    });
  });

  describe("when the provided id does not match a seller", () => {
    it("should return 404 with an json error message", async () => {
      await request(app).get(`/sellers/${unusedID}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe("when the provided id is invalid", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).get(`/sellers/${invalidID}`)
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});

// Update a seller
describe("PUT /sellers/:id", () => {

  // seed database with an example seller and get seller id
  let sellerID;
  beforeEach(async () => {
    sellerID = (await Seller.create(sellers[0]))._id;
  });

  describe("when given valid seller parameters", () => {
    it("should update the seller object in the database", async () => {
      await request(app).put(`/sellers/${sellerID}`)
        .send({
          firstName: sellers[1].firstName,
          energyListingID: sellers[1].energyListingID
        });
      const foundSeller = await Seller.findById(sellerID);
      expect(foundSeller._id).toBeDefined();
      expect(JSON.stringify(foundSeller.energyListingID)).toBe(JSON.stringify(sellers[1].energyListingID));
      expect(foundSeller.firstName).toBe(sellers[1].firstName);
      expect(foundSeller.lastName).toBe(sellers[0].lastName);
      expect(foundSeller.email).toBe(sellers[0].email);
    });

    it("should return the updated seller", async () => {
      const res = await request(app).put(`/sellers/${sellerID}`)
        .send({
          firstName: sellers[1].firstName,
          energyListingID: sellers[1].energyListingID
        })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body._id).toBeDefined();
      expect(res.body.energyListingID).toBe(`${sellers[1].energyListingID}`);
      expect(res.body.firstName).toBe(sellers[1].firstName);
      expect(res.body.lastName).toBe(sellers[0].lastName);
      expect(res.body.email).toBe(sellers[0].email);
    });
  });

  describe("when given invalid seller parameters", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).put(`/sellers/${sellerID}`)
        .send({
          energyListingID: invalidID
        })
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });

  describe("when the provided id does not match a seller", () => {
    it("should return 404 with an json error message", async () => {
      await request(app).put(`/sellers/${unusedID}`)
        .send({ firstName: sellers[1].firstName })
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe("when the provided id is invalid", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).put(`/sellers/${invalidID}`)
        .send({ firstName: sellers[1].firstName })
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});

// Delete a seller
describe("DELETE /sellers/:id", () => {

  // seed database with an example seller and get seller id
  let sellerID;
  beforeEach(async () => {
    sellerID = (await Seller.create(sellers[0]))._id;
  });

  describe("when the provided id matches a seller", () => {
    it("should delete the seller object from the database", async () => {
      await request(app).delete(`/sellers/${sellerID}`);
      const foundSeller = await Seller.findById(sellerID);
      expect(foundSeller).toBeNull();
    });

    it("should return the deleted sellers's _id", async () => {
      const res = await request(app).delete(`/sellers/${sellerID}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body._id).toBe(`${sellerID}`);
    });
  });

  describe("when the provided id does not match a seller", () => {
    it("should return 404 with an json error message", async () => {
      await request(app).delete(`/sellers/${unusedID}`)
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe("when the provided id is invalid", () => {
    it("should return 400 with an json error message", async () => {
      await request(app).delete(`/sellers/${invalidID}`)
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});