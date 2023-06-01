const mongoose = require("mongoose");

const SupplierSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true},
    postalCode: { type: Number, required: true },
    city: { type: String, required: true},
    country: { type: String, required: true},
    phone: { type: String, required: true }
});

module.exports = mongoose.model('Supplier', SupplierSchema);