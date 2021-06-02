const database = require('../../database');

// DELETE /api/users/:userId
module.exports = (route) => {
  route.delete('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);

    await database.remove(userId);

    res.json({
      message: 'User deleted!',
    });
  });
};
