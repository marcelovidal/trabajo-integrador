const users = require("../../db/users");

// GET /api/users

module.exports = (route) => {
  route.get("/", async (req, res) => {
    const usersList = await users.list();
    res.json(usersList);
  });
};
