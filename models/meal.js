const mongoose = require("mongoose");

const MealSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true},
    ingredient: [{ 
        type: String
    }],
    imageUrl: { type: String },
    price: { type: Number, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true},
    promotion: { type: Number, default: 0 }
});

const Meal = mongoose.model("Meal", MealSchema);
module.exports = Meal;