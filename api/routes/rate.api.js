const express = require("express");
const router = express.Router();
const RateController = require("../../controllers/rate.controller");
const authentication = require('../middlewares/authentication')
const multer = require('../middlewares/multer');


router.get(
    "/",
    authentication,
    RateController.getRates,
);

router.post(
    "/",
    authentication,
    multer,
    RateController.createRate,
);

router.put(
    "/:id",
    authentication,
    multer,
    RateController.updateRate,
);

router.delete(
    "/:id",
    authentication,
    RateController.deleteRate,
);

module.exports = router;