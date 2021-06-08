const mysql = require("mysql2/promise");
const { DB_CONFIG } = require("../config");

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

const list = async (table) => {
  const [rows] = await connection.execute(`SELECT * FROM ${table}`);
  return rows;
};

const find = async (table, id) => {
  const [rows] = await connection.execute(
    `SELECT * FROM ${table} WHERE id = ?`,
    [id]
  );

  if (rows.length > 0) {
    return rows[0];
  } else {
    return undefined;
  }
};

const add = async (table, cols, placeHolders, rowData) => {
  //validateUser(userData);
  let result = undefined;

  try {
    [result] = await connection.execute(
      `INSERT INTO ${table} (${cols}) VALUES (${placeHolders})`,
      rowData
    );
  } catch (err) {
    console.error(err.message);
  } finally {
    return await find(table, result.insertId);
  }
};

const update = async (table, id, placeHolders, rowData) => {
  let result = undefined;

  try {
    [result] = await connection.execute(
      `UPDATE ${table} SET ${placeHolders} WHERE id = ${id}`,
      rowData
    );
  } catch (err) {
    console.error("ERROR:", err.message);
  } finally {
    return result;
  }
};

const remove = async (table, id) => {
  let result = undefined;

  try {
    [result] = await connection.execute(
      `DELETE FROM ${table} WHERE id = ${id}`
    );
  } catch (err) {
    console.error("ERROR:", err.message);
  } finally {
    return result;
  }
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
