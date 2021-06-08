const database = require("./database");

const list = async () => {
  const users = await database.list("Usuario");
  return users;
};

const find = async (userId) => {
  return await database.find("Usuario", userId);
};

const add = async (userData) => {
  //validateUser(userData);
  let result = undefined;

  const { username, nombre, apellido, password, root } = userData;

  user = await database.add(
    "Usuario",
    "username, nombre, apellido, password, root",
    "?, ?, ?, ?, ?",
    [username, nombre, apellido, password, root]
  );
  return user;
};

const update = async (userId, newUserData) => {
  let user = await database.find("Usuario", userId);

  if (!user) {
    throw new database.ResourceNotFoundError(
      `No existe un usuario con ID "${userId}"`,
      "user",
      userId
    );
  }

  //validateUser(newUserData);

  user.username = newUserData.username;
  user.nombre = newUserData.nombre;
  user.apellido = newUserData.apellido;
  user.password = newUserData.password;

  user = await database.update(
    "Usuario",
    userId,
    "username = ?, nombre = ?, apellido = ?, password = ?",
    [user.username, user.nombre, user.apellido, user.password]
  );

  return user;
};

const remove = async (userId) => {
  let user = await database.find("Usuario", userId);

  if (!user) {
    throw new database.ResourceNotFoundError(
      `No existe un usuario con ID "${userId}"`,
      "user",
      userId
    );
  }

  user = await database.remove("Usuario", [userId]);
  return user;
};

module.exports = {
  list,
  find,
  add,
  update,
  remove,
};
