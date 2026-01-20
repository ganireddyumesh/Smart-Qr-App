const mongoose = require("mongoose");
const connectDB = require("../config/db");
const MenuItem = require("../models/MenuItem");

const updateImages = async () => {
    try {
        await connectDB();

        const newImage = "https://res.cloudinary.com/di1gx119a/image/upload/f_auto,q_auto,w_300/v1768887888/96fa6f31-9c01-4e08-b549-d6fafd27dd2d_fblqdf.png";

        const result = await MenuItem.updateMany({}, { $set: { image: newImage } });

        console.log(`Updated images for ${result.modifiedCount} menu items.`);
        process.exit(0);
    } catch (err) {
        console.error("Error updating images:", err);
        process.exit(1);
    }
};

updateImages();
