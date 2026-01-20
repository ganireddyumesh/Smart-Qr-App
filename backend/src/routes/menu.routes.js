const router = require("express").Router();
const MenuItem = require("../models/MenuItem");

// Get all menu items
router.get("/", async (req, res) => {
    try {
        const menu = await MenuItem.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new menu item
router.post("/", async (req, res) => {
    try {
        const item = await MenuItem.create(req.body);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update menu item
router.put("/:id", async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete menu item
router.delete("/:id", async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
