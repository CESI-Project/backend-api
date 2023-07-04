const express = require("express");
const router = express.Router();
const DeliveryDriverController = require("../../controllers/deliveryDriver.controller");
const authentication = require('../middlewares/authentication')


router.get(
    "/",
    authentication,
    DeliveryDriverController.getDeliveryDrivers,
);

router.get(
    "/:id",
    authentication,
    DeliveryDriverController.getDeliveryDriver,
);

router.post(
    "/",
    authentication,
    DeliveryDriverController.createDeliveryDriver,
);

router.put(
    "/:id",
    authentication,
    DeliveryDriverController.updateDeliveryDriver,
);

router.delete(
    "/:id",
    authentication,
    DeliveryDriverController.deleteDeliveryDriver,
);

module.exports = router;