const mongoose = require("mongoose");

const MealSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true},
    imageUrl: { type: String },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true},
});

const Meal = mongoose.model("Meal", MealSchema);
module.exports = Meal;