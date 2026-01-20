const router = require("express").Router();
const Call = require("../models/WaiterCall");

router.post("/call", async (req, res) => {
    const call = await Call.create(req.body);
    res.json(call);
});

router.get("/calls", async (req, res) => {
    const calls = await Call.find({ status: "Pending" });
    res.json(calls);
});

router.put("/:id", async (req, res) => {
    try {
        const call = await Call.findByIdAndUpdate(req.params.id, { status: "Resolved" }, { new: true });
        res.json(call);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
