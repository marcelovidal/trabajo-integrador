const express = require("express");
const list = require("./list");

const usersRouting = express.Router();
list(usersRouting);

const usersAPI = express.Router();
usersAPI.use("/users", usersRouting);

module.exports = usersAPI;
