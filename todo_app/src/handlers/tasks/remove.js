const tasks = require("../../db/tasks");

// DELETE /api/tasks/:taskId
module.exports = (route) => {
  route.delete("/:taskId", async (req, res) => {
    const taskId = parseInt(req.params.taskId);

    const result = await tasks.remove(taskId);

    res.json(result);
  });
};
