const express = require("express");
const router = express.Router();
const MealController = require("../../controllers/meal.controller");
const authentication = require('../middlewares/authentication')
const multer = require('../middlewares/multer');

router.get(
    "/",
    authentication,
    MealController.getMeals,
);

router.get(
    "/:id",
    authentication,
    MealController.getMeal,
);


router.get(
    "/byRestaurant/:id",
    authentication,
    MealController.getMealsByRestaurant,
);

router.post(
    "/",
    authentication,
    multer,
    MealController.createMeal,
);

router.put(
    "/:id",
    authentication,
    multer,
    MealController.updateMeal,
);

router.delete(
    "/:id",
    authentication,
    MealController.deleteMeal,
);

module.exports = router;