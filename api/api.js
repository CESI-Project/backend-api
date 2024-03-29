const express = require("express");
const router = express.Router();

const UsersApi = require("./routes/user.api");
router.use("/Users", UsersApi);

const restaurantsApi = require("./routes/restaurant.api");
router.use("/Restaurants", restaurantsApi);

const RatesApi = require("./routes/rate.api");
router.use("/Rates", RatesApi);

const SuppliersApi = require("./routes/supplier.api");
router.use("/Suppliers", SuppliersApi);

const OrdersApi = require("./routes/order.api");
router.use("/Orders", OrdersApi);

const MealsApi = require("./routes/meal.api");
router.use("/Meals", MealsApi);

const DeliveryDriversApi = require("./routes/deliveryDriver.api");
router.use("/DeliveryDrivers", DeliveryDriversApi);

const LocalisationApi = require("./routes/localisation.api");
router.use("/Localisation", LocalisationApi);


module.exports = router;