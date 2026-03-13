const adminRoutes = require("./routes/adminRoutes");
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/content", contentRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Subscription API is running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});