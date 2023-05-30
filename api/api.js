const express = require("express");
const router = express.Router();

const customersApi = require("./routes/customer.api");

router.use("/customers", customersApi);

module.exports = router;