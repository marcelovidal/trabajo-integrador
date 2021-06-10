const tasks = require("../../db/tasks");

// GET /api/tasks

module.exports = (route) => {
  route.get("/", async (req, res) => {
    const tasksList = await tasks.list();
    res.json(tasksList);
  });
};
