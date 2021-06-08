const database = require("./database");

const list = async () => {
  const tasks = await database.list("Tarea");
  return tasks;
};

const find = async (taskId) => {
  return await database.find("Tarea", taskId);
};

const add = async (taskData) => {
  //validateUser(userData);
  let result = undefined;

  const {
    titulo,
    descripcion,
    fechaLimite,
    estado,
    fechaCreacion,
    fechaActualizacion,
    usuarioId,
  } = taskData;

  const task = await database.add(
    "Tarea",
    "titulo, descripcion, fecha_limite, estado, fecha_creacion, fecha_actualizacion, usuario_id",
    "?, ?, ?, ?, ?, ?, ?",
    [
      titulo,
      descripcion,
      fechaLimite,
      estado,
      fechaCreacion,
      fechaActualizacion,
      usuarioId,
    ]
  );

  return task;
};

const update = async (taskId, newTaskData) => {
  let task = await database.find("Tarea", taskId);

  if (!task) {
    throw new database.ResourceNotFoundError(
      `No existe una tarea con ID "${taskId}"`,
      "tarea",
      taskId
    );
  }

  //validateUser(newUserData);

  task.titulo = newTaskData.titulo;
  task.descripcion = newTaskData.descripcion;
  task.fechaLimite = newTaskData.fechaLimite;
  task.estado = newTaskData.estado;
  task.fechaCreacion = newTaskData.fechaCreacion;
  task.fechaActualizacion = newTaskData.fechaActualizacion;
  task.usuarioId = newTaskData.usuarioId;

  task = await database.update(
    "Tarea",
    taskId,
    "titulo = ?, descripcion = ?, fecha_limite = ?, estado = ?, fecha_creacion = ?, fecha_actualizacion = ?, usuario_id = ?",
    [
      task.titulo,
      task.descripcion,
      task.fechaLimite,
      task.estado,
      task.fechaCreacion,
      task.fechaActualizacion,
      task.usuarioId,
    ]
  );

  return task;
};

const remove = async (taskId) => {
  let task = await database.find("Tarea", taskId);

  if (!task) {
    throw new database.ResourceNotFoundError(
      `No existe una tarea con ID "${taskId}"`,
      "task",
      taskId
    );
  }

  task = await database.remove("Tarea", [taskId]);

  return task;
};

module.exports = {
  list,
  find,
  add,
  update,
  remove,
};
