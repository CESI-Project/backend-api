const mongoose = require("mongoose");
const User = require('./user');

const OrderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User", required: true},
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true},
    deliveryDriver: { type: mongoose.Schema.Types.ObjectId , ref: "DeliveryDriver"},
    foods: [{
        meal: { type: mongoose.Schema.Types.ObjectId , ref: "Meal", required: true},
        quantity: { type: Number, default: 1 },
        price: { type: Number, default: 0 }
    }],
    orderDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ["waiting", "preparing", "delivering", "delivered"], default: "waiting"},
});

OrderSchema.methods.formatOrderDetails = async function ( mealsDetails ) {
    const user = await User.findOne({ _id: this.user}).select('firstName lastName');

    const details = {
        _id: this._id,
        user,
        restaurant: this.restaurant,
        deliveryDriver: this.deliveryDriver,
        foods: mealsDetails,
        totalPrice: this.totalPrice,
        status: this.status
    }

    return details;
};


const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;