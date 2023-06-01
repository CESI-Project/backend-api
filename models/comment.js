const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    message: { type: String, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId , ref: "Restaurant", required: true,},
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User", required: true},
});

const Comment = mongoose.model("Comment", DeliveryDriverSchema);
module.exports = Comment;