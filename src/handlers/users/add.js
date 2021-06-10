const tasks = require("../../db/tasks");
//const validateName = require('../../validations/user/validateName');
//const validateAge = require('../../validations/user/validateAge');
//const validateErrors = require('../../validations/validateErrors');

// POST /api/users
module.exports = (route) => {
  route.post("/", async (req, res) => {
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const fechaLimite = req.body.fechaLimite;
    const estado = req.body.estado;
    const fechaCreacion = req.body.fechaCreacion;
    const fechaActualizacion = req.body.fechaActualizacion;
    const usuarioId = req.body.usuarioId;

    const task = await tasks.add({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      fechaLimite: fechaLimite,
      estado: estado,
      fechaCreacion: fechaCreacion,
      fechaActualizacion: fechaActualizacion,
      usuarioId: usuarioId,
    });

    res.json(task);
  });
};
