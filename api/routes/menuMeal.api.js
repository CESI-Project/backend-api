const express = require("express");
const router = express.Router();
const MenuMealController = require("../../controllers/menuMeal.controller");
const authentication = require('../middlewares/authentication')
const multer = require('../middlewares/multer');

router.get(
    "/",
    authentication,
    MenuMealController.getMenuMeals,
);

router.get(
    "/:id",
    MenuMealController.getMenuMeal,
);

router.post(
    "/",
    authentication,
    multer,
    MenuMealController.createMenuMeal,
);

router.put(
    "/:id",
    authentication,
    multer,
    MenuMealController.updateMenuMeal,
);

router.delete(
    "/:id",
    authentication,
    MenuMealController.deleteMenuMeal,
);

module.exports = router;