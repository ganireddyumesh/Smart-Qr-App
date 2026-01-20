const Menu = require("../models/MenuItem");

module.exports = async () => {
    // Clear existing menu to avoid duplicates
    await Menu.deleteMany({});

    await Menu.insertMany([
        // Beverages
        { name: "Mineral Water", category: "Beverages", vegType: "Veg", spiceLevel: "Mild", price: 20, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Mineral%20Water%20bottle&w=500&h=500&c=7" },
        { name: "Fresh Lime Soda", category: "Beverages", vegType: "Veg", spiceLevel: "Mild", price: 60, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Fresh%20Lime%20Soda&w=500&h=500&c=7" },
        { name: "Butter Milk", category: "Beverages", vegType: "Veg", spiceLevel: "Mild", price: 50, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Chaas%20Butter%20Milk&w=500&h=500&c=7" },
        { name: "Sweet Lassi", category: "Beverages", vegType: "Veg", spiceLevel: "Mild", price: 70, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Sweet%20Lassi&w=500&h=500&c=7" },
        { name: "Salt Lassi", category: "Beverages", vegType: "Veg", spiceLevel: "Mild", price: 70, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Salt%20Lassi&w=500&h=500&c=7" },
        { name: "Cold Coffee", category: "Beverages", vegType: "Veg", spiceLevel: "Mild", price: 90, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Cold%20Coffee&w=500&h=500&c=7" },
        { name: "Masala Tea", category: "Beverages", vegType: "Veg", spiceLevel: "Mild", price: 30, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Indian%20Masala%20Tea&w=500&h=500&c=7" },
        { name: "Green Tea", category: "Beverages", vegType: "Veg", spiceLevel: "Mild", price: 40, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Green%20Tea%20cup&w=500&h=500&c=7" },

        // Starters (Veg)
        { name: "Veg Manchurian", category: "Starters", vegType: "Veg", spiceLevel: "Medium", price: 140, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Veg%20Manchurian&w=500&h=500&c=7" },
        { name: "Paneer 65", category: "Starters", vegType: "Veg", spiceLevel: "Spicy", price: 160, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Paneer%2065&w=500&h=500&c=7" },
        { name: "Paneer Tikka", category: "Starters", vegType: "Veg", spiceLevel: "Medium", price: 180, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Paneer%20Tikka&w=500&h=500&c=7" },
        { name: "Gobi 65", category: "Starters", vegType: "Veg", spiceLevel: "Spicy", price: 130, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Gobi%2065&w=500&h=500&c=7" },
        { name: "Crispy Corn", category: "Starters", vegType: "Veg", spiceLevel: "Medium", price: 120, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Crispy%20Corn%20snack&w=500&h=500&c=7" },
        { name: "French Fries", category: "Starters", vegType: "Veg", spiceLevel: "Mild", price: 100, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=French%20Fries&w=500&h=500&c=7" },

        // Starters (Non-Veg)
        { name: "Chicken 65", category: "Starters", vegType: "Non-Veg", spiceLevel: "Spicy", price: 180, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Chicken%2065&w=500&h=500&c=7" },
        { name: "Chicken Manchurian", category: "Starters", vegType: "Non-Veg", spiceLevel: "Medium", price: 190, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Chicken%20Manchurian&w=500&h=500&c=7" },
        { name: "Chicken Tikka", category: "Starters", vegType: "Non-Veg", spiceLevel: "Medium", price: 220, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Chicken%20Tikka&w=500&h=500&c=7" },
        { name: "Chilli Chicken", category: "Starters", vegType: "Non-Veg", spiceLevel: "Spicy", price: 200, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Chilli%20Chicken&w=500&h=500&c=7" },
        { name: "Fish Fry", category: "Starters", vegType: "Non-Veg", spiceLevel: "Medium", price: 240, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Indian%20Fish%20Fry&w=500&h=500&c=7" },
        { name: "Prawn Fry", category: "Starters", vegType: "Non-Veg", spiceLevel: "Spicy", price: 280, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Prawn%20Fry&w=500&h=500&c=7" },

        // Main Course (Veg)
        { name: "Veg Biryani", category: "Main Course", vegType: "Veg", spiceLevel: "Medium", price: 150, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Veg%20Biryani&w=500&h=500&c=7" },
        { name: "Paneer Biryani", category: "Main Course", vegType: "Veg", spiceLevel: "Medium", price: 180, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Paneer%20Biryani&w=500&h=500&c=7" },
        { name: "Veg Fried Rice", category: "Main Course", vegType: "Veg", spiceLevel: "Medium", price: 140, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Veg%20Fried%20Rice&w=500&h=500&c=7" },
        { name: "Paneer Butter Masala", category: "Main Course", vegType: "Veg", spiceLevel: "Medium", price: 190, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Paneer%20Butter%20Masala&w=500&h=500&c=7" },

        // Main Course (Non-Veg)
        { name: "Chicken Biryani", category: "Main Course", vegType: "Non-Veg", spiceLevel: "Spicy", price: 220, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Chicken%20Biryani&w=500&h=500&c=7" },
        { name: "Dum Chicken Biryani", category: "Main Course", vegType: "Non-Veg", spiceLevel: "Spicy", price: 250, capacity: "2 People", image: "https://tse2.mm.bing.net/th?q=Dum%20Chicken%20Biryani&w=500&h=500&c=7" },
        { name: "Mutton Biryani", category: "Main Course", vegType: "Non-Veg", spiceLevel: "Spicy", price: 320, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Mutton%20Biryani&w=500&h=500&c=7" },
        { name: "Chicken Fried Rice", category: "Main Course", vegType: "Non-Veg", spiceLevel: "Medium", price: 200, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Chicken%20Fried%20Rice&w=500&h=500&c=7" },

        // Desserts
        { name: "Gulab Jamun (2 pcs)", category: "Desserts", vegType: "Veg", spiceLevel: "Mild", price: 60, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Gulab%20Jamun&w=500&h=500&c=7" },
        { name: "Double Ka Meetha", category: "Desserts", vegType: "Veg", spiceLevel: "Mild", price: 80, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Double%20Ka%20Meetha&w=500&h=500&c=7" },
        { name: "Ice Cream (Vanilla)", category: "Desserts", vegType: "Veg", spiceLevel: "Mild", price: 70, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Vanilla%20Ice%20Cream&w=500&h=500&c=7" },
        { name: "Ice Cream (Chocolate)", category: "Desserts", vegType: "Veg", spiceLevel: "Mild", price: 80, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Chocolate%20Ice%20Cream&w=500&h=500&c=7" },
        { name: "Brownie with Ice Cream", category: "Desserts", vegType: "Veg", spiceLevel: "Mild", price: 120, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Sizzling%20Brownie&w=500&h=500&c=7" },
        { name: "Fruit Salad", category: "Desserts", vegType: "Veg", spiceLevel: "Mild", price: 90, capacity: "Single", image: "https://tse2.mm.bing.net/th?q=Fruit%20Salad%20bowl&w=500&h=500&c=7" }
    ]);

    console.log("Menu seeded");
};
