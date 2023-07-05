const Order = require("../models/order");
const Meal = require("../models/meal")
const { asyncForEach } = require("../helpers/helpers");

exports.getOrder = async (req, res, next) => {
    const {
        params : { id }
    } = req;

    try {
        const order = await Order.findOne({ _id: id});
        res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.getOrdersByRestaurant = async (req, res, next) => {
    const {
        params : { id }
    } = req;

    try {
        const orders = await Order.find({ restaurant: id});
        const orderDetails = [];
        await asyncForEach(orders, async (order) => {
            const mealsDetails = [];
            await asyncForEach(order.foods, async (food) => { 
                mealsDetails.push(await Meal.getMealByOrder(food));
            });
            orderDetails.push(await order.formatOrderDetails(mealsDetails))
        });
        res.status(200).json(orderDetails);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};



exports.getOrderStatus = async (req, res, next) => {
    const {
        params : { id }
    } = req;

    try {
        const orderStatus = await Order.findOne({ _id: id}).select({ status:1});
        res.status(200).json(orderStatus);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.createOrder = async (req, res, next) => {
    try {
        const order =await new Order({...req.body});
        await order.save();
        res.status(201).json({ message:"Order is registered.", _id: order._id })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.updateOrder = async (req, res, next) => {
    const {
        params: {
            id
        }
    }= req;

    try {
        const order = await Order.findOne({ _id: id });

        if (!order) {
            return res.status(404).json({message:"Order not found."})
        }

        if (order.user.toString() !== req.auth.userId) {
            return res.status(401).json({message:"Unauthorized."})
        }

        await Order.updateOne({ _id: id }, { ...req.body });
        res.status(200).json({message:"Order is updated."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.deleteOrder = async (req, res, next) => {
    const {
        params: {
            id
        }
    }= req;

    try {
        const order = await Order.findOne({ _id: id });

        if (!order) {
            return res.status(404).json({message:"Order not found."})
        }
        
        if (order.user.toString() !== req.auth.userId) {
            return res.status(401).json({message:"Unauthorized."})
        }

        await Order.deleteOne({ _id: id });
        res.status(200).json({message:"Order is deleted."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.updateStatusOrder = async (req, res, next) => {
    const {
        params: {
            id
        },
        body : {
            status
        }
    }= req;

    try {
        const order = await Order.findOne({ _id: id });

        if (!order) {
            return res.status(404).json({message:"Order not found."})
        }

        if (req.auth.role !== "Restaurant" ) {
            return res.status(401).json({message:"Unauthorized."})
        }

        if (order.restaurant !== req.auth.restaurant) {
            return res.status(401).json({message:"Unauthorized."})
        }

        order.status = status;
        await order.save();
        res.status(200).json({message:"Order status is updated."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.updateDeliveryDriver = async (req, res, next) => {
    const {
        params: {
            id
        },
        body : {
            deliveryDriver
        }
    }= req;

    try {
        const order = await Order.findOne({ _id: id });

        if (!order) {
            return res.status(404).json({message:"Order not found."})
        }

        if (req.auth.role !== "Restaurant" ) {
            return res.status(401).json({message:"Unauthorized."})
        }

        if (order.restaurant.toString() !== req.auth.userId) {
            return res.status(401).json({message:"Unauthorized."})
        }

        order.deliveryDriver = deliveryDriver;
        await order.save();
        res.status(200).json({message:"Delivery driver is updated."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};