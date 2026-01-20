const mongoose = require("mongoose");

module.exports = mongoose.model("MenuItem", new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    vegType: String,
    spiceLevel: String,
    price: Number,
    image: String,
    capacity: String,
    available: { type: Boolean, default: true }
}));
