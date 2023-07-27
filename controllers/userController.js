// init bcrypt
const bcrypt = require("bcrypt");

// init validator
const Validator = require("fastest-validator");
const { User } = require("../models");
const v = new Validator();

// Find User Data List Function
const findUsers = async (req, res) => {
    let users = await User.findAll({
        attributes: ["id", "nama", "email"],
        include: [
            {
                association: "userToLevel",
                attributes: ["id","levelName"]
            },
            {
                association: "userToDepartment",
                attributes: ["id","departmentName"]
            }
        ],
    });

    if (!users) return res.json({ message: "User not Found!" });
    return res.json(users);
};

// Find User By Id Function
const findUserById = async (req, res) => {
    const id = req.params.id;
    let userById = await User.findByPk(id, {
        include: [
            {
                association: "userToLevel",
                attributes: ["id", "levelName"]
            },
            {
                association: "userToDepartment",
                attributes: ["id", "departmentName"]
            }
        ],
    });

    if (!userById) return res.json({ message: "User not Found!" });
    // return res.json(userById);
    return res.json({
        id: userById.id,
        nama: userById.nama,
        nip: userById.nip,
        email: userById.email,
        alamat: userById.alamat,
        no_tlp: userById.no_tlp,
        level: userById.userToLevel.levelName,
        department: userById.userToDepartment.departmentName,
    });
};

// Create User Function
const addUser = async (req, res) => {
    const schema = {
        nama: "string",
        nip: "string",
        email: "string",
        alamat: "string",
        no_tlp: "string",
        levelID: "number",
        departmentID: "number",
        password: "string|min:8",
        confpassword: "string|min:8",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);

    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {

            await User.create({
                nama: req.body.nama,
                nip: req.body.nip,
                email: req.body.email,
                alamat: req.body.alamat,
                no_tlp: req.body.no_tlp,
                levelID: req.body.levelID,
                departmentID: req.body.departmentID,
                password: hash,
            });

            res.json({ message: "Account Added Successfuly" });
        });
    });
};

// Edit User Data Function
const editUser = async (req, res) => {
    const id = req.params.id;

    let user = await User.findByPk(id);

    if (!user) return res.json({ message: "User not Found!" });

    const schema = {
        nama: "string|optional",
        email: "string|optional",
        nip: "string|optional",
        alamat: "string|optional",
        no_tlp: "string|optional",
        levelID: "number|optional",
        departmentID: "number|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);
    update = await user.update(req.body);

    res.json({ message: "Data Edited Successfuly",update });
};

// Delete User By Id
const deleteUser = async (req, res) => {
    const id = req.params.id;
    let delUser = await User.findByPk(id);

    if (!delUser) return res.json({ message: "User not Found!" });
    await delUser.destroy();

    res.json({ message: "User Deleted" });
};

module.exports = { findUsers, findUserById, addUser, editUser, deleteUser };
