
const mySql = require("mysql2/promise")
const CONFIG = require("../config/config.json")

const dbConfig = {
    host: CONFIG.mysql.host,
    user: CONFIG.mysql.user,
    password: CONFIG.mysql.password,
    database: CONFIG.mysql.database
}

const dbConnection = async () => {
    const connection = await mySql.createPool(dbConfig)
    global.pool = await connection.getConnection();
    return connection;
}
module.exports = dbConnection;