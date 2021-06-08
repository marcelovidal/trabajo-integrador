const database = require("../../database");
/* const validateName = require('../../validations/user/validateName');
const validateAge = require('../../validations/user/validateAge');
const validateErrors = require('../../validations/validateErrors');
 */

// PUT /api/users/:userId
module.exports = (route) => {
  route.put(
    "/:userId",
    /*     validateName,
    validateAge,
    validateErrors,
 */ async (req, res) => {
      const userId = parseInt(req.params.userId);
      const username = req.body.username;
      const nombre = req.body.nombre;
      const apellido = req.body.apellido;
      const password = req.body.password;

      const user = await database.update(userId, {
        username: username.trim(),
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        password: password.trim(),
      });

      res.json(user);
    }
  );
};
