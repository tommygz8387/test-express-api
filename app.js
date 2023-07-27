require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const levelRouter = require("./routes/level");
const authRouter = require("./routes/auth");
const departmentRouter = require("./routes/department");

const verify = require("./middleware/VerifyToken");

const app = express();

app.use(logger("dev"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
// app.use("/users", verify, usersRouter);
// app.use("/level", levelRouter);
app.use("/level", verify, levelRouter);
// app.use("/department", departmentRouter);
app.use("/department", verify, departmentRouter);

module.exports = app;
