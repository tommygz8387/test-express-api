const express = require("express");
const router = express.Router();
const verif = require("../middleware/VerifyToken");

const { findCard, findCardById, addCard, editCard, deleteCard } = require("../controllers/cardController");

// Find Card Data List Route
router.get('/', findCard);

// Find Card By Id Route
router.get('/:id', findCardById);

// Add Card Route
router.post("/", verif ,addCard);

// Edit Card Data Route
router.post("/:id", verif, editCard);

// Delete Card Route
router.delete("/:id", verif, deleteCard);


module.exports = router;