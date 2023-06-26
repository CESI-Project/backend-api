const mongoose = require("mongoose");

const MenuMealSchema = mongoose.Schema({
    name: { type: String, required: true },
    meals: {
        plat: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
        boisson: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" }
    },
    imageUrl: { type: String },
    price: { type: Number, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true},
    promotion: { type: Number, default: null }
});

const MenuMeal = mongoose.model("MenuMeal", MenuMealSchema);
module.exports = MenuMeal;