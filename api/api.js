const express = require("express");
const router = express.Router();

const UsersApi = require("./routes/user.api");
router.use("/Users", UsersApi);

const restaurantsApi = require("./routes/restaurant.api");
router.use("/Restaurants", restaurantsApi);

module.exports = router;