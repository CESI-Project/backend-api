const mongoose = require("mongoose");

const RateSchema = mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true },
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User", required: true},
    rating: { type: Number, required: true, max: 5 }
});

RateSchema.statics.getRatingByrestaurantId = async function ( restaurantId ) {
    const rates = await Rate.find({
      restaurant: restaurantId,
    });
    // create new array with just rating property
    const ratesRating = rates.map(function(item) { return item["rating"] });
    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

    return average(ratesRating);
};

const Rate = mongoose.model("Rate", RateSchema);
module.exports = Rate;