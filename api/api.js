const express = require("express");
const router = express.Router();

const UsersApi = require("./routes/user.api");
router.use("/Users", UsersApi);

const restaurantsApi = require("./routes/restaurant.api");
router.use("/Restaurants", restaurantsApi);

const RatesApi = require("./routes/rate.api");
router.use("/Rates", RatesApi);

const MealsApi = require("./routes/meal.api");
router.use("/Meals", MealsApi);

const MenuMealsApi = require("./routes/menuMeal.api");
router.use("/MenuMeals", MenuMealsApi);

const LocalisationApi = require("./routes/localisation.api");
router.use("/Localisation", LocalisationApi);


module.exports = router;