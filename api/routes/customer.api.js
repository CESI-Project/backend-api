const express = require("express");
const router = express.Router();
const CustomerController = require("../../controllers/customer.controller");

router.get(
    "/",
    CustomerController.getCustomer,
);

module.exports = router;