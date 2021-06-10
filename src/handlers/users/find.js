const tasks = require("../../db/tasks");

// GET /api/tasks/:taskId
module.exports = (route) => {
  route.get("/:taskId", async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const task = await tasks.find(taskId);

    if (task) {
      res.json(task);
    } else {
      res.sendStatus(404);
    }
  });
};
