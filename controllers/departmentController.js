// init validator
const Validator = require("fastest-validator");
const { Department } = require("../models");
const v = new Validator();

// Find Department Data List Function
const findDepartment = async (req, res) => {
    let dep = await Department.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
        include: [{
            association: "DepartmentToUser",
            attributes: ["id", "nama", "nip", "email", "no_tlp", "alamat"]
        }],
    });

    if (!dep) return res.json({ message: "Data not Found!" });
    return res.json(dep);
};

// Find Department By Id Function
const findDepartmentById = async (req, res) => {
    const id = req.params.id;
    let depById = await Department.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
        include: [{
            association: "DepartmentToUser",
            attributes: ["id", "nama", "nip", "email", "no_tlp", "alamat"]
        }],
    });

    if (!depById) return res.json({ message: "Data not Found!" });
    return res.json(depById);
};

// Add Department Function
const addDepartment = async (req, res) => {
    const schema = { departmentName: "string" };

    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);

    try {
        await Department.create({
            departmentName: req.body.departmentName
        });
        res.json({ message: "Data Added Successfuly" });
    } catch (error) {
        res.status(400).json({ message: "Data Already Exist!" });
    }

};

// Edit Department Data Function
const editDepartment = async (req, res) => {
    const id = req.params.id;
    let dep = await Department.findByPk(id);

    if (!dep) return res.json({ message: "Data not Found!" });

    const schema = { departmentName: "string|optional" };
    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);

    dep = await dep.update(req.body);
    res.json({ message: "Data Edited Successfuly", dep });
};

// Delete Department By Id
const deleteDepartment = async (req, res) => {
    const id = req.params.id;
    let delDep = await Department.findByPk(id);

    if (!delDep) return res.json({ message: "Data not Found!" });
    await delDep.destroy();
    res.json({ message: "Data Deleted" });
};

module.exports = { findDepartment, findDepartmentById, addDepartment, editDepartment, deleteDepartment };
