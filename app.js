require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cardRouter = require("./routes/card");
const authRouter = require("./routes/auth");
const historyRouter = require("./routes/history");

const app = express();

app.use(logger("dev"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/0", authRouter);
// app.use("/users", usersRouter);
app.use("/users", verif, usersRouter);
// app.use("/card", cardRouter);
app.use("/card", verif, cardRouter);
// app.use("/history", historyRouter);
app.use("/history", verif, historyRouter);

module.exports = app;
