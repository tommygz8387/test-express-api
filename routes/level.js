const express = require("express");
const router = express.Router();
const verif = require("../middleware/VerifyToken");

const { findLevel, findLevelById, addLevel, editLevel, deleteLevel } = require("../controllers/levelController");

// Find Level Data List Route
router.get('/', findLevel);

// Find Level By Id Route
router.get('/:id', findLevelById);

// Add Level Route
router.post("/", verif, addLevel);

// Edit Level Data Route
router.post("/:id", verif, editLevel);

// Delete Level Route
router.delete("/:id", verif, deleteLevel);


module.exports = router;