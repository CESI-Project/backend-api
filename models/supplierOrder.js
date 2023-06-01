const mongoose = require("mongoose");

const SupplierOrderSchema = mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true},
    ingredients: [{ 
        ingredient: { type: String, required:true },
        quantity: { type: Number, default: 1}
    }]
});

module.exports = mongoose.model('SupplierOrder', SupplierOrderSchema);