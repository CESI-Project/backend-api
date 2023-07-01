const Rate = require("../models/rate");
const Restaurant = require("../models/restaurant");

exports.getRates = async (req, res, next) => {
    try {
        const rates = await Rate.find();
        res.status(200).json(rates);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};


exports.createRate = async (req, res, next) => {
    const {
        body: {
            restaurant
        }
    } = req;

    try {
        const rate = await new Rate({...req.body});
        await rate.save();
        await Restaurant.updateRateCount(restaurant);
        res.status(201).json({message:"Rate is registered."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.updateRate = async (req, res, next) => {
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

        await Rate.updateOne({ _id: id }, { ...req.body });
        await Restaurant.updateRateCount(rate.restaurant);
        res.status(200).json({message:"Rate is updated."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.deleteRate = async (req, res, next) => {
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