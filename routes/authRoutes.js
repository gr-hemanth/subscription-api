const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

/* REGISTER USER */

router.post("/register", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users(email, password) VALUES($1, $2) RETURNING id, email, role",
            [email, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });

    } catch (error) {

        if (error.code === "23505") {
            return res.status(400).json({ message: "User already exists" });
        }

        res.status(500).json({ message: "Server error" });
    }

});


/* LOGIN USER */

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {

        res.status(500).json({ message: "Server error" });

    }

});


/* UPGRADE SUBSCRIPTION */

router.post("/upgrade", async (req, res) => {

    const { email } = req.body;

    try {

        const result = await pool.query(
            "UPDATE users SET role='premium', subscription_expires = NOW() + INTERVAL '30 days' WHERE email=$1 RETURNING *",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "Subscription upgraded to premium",
            expires_at: result.rows[0].subscription_expires
        });

    } catch (error) {

        res.status(500).json({ message: "Server error" });

    }

});

module.exports = router;