const { Types: { ObjectId } } = require("mongoose");
const chai = require("chai");
const Rate = require("../models/rate");
const Restaurant = require("../models/restaurant");
const LocalDB = require("./setup.db");
const expect = require('chai').expect;
 
describe("Test rate model", () => {
  let db;
  before((done) => {
    db = new LocalDB(async () => {
      await db.connect();
      done();
    });
  });

  afterEach(async () => {
    await db.flush();
  });

  after(async () => {
    // Wait for hooks to run before dropping the DB
    await new Promise((r) => { setTimeout(r, 500); });

    await db.drop();
  });

  describe("Tests rating", () => {
    it("should have 4 in rating", async () => {
        const restaurant = await new Restaurant({
            "name": "test rate DB",
            "address": "adress test",
            "postalCode": 3940393,
            "city": "city test",
            "country": "country test", 
        }).save();

        await new Rate({
            "restaurant": restaurant._id,
            "user": new ObjectId(),
            "rating": 5
        }).save();
        
        await new Rate({
            "restaurant": restaurant._id,
            "user": new ObjectId(),
            "rating": 3
        }).save();
        
        const test = await Rate.getRatingByrestaurantId(restaurant._id);
        expect(test).to.equal(4)
    });
    it("should not have 4 in rating", async () => {
        const restaurant = await new Restaurant({
            "name": "test rate DB",
            "address": "adress test",
            "postalCode": 3940393,
            "city": "city test",
            "country": "country test", 
        }).save();

        await new Rate({
            "restaurant": restaurant._id,
            "user": new ObjectId(),
            "rating": 5
        }).save();
        
        await new Rate({
            "restaurant": restaurant._id,
            "user": new ObjectId(),
            "rating": 2
        }).save();
        
        const test = await Rate.getRatingByrestaurantId(restaurant._id);
        expect(test).to.not.equal(4)
    });
  });
});
