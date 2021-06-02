const mysql = require('mysql2/promise');
const { DB_CONFIG } = require('./config');

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

/**
 * Validar datos del usuario.
 *
 * @param {TUser} userData
 */
function validateUser(userData) {
    if (!userData) {
        throw new Error(`No se ha definidio el usuario`);
    }

    if (!userData.name || !userData.name.trim()) {
        throw new Error(`La propiedad 'name' es requerida`);
    }

    if (userData.username && !userData.username.trim()) {
        throw new Error(`La propiedad 'username' no puede ser vacía`);
    }

    if (userData.password && !userData.password.trim()) {
        throw new Error(`La propiedad 'password' no puede ser vacía`);
    }

    if (!userData.age ||
        isNaN(userData.age) ||
        userData.age < 18 ||
        userData.age > 200
    ) {
        throw new Error(`La propiedad 'age' es inválida`);
    }
}

module.exports = {
    get connection() {
        return connection;
    },
    async initDB() {
        connection = await mysql.createConnection(DB_CONFIG);
    },
    /**
     * Listar.
     *
     * @param {string|undefined} filterName Filtrar por nombre.
     * @returns {TUserDB[]}
     */
    async list(filterName) {
        const [users] = await connection.execute('SELECT * FROM users');

        // if (filterName && filterName.trim()) {
        //   filterName = filterName.trim().toLowerCase();

        //   users = users.filter((user) =>
        //     user.name.toLowerCase().includes(filterName)
        //   );
        // }

        return users;
    },

    /**
     * Buscar un usuario por ID.
     *
     * @param {number} userId ID de Usuario.
     * @returns {TUserDB | undefined}
     */
    async find(userId) {
        const [users] = await connection.execute(
            'SELECT * FROM users WHERE id = ?', [userId]
        );

        if (users.length > 0) {
            return users[0];
        } else {
            return undefined;
        }
    },

    /**
     * Buscar usuarios.
     *
     * @param {TFilterQuery} query Query de búsqueda.
     * @returns {TUserDB[]}
     */
    async search(query) {
        const paramsString = Object.keys(query) // ["username", "pass"]
            .map((elem) => `${elem} = ?`) // ["username = ?", "pass = ?"]
            .join(' AND '); // "username = ? AND pass = ?"

        const [users] = await connection.execute(
            `SELECT * FROM users WHERE ${paramsString}`,
            Object.values(query)
        );

        return users;
    },

    /**
     * Agregar un usuariro.
     *
     * @param {TUser} userData
     */
    async add(userData) {
        validateUser(userData);
        const { username, password, name, age } = userData;
        const [result] = await connection.execute(
            'INSERT INTO users(username, password, name, age) VALUES(?, ?, ?, ?)', [username, password, name, age]
        );

        return await this.find(result.insertId);
    },

    /**
     * Actualizar un usuario.
     *
     * @param {number} userId
     * @param {TUser & {
     *    username?: string,
     *    password?: string,
     *  }} newUserData
     */
    async update(userId, newUserData) {
        const user = await this.find(userId);

        if (!user) {
            throw new ResourceNotFoundError(
                `No existe un usuario con ID "${userId}"`,
                'user',
                userId
            );
        }

        validateUser(newUserData);

        // Actualiza datos

        if (newUserData.username) {
            user.username = newUserData.username;
        }

        if (newUserData.password) {
            user.password = newUserData.password;
        }

        user.name = newUserData.name;
        user.age = newUserData.age;

        await connection.execute(
            'UPDATE users SET username = ?, password = ?, name = ?, age = ? WHERE id = ?', [user.username, user.password, user.name, user.age, user.id]
        );

        return user;
    },

    /**
     * Elimina un usuario.
     *
     * @param {number} userId
     */
    async remove(userId) {
        const user = await this.find(userId);

        if (!user) {
            throw new ResourceNotFoundError(
                `No existe un usuario con ID "${userId}"`,
                'user',
                userId
            );
        }

        await connection.execute('DELETE FROM users WHERE id = ?', [user.id]);
    },

    ResourceNotFoundError,
};