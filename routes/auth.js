var express = require("express");
var router = express.Router();

const { register,login,generateToken,logout } = require("../controllers/authController");

// Register Route
router.post("/register",register);

// Login Route
router.post("/login", login);

// Generate Token Route
router.get("/token", generateToken);

// Logout Route
router.delete("/logout", logout);

module.exports = router;