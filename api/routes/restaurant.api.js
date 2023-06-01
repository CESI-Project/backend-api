const express = require("express");
const router = express.Router();
const RestaurantController = require("../../controllers/restaurant.controller");
const authentication = require('../middlewares/authentication')
const multer = require('../middlewares/multer');


router.get(
    "/",
    RestaurantController.getRestaurants,
);

router.get(
    "/:id",
    RestaurantController.getRestaurant,
);

router.post(
    "/",
    authentication,
    multer,
    RestaurantController.createRestaurant,
);

router.put(
    "/:id",
    authentication,
    multer,
    RestaurantController.updateRestaurant,
);

router.delete(
    "/:id",
    authentication,
    RestaurantController.deleteRestaurant,
);

module.exports = router;