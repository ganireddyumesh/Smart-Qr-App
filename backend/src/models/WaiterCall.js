const mongoose = require("mongoose");

module.exports = mongoose.model("WaiterCall", new mongoose.Schema({
    table: Number,
    message: String,
    status: { type: String, default: "Pending" }
}, { timestamps: true }));
