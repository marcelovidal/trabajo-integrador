const database = require('../../database');
const validateName = require('../../validations/user/validateName');
const validateAge = require('../../validations/user/validateAge');
const validateErrors = require('../../validations/validateErrors');

/**
 * PUT /api/users/:userId
 *
 * name: obligatorio, debe tener por lo menos 3 caracteres
 * age: obligatorio
 */
module.exports = (route) => {
  route.put(
    '/:userId',
    validateName,
    validateAge,
    validateErrors,
    async (req, res) => {
      const userId = parseInt(req.params.userId);
      const name = req.body.name;
      const age = req.body.age;

      const user = await database.update(userId, {
        name: name.trim(),
        age: parseInt(age),
      });

      res.json(user);
    }
  );
};
