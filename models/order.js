const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User", required: true},
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true},
    deliveryDriver: { type: mongoose.Schema.Types.ObjectId , ref: "DeliveryDriver", required: true},
    foods: [{
        meal: { type: mongoose.Schema.Types.ObjectId , ref: "Meal", required: true},
        quantity: { type: Number, default: 1 },
        price: { type: Number, defautl: 0 }
    }],
    orderDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ["waiting", "preparing", "delivering", "delivered"]},
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;