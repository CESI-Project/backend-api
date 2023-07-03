const Supplier = require("../models/supplier");
const Restaurant = require("../models/restaurant");

exports.createSupplier = async (req, res, next) => {
    try {
        const supplier = await new Supplier({...req.body});
        await supplier.save();
        res.status(201).json({message:"Supplier is registered."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.getSupplier = async (req, res, next) => {
    const {
        params: { id }
    }= req;

    try {
        const supplier = await Supplier.findOne({ _id: id });
        res.status(200).json(supplier);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.getSuppliers = async (req, res, next) => {
    const {
        params: { id },
    } = req;

    try {
        console.log("la avant ")
        const suppliers = await Supplier.find({
            "restaurants" : [id]
        });
        console.log("la apres ", suppliers)
        res.status(200).json(suppliers);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.getAllSuppliers = async (req, res, next) => {
    try {
        const suppliers = await Supplier.find();

        res.status(200).json(suppliers);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.addSuppliers = async (req, res, next) => {
    const {
        params: { id },
        body: {
            suppliers
        }
    } = req;

    try {
        const restaurant = await Restaurant.findOne({ _id: id });
        restaurant.suppliers = suppliers;

        await restaurant.save();
        res.status(201).json({message:"Suppliers are registered."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.deleteSuppliers = async (req, res, next) => {
    const {
        params: { id },
        body: {
            suppliers
        }
    } = req;

    try {
        const restaurant = await Restaurant.findOne({ _id: id });
        restaurant.suppliers = restaurant.suppliers.filter(supplier => !suppliers.includes(supplier.id));

        await restaurant.save();
        res.status(201).json({message:"Suppliers are deleted."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};


exports.updateSupplier = async (req, res, next) => {
    const {
        params: {
            id
        }
    }= req;

    try {
        const supplier = await Supplier.findOne({ _id: id });

        if (!supplier) {
            return res.status(404).json({message:"Supplier not found."})
        }

        await Supplier.updateOne({ _id: id }, { ...req.body });
        res.status(200).json({message:"Supplier is updated."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.deleteSupplier = async (req, res, next) => {
    const {
        params: {
            id
        }
    }= req;

    try {
        const supplier = await Supplier.findOne({ _id: id });

        if (!supplier) {
            return res.status(404).json({message:"Supplier not found."})
        }

        await Supplier.deleteOne({ _id: id });
        res.status(200).json({message:"Supplier is deleted."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};