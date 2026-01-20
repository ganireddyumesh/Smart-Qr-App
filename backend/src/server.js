const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedMenu = require("./seed/menuSeed");
const seedUsers = require("./seed/userSeed");

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(async () => {
    await seedMenu();
    await seedUsers();
});

app.use("/api/menu", require("./routes/menu.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/waiter", require("./routes/waiter.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => console.log(`Backend running on port ${PORT}`));
}

module.exports = app;
