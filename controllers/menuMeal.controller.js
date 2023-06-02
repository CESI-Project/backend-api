const MenuMeal = require("../models/menuMeal");

exports.getMenuMeals = async (req, res, next) => {
    try {
        const menuMeals = await MenuMeal.find();
        res.status(200).json(menuMeals);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.getMenuMeal = async (req, res, next) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const menuMeal = await MenuMeal.findOne({ _id: id });

        if (!menuMeal) { res.status(404).json({ message: "MenuMeal not found."})};

        // after add role
        // if ((req.auth.role !== "Admin" && req.auth.restaurant !== meal.restaurant) || req.auth.role !== "SuperAdmin") {
        //     return res.status(401).json({message:"Unauthorized."})
        // }

        res.status(200).json(menuMeal);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.createMenuMeal = async (req, res, next) => {
    try {
        let menuMeal = {};
        if ( req.file ) {
            menuMeal = await new MenuMeal({
                ...req.body,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            });    
        }
        else {
            menuMeal = await new MenuMeal({
                ...req.body,
            });
        }

        await menuMeal.save();
        res.status(201).json({message:"MenuMeal is registered."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.updateMenuMeal = async (req, res, next) => {
    const {
        params: {
            id
        }
    }= req;

    try {
        const menuMeal = await MenuMeal.findOne({ _id: id });

        if (!menuMeal) {
            return res.status(404).json({message:"MenuMeal not found."})
        }

        // after add role
        // if ((req.auth.role !== "Admin" && req.auth.restaurant !== meal.restaurant) || req.auth.role !== "SuperAdmin") {
        //     return res.status(401).json({message:"Unauthorized."})
        // }

        const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

        if ( imageUrl ) {
            await MenuMeal.updateOne({ _id: id }, { 
                ...req.body ,
                imageUrl
            });
        }
        else {
            await MenuMeal.updateOne({ _id: id }, { ...req.body });
        }
        res.status(200).json({message:"MenuMeal is updated."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.deleteMenuMeal = async (req, res, next) => {
    const {
        params: {
            id
        }
    }= req;

    try {
        const menuMeal = await MenuMeal.findOne({ _id: id });

        if (!menuMeal) {
            return res.status(404).json({message:"MenuMeal not found."})
        }
        
        // after add role
        // if ((req.auth.role !== "Admin" && req.auth.restaurant !== meal.restaurant) || req.auth.role !== "SuperAdmin") {
        //     return res.status(401).json({message:"Unauthorized."})
        // }

        await MenuMeal.deleteOne({ _id: id });
        res.status(200).json({message:"MenuMeal is deleted."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};