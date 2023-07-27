const express = require("express");
const router = express.Router();
const verif = require("../middleware/VerifyToken");

const { findDepartment, findDepartmentById, addDepartment, editDepartment, deleteDepartment } = require("../controllers/departmentController");

// Find Department Data List Route
router.get('/', findDepartment);

// Find Department By Id Route
router.get('/:id', findDepartmentById);

// Add Department Route
router.post("/", verif, addDepartment);

// Edit Department Data Route
router.post("/:id", verif, editDepartment);

// Delete Department Route
router.delete("/:id", verif, deleteDepartment);


module.exports = router;