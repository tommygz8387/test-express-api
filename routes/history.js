const express = require("express");
const router = express.Router();
const verif = require("../middleware/VerifyToken");

const { findHistory, findHistoryById, addHistory, editHistory, deleteHistory } = require("../controllers/historyController")

// Find History List Route
router.get("/", findHistory);

// Find History By Id Route
router.get("/:id", findHistoryById);

// Create History Route
router.post("/", verif, addHistory);

// Edit History Data Route
router.post("/:id", verif, editHistory);

// Delete History Route
router.delete("/:id", verif, deleteHistory);

module.exports = router;