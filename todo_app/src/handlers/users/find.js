const database = require('../../database');

// GET /api/users/:userId
module.exports = (route) => {
  route.get('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await database.find(userId);

    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  });
};
