const mysql = require("mysql2/promise");
const { DB_CONFIG } = require("./config");

let connection;

/**
 * Error específico para recursos inexistentes en la DB.
 */
class ResourceNotFoundError extends Error {
  /**
   * @param {string} message
   * @param {string} resource
   * @param {number} id
   */
  constructor(message, resource, id) {
    super(message);
    this.resource = resource;
    this.id = id;
  }
}

/**
 * @typedef {Object} TUser
 * @property {string} username Usuario.
 * @property {string} password Password.
 * @property {string} name Nombre.
 * @property {number} age Edad.
 *
 * @typedef {TUser & {
 *    id: number,
 *  }} TUserDB
 *
 * @typedef {Object} TFilterQuery
 * @property {string|undefined} username Usuario.
 * @property {string|undefined} password Password.
 * @property {string|undefined} name Nombre.
 * @property {number|undefined} age Edad.
 */

const initDB = async () => {
  connection = await mysql.createConnection(DB_CONFIG);
};

const list = async () => {
  const [users] = await connection.execute("SELECT * FROM Usuario");
  return users;
};

const find = async (userId) => {
  const [users] = await connection.execute(
    "SELECT * FROM Usuario WHERE id = ?",
    [userId]
  );

  if (users.length > 0) {
    return users[0];
  } else {
    return undefined;
  }
};

const add = async (userData) => {
  //validateUser(userData);
  let result = undefined;
  try {
    console.info("PRE INSERT - ", userData);
    const { username, nombre, apellido, password, root } = userData;
    [result] = await connection.execute(
      "INSERT INTO Usuario (username, nombre, apellido, password, root) VALUES(?, ?, ?, ?, ?)",
      [username, nombre, apellido, password, root]
    );

    console.info("POST INSERT NO ERROR ", result);
  } catch (err) {
    console.error("POST INSERT ERROR (catch) ", err.message);
  } finally {
    console.info("POST INSERT (finally) ");
    return await find(result.insertId);
  }
};

const update = async (userId, newUserData) => {
  const user = await find(userId);

  if (!user) {
    throw new ResourceNotFoundError(
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

  await connection.execute(
    "UPDATE Usuario SET username = ?, nombre = ?, apellido = ?, password = ? WHERE id = ?",
    [user.username, user.nombre, user.apellido, user.password, user.id]
  );

  return user;
};

const remove = async (userId) => {
  const user = await find(userId);

  if (!user) {
    throw new ResourceNotFoundError(
      `No existe un usuario con ID "${userId}"`,
      "user",
      userId
    );
  }

  await connection.execute("DELETE FROM Usuario WHERE id = ?", [user.id]);
};

module.exports = {
  initDB,
  list,
  find,
  add,
  update,
  remove,
  ResourceNotFoundError,
};
