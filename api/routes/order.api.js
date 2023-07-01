const express = require("express");
const router = express.Router();
const OrderController = require("../../controllers/order.controller");
const authentication = require('../middlewares/authentication')

router.get(
    "/:id",
    authentication,
    OrderController.getOrder,
);

router.get(
    "/:id/status",
    authentication,
    OrderController.getOrderStatus,
);
        
router.post(
    "/",
    authentication,
    OrderController.createOrder,
);

router.put(
    "/:id",
    authentication,
    OrderController.updateOrder,
);

router.delete(
    "/:id",
    authentication,
    OrderController.deleteOrder,
);

// modify status
router.put(
    "/:id/updateStatus",
    authentication,
    OrderController.updateStatusOrder,
);

module.exports = router;