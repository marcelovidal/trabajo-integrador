const database = require("../../database");

// GET /api/users

module.exports = (route) => {
  route.get("/", async (req, res) => {
    const users = await database.list();
    res.json(users);
  });
};
