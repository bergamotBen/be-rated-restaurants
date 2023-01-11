const express = require("express");
const {
  testApi,
  getRestaurants,
  postRestaurant,
} = require("./controllers/restaurant.controllers.js");
const app = express();
app.use(express.json());

app.get("/api", testApi);

app.get("/api/restaurants", getRestaurants);

app.post("/api/restaurants", postRestaurant);

module.exports = { app };
