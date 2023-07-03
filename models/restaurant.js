const { ObjectId } = require("bson");
const mongoose = require("mongoose");
// lui relier des employés et meals

const RestaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String },
    // address: { type: String, required: true},
    // postalCode: { type: Number, required: true },
    // city: { type: String, required: true},
    // country: { type: String, required: true},
    rate: { type: Number, default: null, max: 5 },
    foodType: [{ 
        type: String
    }],
});

RestaurantSchema.statics.updateRateCount = async function (id) {    
    try {
        const Rate = require("./rate"); // against circular dependencies
        const restaurant = await Restaurant.findOne({
            _id: id,
        });
      restaurant.rate = await Rate.getRatingByrestaurantId(restaurant._id);
      await restaurant.save();
    } catch (e) {
      console.log(e);
    }
  };

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
