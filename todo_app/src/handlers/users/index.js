const express = require("express");
const list = require("./list");
const find = require("./find");

const usersRouting = express.Router();
list(usersRouting);
find(usersRouting);

const usersAPI = express.Router();
usersAPI.use("/users", usersRouting);

module.exports = usersAPI;
