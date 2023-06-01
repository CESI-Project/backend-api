const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    message: { type: String, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true,},
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User", required: true},
});

module.exports = mongoose.model('Comment', CommentSchema);