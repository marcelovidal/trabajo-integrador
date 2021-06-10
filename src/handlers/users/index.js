const express = require("express");
const list = require("./list");
const find = require("./find");
const add = require("./add");
const update = require("./update");
const remove = require("./remove");

const tasksRouting = express.Router();
list(tasksRouting);
find(tasksRouting);
add(tasksRouting);
update(tasksRouting);
remove(tasksRouting);

const tasksAPI = express.Router();
tasksAPI.use("/tasks", tasksRouting);

module.exports = tasksAPI;
