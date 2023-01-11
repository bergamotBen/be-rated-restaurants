const { app } = require("../app.js");
const request = require("supertest");
const { db } = require("../db/connection");
// const { runSeed } = require("../db/run-seed");
const data = require("../db/data/index");
const { seed } = require("../db/seed");

afterAll(() => {
  return db.end();
});
beforeEach(() => {
  return seed(data);
});

describe("app", () => {
  describe("/api", () => {
    it("returns a status of 200 ", () => {
      return request(app).get("/api").expect(200);
    });
    it("returns an object with an ok message", () => {
      return request(app).get("/api/").expect({ msg: "all ok" });
    });
  });
  describe("/api/restaurants", () => {
    it("returns a status of 200 and returns an array of objects", () => {
      return request(app)
        .get("/api/restaurants")
        .expect(200)
        .then((response) => {
          expect(response.body.rows).toHaveLength(8);
        });
    });
    it("contains the correct data about a restaurant", () => {
      const data = {
        restaurant_id: 1,
        restaurant_name: "Luck Lust Liquor & Burn",
        area_id: 1,
        cuisine: "Mexican",
        website: "http://lucklustliquorburn.com/",
      };

      return request(app)
        .get("/api/restaurants")
        .then((response) => {
          expect(response.body.rows[0]).toEqual(data);
        });
    });
  });
  describe.only("post /api/restaurants", () => {
    it("should return the database entry in the response body", () => {
      return request(app)
        .post("/api/restaurants")
        .expect(201)
        .send({
          restaurant_name: "The Codfather",
          area_id: 2,
          cuisine: "British",
          website: "www.thecodfather.com",
        })
        .then((response) => {
          expect(response.body).toEqual({
            restaurant_id: 9,
            restaurant_name: "The Codfather",
            area_id: 2,
            cuisine: "British",
            website: "www.thecodfather.com",
          });
        });
    });
  });
});
