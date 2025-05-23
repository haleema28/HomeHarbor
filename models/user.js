const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Apply plugin *before* creating model
userSchema.plugin(passportLocalMongoose);

// Define model after schema & plugin
const User = mongoose.model('User', userSchema);

module.exports = User;
