const express = require('express');
const usersRouting = require('./users');
const { ValidationError } = require('../validations/validationError');
const authRouting = require('./auth');
const authenticateJWT = require('../middlewares/authenticateJWT');

const apiRouting = express.Router();

apiRouting.use('/api', authRouting, authenticateJWT, usersRouting);

apiRouting.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    // Respuesta para los errores de validación
    res.status(400).json({
      status: 'error',
      errors: err.formatErrors(),
    });
  } else {
    // Respuesta para otros errores
    res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
});

module.exports = apiRouting;
