// init validator
const Validator = require("fastest-validator");
const { Level } = require("../models");
const v = new Validator();

// Find Level Data List Function
const findLevel = async (req, res) => {
    let level = await Level.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });

    if (!level) return res.json({ message: "Data not Found!" });
    return res.json(level);
};

// Find Level By Id Function
const findLevelById = async (req, res) => {
    const id = req.params.id;
    let levelById = await Level.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });

    if (!levelById) return res.json({ message: "Data not Found!" });
    return res.json(levelById);
};

// Add Level Function
const addLevel = async (req, res) => {
    const schema = {levelName: "string"};

    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);

    try {
        await Level.create({
            levelName: req.body.levelName
        });
        res.json({ message: "Data Added Successfuly" });
    } catch (error) {
        res.status(400).json({ message: "Data Already Exist!" });
    }

};

// Edit Card Data Function
const editLevel = async (req, res) => {
    const id = req.params.id;
    let level = await Level.findByPk(id);

    if (!level) return res.json({ message: "Data not Found!" });

    const schema = { levelName: "string|optional" };
    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);

    level = await level.update(req.body);
    res.json({ message: "Data Edited Successfuly",level });
};

// Delete Card By Id
const deleteLevel = async (req, res) => {
    const id = req.params.id;
    let delLevel = await Level.findByPk(id);

    if (!delLevel) return res.json({ message: "Data not Found!" });
    await delLevel.destroy();
    res.json({ message: "Data Deleted" });
};

module.exports = { findLevel, findLevelById, addLevel, editLevel, deleteLevel };
