// const mongoose = require("mongoose");

exports.getCustomer = async (req, res, next) => {
    const stuff = {
        _id: "blabla",
        title: "test",
        price:"3000"
    }

    res.status(200).json(stuff)
}