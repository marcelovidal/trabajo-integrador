const users = require("../../db/users");

// DELETE /api/users/:userId
module.exports = (route) => {
  route.delete("/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);

    const result = await users.remove(userId);

    res.json(result);
  });
};
