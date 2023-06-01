const mongoose = require("mongoose");

const DeliveryDriverSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true},
    postalCode: { type: Number, required: true },
    city: { type: String, required: true},
    country: { type: String, required: true},
});

const DeliveryDriver = mongoose.model("DeliveryDriver", DeliveryDriverSchema);
module.exports = DeliveryDriver;