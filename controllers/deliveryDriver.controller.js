const DeliveryDriver = require("../models/deliveryDriver");

exports.getDeliveryDrivers = async (req, res, next) => {
    try {
        const deliveryDrivers = await DeliveryDriver.find();
        res.status(200).json(deliveryDrivers);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
}

exports.getDeliveryDriver = async (req, res, next) => {
    const {
        params: {
            id
        }
    } = req;

    try {
        const deliveryDriver = await DeliveryDriver.findOne({ _id: id});
        res.status(200).json(deliveryDriver);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
}

exports.createDeliveryDriver = async (req, res, next) => {
    try {
        const deliveryDriver = await new DeliveryDriver({...req.body});
        await deliveryDriver.save();
        res.status(201).json({message:"Delivery Driver is registered.", _id: deliveryDriver._id})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.updateDeliveryDriver = async (req, res, next) => {
    const {
        params: {
            id
        }
    }= req;

    try {
        const deliveryDriver = await DeliveryDriver.findOne({ _id: id });

        if (!deliveryDriver) {
            return res.status(404).json({message:"Delivery Driver not found."})
        }

        await DeliveryDriver.updateOne({ _id: id }, { ...req.body });
        res.status(200).json({message:"Delivery Driver is updated."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.deleteDeliveryDriver = async (req, res, next) => {
    const {
        params: {
            id
        }
    }= req;

    try {
        const rate = await Rate.findOne({ _id: id });

        if (!rate) {
            return res.status(404).json({message:"Rate not found."})
        }
        
        if (rate.user.toString() !== req.auth.userId) {
            return res.status(401).json({message:"Unauthorized."})
        }

        await Rate.deleteOne({ _id: id });
        res.status(200).json({message:"Rate is deleted."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};
