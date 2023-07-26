// init validator
const Validator = require("fastest-validator");
const { History } = require("../models");
const v = new Validator();

// Find History List Function
const findHistory = async (req, res) => {
    let history = await History.findAll({
        attributes: [
            "id",
            "Merchant",
            "Success",
            ],
        include: [
        {
            association: "historyToUserID",
            attributes: [
            "id",
            "nama",
            "email",
            ],
        },{
            association: "historyToCardID",
            attributes: [
            "id",
            "cardType",
            "Username",
            "cardExpDate",
            ],
        },
    ],
    });

    if (!history) return res.json({ message: "Data not Found!" });
    return res.json(history);
};

// Find History By Id Function
const findHistoryById = async (req, res) => {
    const id = req.params.id;
    let historyById = await History.findByPk(id, {
        attributes: [
            "id",
            "Merchant",
            "Success",
            ],
        include: [
        {
            association: "historyToUserID",
            attributes: [
            "id",
            "nama",
            "email",
            ],
        },{
            association: "historyToCardID",
            attributes: [
            "id",
            "cardType",
            "Username",
            "cardExpDate",
            ],
        },
    ],
    });

    if (!historyById) return res.json({ message: "Data not Found!" });
    return res.json(historyById);
};

// Create History Function
const addHistory = async (req, res) => {
    const schema = {
        userID: "number",
        cardID: "number",
        Merchant: "string",
        Success: "boolean",
    };
    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);
    await History.create(req.body);

    res.json({ message: "Data Added Successfuly" });
};

// Edit History Data Function
const editHistory = async (req, res) => {
    const id = req.params.id;

    let his = await History.findByPk(id);

    if (!his) return res.json({ message: "Data not Found!" });
    const schema = {
        userID: "number|optional",
        cardID: "number|optional",
        Merchant: "string|optional",
        Success: "boolean|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);
    update = await his.update(req.body);

    res.json({ message: "Data Edited Successfuly" });
};

// Delete History By Id
const deleteHistory = async (req, res) => {
    const id = req.params.id;
    let delHis = await History.findByPk(id);

    if (!delHis) return res.json({ message: "Data not Found!" });
    await delHis.destroy();

    res.json({ message: "Data Deleted" });
};

module.exports = { findHistory, findHistoryById, addHistory, editHistory, deleteHistory };