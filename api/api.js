const express = require("express");
const router = express.Router();

const UsersApi = require("./routes/user.api");

router.use("/Users", UsersApi);

module.exports = router;