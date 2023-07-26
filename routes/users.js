const express = require("express");
const router = express.Router();
const verif = require("../middleware/VerifyToken");

const { findUsers,findUserById,addUser,editUser,deleteUser } = require("../controllers/userController");

// Find User Data List Route
router.get('/', findUsers);

// Find User By Id Route
router.get('/:id', findUserById);

// Create User Route
router.post("/", verif, addUser);

// Edit User Data Route
router.post("/:id", verif, editUser);

// Delete User Route
router.delete("/:id", verif, deleteUser);

module.exports = router;