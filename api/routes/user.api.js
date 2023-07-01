const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user.controller");
const authentication = require('../middlewares/authentication')

// ADMIN
router.get(
    "/",
    authentication,
    UserController.getUsers,
);

// ADMIN or ME
router.get(
    "/:id",
    authentication,
    UserController.getUser,
);

// router.post(
//     "/",
//     UserController.createUser,
// );

router.post(
    "/signup",
    UserController.signup,
);

router.post(
    "/signup/restaurant",
    UserController.signupRestaurant,
);

router.post(
    "/login",
    UserController.login,
);

// ADMIN or ME
router.put(
    "/:id",
    authentication,
    UserController.updateUser,
);

// ADMIN or ME
router.delete(
    "/:id",
    authentication,
    UserController.deleteUser,
);


module.exports = router;