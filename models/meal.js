const mongoose = require("mongoose");

const MealSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true},
    imageUrl: { type: String },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true},
});


MealSchema.statics.getMealByOrder = async function ( mealValue ) {
    const mealResult = await Meal.findById(mealValue.meal).select( 'name type price' );
    const formatMeal = {
        meal : {
            name: mealResult.name,
            type: mealResult.type,
            price: mealResult.price,
        },
        price: mealValue.price,
        quantity: mealValue.quantity
    }
    return formatMeal;
};

const Meal = mongoose.model("Meal", MealSchema);
module.exports = Meal;