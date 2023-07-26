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
                association: "userToCard",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
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
                association: "userToCard",
                attributes: {
                    exclude: ["userID", "createdAt", "updatedAt"],
                },
            },
        ],
    });

    if (!userById) return res.json({ message: "User not Found!" });
    // return res.json(userById);
    return res.json({
        id: userById.id,
        nama: userById.nama,
        email: userById.email,
        alamat: {
            alamat: userById.alamat_lengkap,
            nomor: userById.alamat_no,
            Rt_Rw: userById.alamat_rtrw,
        },
        device: {
            type: userById.dev_type,
            model: userById.dev_model,
            version: userById.dev_ver,
        },
        card: userById.userToCard,
    });
};

// Create User Function
const addUser = async (req, res) => {
    const schema = {
        nama: "string",
        email: "string",
        user_id: "string",
        app_pin: "string",
        alamat_no: "number",
        alamat_lengkap: "string",
        alamat_rtrw: "string",
        dev_type: "string",
        dev_model: "string",
        dev_ver: "string",
        password: "string|min:8",
        confpassword: "string|min:8",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);

    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {

            await User.create({
                nama: req.body.nama,
                email: req.body.email,
                user_id: req.body.user_id,
                app_pin: req.body.app_pin,
                alamat_no: req.body.alamat_no,
                alamat_lengkap: req.body.alamat_lengkap,
                alamat_rtrw: req.body.alamat_rtrw,
                dev_type: req.body.dev_type,
                dev_model: req.body.dev_model,
                dev_ver: req.body.dev_ver,
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
        user_id: "string|optional",
        app_pin: "string|optional",
        alamat_no: "number|optional",
        alamat_lengkap: "string|optional",
        alamat_rtrw: "string|optional",
        dev_type: "string|optional",
        dev_model: "string|optional",
        dev_ver: "string|optional",
        password: "string|min:8|optional",
        confpassword: "string|min:8|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);
    update = await user.update(req.body);

    res.json({ message: "Data Edited Successfuly" }, update);
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
