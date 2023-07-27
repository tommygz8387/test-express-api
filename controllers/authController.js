// init bcrypt
const bcrypt = require("bcrypt");
// init jwt
const jwt = require("jsonwebtoken");

// init validator
const Validator = require("fastest-validator");
const { User } = require("../models");
const v = new Validator();

// Register Function
// dalam kasus ini sebaiknya tidak menggunakan register
// karna login menggunakan beberapa level akses

const register =(req, res) => {
  try {
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
    if (!req.body.password == req.body.confpassword) return res.status(400).json({ message: "Password Didn't Match!" });
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        const validate = v.validate(req.body, schema);

        if (validate.length) return res.status(400).json(validate);
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

        res.json({ message: "Register Success" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
}

// Login Function
const login = async (req, res) => {
  try {
    const user = await User.findAll({
      where: { email: req.body.email },
    });

    const Match = await bcrypt.compare(req.body.password, user[0].password);
    if (!Match) return res.status(400).json({ message: "Password Wrong!" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const uid = user[0].user_id;
    const pin = user[0].app_pin;
    const accessToken = jwt.sign(
      { userId, name, email, uid, pin },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600s" }
    );
    const refreshToken = jwt.sign(
      { userId, name, email, uid, pin },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.update(
      { refresh_token: refreshToken },
      { where: { id: userId } }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ message: "Account Doesn't Exist!" });
  }
};

// Generate Token Function
const generateToken = async (req, res) => {
  try {
    const refToken = req.cookies.refreshToken;
    if (!refToken) return res.sendStatus(401);
    const user = await User.findAll({
      where: { refresh_token: refToken },
    });

    if (!user[0]) return res.sendStatus(403);
    jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const userId = user[0].id;
      const name = user[0].name;
      const email = user[0].email;
      const uid = user[0].user_id;
      const pin = user[0].app_pin;
      const accessToken = jwt.sign(
        { userId, name, email, uid, pin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3600s" }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

// Logout Function
const logout = async (req, res) => {
  try {
    const refToken = req.cookies.refreshToken;
    if (!refToken) return res.sendStatus(204);
    const user = await User.findAll({
      where: { refresh_token: refToken, },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update(
      { refresh_token: null },
      { where: { id: userId, }, }
    );
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { register,login,generateToken,logout };
