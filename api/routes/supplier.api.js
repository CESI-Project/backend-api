const express = require("express");
const router = express.Router();
const SupplierController = require("../../controllers/supplier.controller");
const authentication = require('../middlewares/authentication')

// gett all suppliers of restaurant
router.get(
    "/mySuppliers/:id",
    authentication,
    SupplierController.getSuppliers,
);


router.post(
    "/addSuppliers/:id",
    authentication,
    SupplierController.addSuppliers,
    );
    
router.delete(
    "/deleteSuppliers/:id",
    authentication,
    SupplierController.deleteSuppliers,
);
    
// Api for create, update, delete supplier
router.get(
    "/:id",
    authentication,
    RateController.getSupplier,
);
        
router.post(
    "/",
    authentication,
    SupplierController.createSupplier,
);

router.put(
    "/:id",
    authentication,
    SupplierController.updateSupplier,
);

router.delete(
    "/:id",
    authentication,
    SupplierController.deleteSupplier,
);

module.exports = router;