const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: String,
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: Number,
        name: String, // Store name snapshot
        price: Number // Store price snapshot
    }],
    totalAmount: Number,
    status: { type: String, enum: ['Pending', 'Preparing', 'Completed'], default: 'Pending' },
    tableNumber: Number
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
