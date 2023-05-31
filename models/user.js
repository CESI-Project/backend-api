const mongoose = require("mongoose");
const emailUniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.plugin(emailUniqueValidator);

module.exports = mongoose.model('User', UserSchema);