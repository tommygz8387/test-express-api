var express = require("express");
var router = express.Router();

const { register,login,generateToken,logout } = require("../controllers/authController");

// Register Route
// dalam kasus ini sebaiknya tidak menggunakan register
// karna login menggunakan beberapa level akses
router.post("/register",register);

// Login Route
router.post("/login", login);

// Generate Token Route
router.get("/token", generateToken);

// Logout Route
router.delete("/logout", logout);

module.exports = router;