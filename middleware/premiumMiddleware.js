const pool = require("../config/db");

async function premiumMiddleware(req, res, next) {
    try {

        const userId = req.user.id;

        const result = await pool.query(
            "SELECT role, subscription_expires FROM users WHERE id = $1",
            [userId]
        );

        const user = result.rows[0];

        if (!user || user.role !== "premium") {
            return res.status(403).json({
                message: "Premium subscription required"
            });
        }

        if (user.subscription_expires && new Date() > user.subscription_expires) {
            return res.status(403).json({
                message: "Subscription expired"
            });
        }

        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = premiumMiddleware;