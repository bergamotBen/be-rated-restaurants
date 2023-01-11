const { db } = require("../db/connection");

const readRestaurants = () => {
  const queryString = `SELECT * FROM restaurants;`;
  return db.query(queryString).then((results) => {
    return results;
  });
};

const createRestaurant = (restaurant) => {
  return db
    .query(
      `INSERT INTO restaurants (restaurant_name, area_id, cuisine, website)
VALUES ($1, $2, $3, $4) RETURNING *;`,
      [
        restaurant.restaurant_name,
        restaurant.area_id,
        restaurant.cuisine,
        restaurant.website,
      ]
    )
    .then((result) => {
      //   console.log(result.rows[0]);
      return result.rows[0];
    });
};

module.exports = { readRestaurants, createRestaurant };
