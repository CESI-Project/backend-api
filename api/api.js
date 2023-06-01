const express = require("express");
const router = express.Router();

const UsersApi = require("./routes/user.api");
router.use("/Users", UsersApi);

const restaurantsApi = require("./routes/restaurant.api");
router.use("/Restaurants", restaurantsApi);

const RatesApi = require("./routes/rate.api");
router.use("/Rates", RatesApi);


module.exports = router;