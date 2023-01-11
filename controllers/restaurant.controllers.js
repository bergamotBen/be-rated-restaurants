const {
  readRestaurants,
  createRestaurant,
} = require("../models/restaurant.models");

const testApi = (req, res) => {
  return res.status(200).send({ msg: "all ok" });
};

const getRestaurants = (req, res) => {
  readRestaurants().then((data) => {
    // console.log(data);
    res.status(200).send(data);
  });
};

const postRestaurant = (req, res) => {
  const { body } = req;
  createRestaurant(body).then((newRestaurant) => {
    res.status(201).send(newRestaurant);
  });
};
module.exports = { testApi, getRestaurants, postRestaurant };
