const express = require("express");
const router = express.Router();
const authentication = require('../middlewares/authentication')
const LocalisationController = require("../../controllers/localisation.controller");

router.get(
    "/:searchCountry?",
    authentication,
    LocalisationController.getCountries,
);

router.get(
    "/:country?/:searchCities?",
    authentication,
    LocalisationController.getCities,
);


module.exports = router;