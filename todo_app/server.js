const { PORT } = require("./src/config");
const apiRouting = require("./src/handlers");
const express = require("express");
const { initDB } = require("./src/database");

const app = express();

app.use(express.json());

app.use(apiRouting);
app.use(express.static("./public"));

(async () => {
  await initDB();
  app.listen(PORT, () => {
    console.info(`ToDo_App listening on port ${PORT}.`);
  });
})();
