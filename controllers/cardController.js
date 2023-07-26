// init bcrypt
const bcrypt = require("bcrypt");

// init validator
const Validator = require("fastest-validator");
const { Card } = require("../models");
const v = new Validator();

// Find Card Data List Function
const findCard = async (req, res) => {
    let cards = await Card.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });
    
    if (!cards) return res.json({ message: "Data not Found!" });
    return res.json(cards);
};

// Find Card By Id Function
const findCardById = async (req, res) => {
    const id = req.params.id;
    let cardById = await Card.findByPk(id, {
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    });
    
    if (!cardById) return res.json({ message: "Data not Found!" });
    return res.json(cardById);
};

// // Add Card Function
const addCard = async (req, res) => {
    const schema = {
        cardNumber: "string",
        CVV: "string|min:3",
        cardName: "string",
        cardType: "string",
        Username: "string",
        userID: "number",
        cardExpDate: "string",
    };
    
    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);
    
    bcrypt.genSalt(10, async (err, salt) => {
        let hash = await bcrypt.hash(req.body.cardNumber, salt);
        let chash = await bcrypt.hash(req.body.CVV, salt);
        let nhash = await bcrypt.hash(req.body.cardName, salt);

        await Card.create({
            cardNumber: hash,
            CVV: chash,
            cardName: nhash,
            cardType: req.body.cardType,
            Username: req.body.Username,
            userID: req.body.userID,
            cardExpDate: req.body.cardExpDate,
    });

    res.json({ message: "Data Added Successfuly" });
    });
};

// Edit Card Data Function
const editCard = async (req, res) => {
    const id = req.params.id;

    let card = await Card.findByPk(id);

    if (!card) return res.json({ message: "Data not Found!" });

    const schema = {
        cardNumber: "string|optional",
        CVV: "string|min:3|optional",
        cardName: "string|optional",
        cardType: "string|optional",
        Username: "string|optional",
        userID: "number|optional",
        cardExpDate: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) return res.status(400).json(validate);
    
    bcrypt.genSalt(10, async (err, salt) => {
        let hash = await bcrypt.hash(req.body.cardNumber, salt);
        let chash = await bcrypt.hash(req.body.CVV, salt);
        let nhash = await bcrypt.hash(req.body.cardName, salt);

        await card.update({
            cardNumber: hash,
            CVV: chash,
            cardName: nhash,
            cardType: req.body.cardType,
            Username: req.body.Username,
            userID: req.body.userID,
            cardExpDate: req.body.cardExpDate,
        });

    });
    res.json({ message: "Data Edited Successfuly" });
};

// Delete Card By Id
const deleteCard = async (req, res) => {
    const id = req.params.id;
    let delCard = await Card.findByPk(id);
    
    if (!delCard) return res.json({ message: "Data not Found!" });
    await delCard.destroy();
    res.json({ message: "Data Deleted" });
};

module.exports = { findCard, findCardById, addCard, editCard, deleteCard };
