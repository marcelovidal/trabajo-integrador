const { body } = require('express-validator');

module.exports = body('age')
  .notEmpty()
  .withMessage('Campo obligatorio')
  .bail()
  .isInt()
  .withMessage('Debe ser un número entero');
