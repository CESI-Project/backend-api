const Restaurant = require("../models/restaurant");
const fs = require('fs');

exports.getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.getRestaurant = async (req, res, next) => {
    const {
        params: {
            id
        }
    } = req;

    try {
        const restaurant = await Restaurant.findOne({
            _id : id
        });

        if ( !restaurant ) {
            return res.status(404).json({ message: "Restaurant not found." })
        }

        res.status(200).json(restaurant);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.createRestaurant = async (req, res, next) => {
    try {
        let restaurant = {};
        if (req.file) {
            restaurant = await new Restaurant({
                ...req.body,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            });
        }
        else {
            restaurant = await new Restaurant({ ...req.body });
        }

        await restaurant.save();
        res.status(201).json({ message: "Restaurant is registered." })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.updateRestaurant = async (req, res, next) => {
    const {
        params: {
            id
        }
    } = req;

    try {

        const restaurant = await Restaurant.findOne({ _id: id });

        if (!restaurant) { return res.status(404).json({ message: "Restaurant not found." })};

        // after add role
        // if ((req.auth.role !== "Admin" && req.auth.restaurant !== meal.restaurant) || req.auth.role !== "SuperAdmin") {
        //     return res.status(401).json({message:"Unauthorized."})
        // }

        const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

        if ( imageUrl ) {
            await Restaurant.updateOne({ _id: id}, {
                ...req.body,
                imageUrl
            });
        }
        else {
            await Restaurant.updateOne({ _id: id}, {
                ...req.body,
            });
        }

        res.status(200).json({ message: "Restaurant is updated." })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
    next();
};

exports.deleteRestaurant = async (req, res, next) => {
    const {
        params: { id },
    } = req;

    try {
        const restaurant = await Restaurant.findOne({ _id: id});

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found." });
        }
        // if (req.auth.role === "Admin") {    
        const filename = restaurant.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, async () => {
            await Restaurant.deleteOne({ _id: id })
        })
        res.status(200).json({ message: "Restaurant is deleted." })
        // }
        // else { res.status(401).json({message:"Unauthorized."}) }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};