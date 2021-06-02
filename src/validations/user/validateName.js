const { body } = require('express-validator');
const database = require('../../database');

module.exports = body('name')
    .trim()
    .notEmpty()
    .withMessage('Campo obligatorio')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Debe tener 3 caracteres');
// .custom(async(name) => {
//     const [users] = await database.connection.execute(
//         `SELECT * FROM users WHERE name = ?`, [name]
//     );
//     if (users.length > 0) {
//         return Promise.reject("El usuario ya existe");
//     } else {
//         return Promise.resolve()
//     }
// });