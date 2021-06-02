const database = require('../../database');

// GET /api/users
module.exports = (route) => {
  route.get('/', async (req, res) => {
    const filterName = req.query.filterName;
    const users = await database.list(filterName);
    res.json(users);
  });
};
