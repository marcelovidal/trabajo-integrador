const users = require("../../db/users");
//const validateName = require('../../validations/user/validateName');
//const validateAge = require('../../validations/user/validateAge');
//const validateErrors = require('../../validations/validateErrors');

// POST /api/users
module.exports = (route) => {
  route.post("/", async (req, res) => {
    const username = req.body.username;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const password = req.body.password;
    const root = req.body.root;

    const user = await users.add({
      username: username.trim(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      password: password.trim(),
      root: root,
    });

    res.json(user);
  });
};
