const mongoose = require("mongoose");

// lui relier des employés, commentaires et meals

const RestaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String },
    address: { type: String, required: true},
    postalCode: { type: Number, required: true },
    city: { type: String, required: true},
    country: { type: String, required: true},
    rate: { type: Number },
    // foodType: [{  }] multi selections
    // schedule: { 
        // monday:
        // tuesday:
        // wednesday:
        // thursday:
        // friday:
        // saturday:
        // sunday:
    //  } 7 jours => pensé a mettre nbr pour les jours 0 a 6 
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);