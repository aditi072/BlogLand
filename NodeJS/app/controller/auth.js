const jwt = require("jsonwebtoken");
const env = require("dotenv");
const express = require("express");
const app = express();
env.config();
var cors = require('cors')
app.use(cors());

const userCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = payload;
    next();
  } catch (error) {
    res.status(401).send({ code: 401, message: "Unauthorized!" });
  }
};

module.exports = userCheck;