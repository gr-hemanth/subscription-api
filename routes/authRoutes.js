const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

let users = [];

/* REGISTER */

router.post("/register", async (req, res) => {

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        role: "free"
    };

    users.push(user);

    res.json({ message: "User registered successfully" });

});


/* LOGIN */

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        "secretkey",
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login successful",
        token: token
    });

});

router.post("/upgrade", (req, res) => {

    const { email } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.role = "premium";

    res.json({
        message: "Subscription upgraded to premium"
    });

});
module.exports = router;