const mongoose = require("mongoose");
const emailUniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    role: { type: String, required: true, default: "User" , enum: ["User", "Admin", "SuperAdmin"]}
});

UserSchema.plugin(emailUniqueValidator);

const User = mongoose.model("User", UserSchema);
module.exports = User;