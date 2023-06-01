const mongoose = require("mongoose");

const MenuMealSchema = mongoose.Schema({
    name: { type: String, required: true },
    meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
    price: { type: Number, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true},
    promotion: { type: Number, default: 0 }
});

const MenuMeal = mongoose.model("MenuMeal", MenuMealSchema);
module.exports = MenuMeal;