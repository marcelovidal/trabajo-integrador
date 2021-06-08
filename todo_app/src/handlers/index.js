const express = require("express");
const usersRouting = require("./users");

const apiRouting = express.Router();

apiRouting.use("/api", usersRouting);

module.exports = apiRouting;
