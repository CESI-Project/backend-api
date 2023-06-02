const Meal = require("../models/meal");

exports.getMeals = async (req, res, next) => {
    try {
        const meals = await Meal.find();
        res.status(200).json(meals);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.getMeal = async (req, res, next) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const meal = await Meal.findOne({ _id: id });

        if (!meal) { res.status(404).json({ message: "Meal not found."})};

        // after add role
        // if ((req.auth.role !== "Admin" && req.auth.restaurant !== meal.restaurant) || req.auth.role !== "SuperAdmin") {
        //     return res.status(401).json({message:"Unauthorized."})
        // }

        res.status(200).json(meal);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.createMeal = async (req, res, next) => {
    try {
        let meal = {};

        if ( req.file ) {
            meal = await new Meal({
                ...req.body,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            });
        }
        else {
            meal = await new Meal({ ...req.body });
        }
        await meal.save();
        res.status(201).json({message:"Meal is registered."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.updateMeal = async (req, res, next) => {
    const {
        params: {
            id
        }
    }= req;

    try {
        const meat = await Meal.findOne({ _id: id });

        if (!meat) {
            return res.status(404).json({message:"Meal not found."})
        }

        // after add role
        // if ((req.auth.role !== "Admin" && req.auth.restaurant !== meal.restaurant) || req.auth.role !== "SuperAdmin") {
        //     return res.status(401).json({message:"Unauthorized."})
        // }

        const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

        if ( imageUrl ) {
            await Meal.updateOne({ _id: id}, {
                ...req.body,
                imageUrl
            });
        }
        else {
            await Meal.updateOne({ _id: id }, { ...req.body });
        }

        res.status(200).json({message:"Meal is updated."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.deleteMeal = async (req, res, next) => {
    const {
        params: {
            id
        }
    }= req;

    try {
        const meal = await Meal.findOne({ _id: id });

        if (!meal) {
            return res.status(404).json({message:"Meal not found."})
        }
        
        // after add role
        // if ((req.auth.role !== "Admin" && req.auth.restaurant !== meal.restaurant) || req.auth.role !== "SuperAdmin") {
        //     return res.status(401).json({message:"Unauthorized."})
        // }

        await Meal.deleteOne({ _id: id });
        res.status(200).json({message:"Meal is deleted."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};