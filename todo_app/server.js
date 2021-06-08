const { PORT } = require("./src/config");
//const apiRouting = require("./src/handlers");
const express = require("express");

const app = express();

app.use(express.json());
//app.use(apiRouting);
app.use(express.static("./public"));

app.listen(PORT, () => {
  console.info(`Express Server listening on port ${PORT}.`);
});
