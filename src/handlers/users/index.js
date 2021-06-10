const express = require("express");
const usersRouting = require("./users");
const tasksRouting = require("./tasks");

const apiRouting = express.Router();

apiRouting.use("/api", usersRouting);
apiRouting.use("/api", tasksRouting);

module.exports = apiRouting;
