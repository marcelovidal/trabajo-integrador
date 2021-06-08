const express = require("express");
const list = require("./list");
const find = require("./find");
const add = require("./add");
const update = require("./update");
const remove = require("./remove");

const usersRouting = express.Router();
list(usersRouting);
find(usersRouting);
add(usersRouting);
update(usersRouting);
remove(usersRouting);

const usersAPI = express.Router();
usersAPI.use("/users", usersRouting);

module.exports = usersAPI;
