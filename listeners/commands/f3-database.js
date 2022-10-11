//get the client
const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const mysqlServer = process.env.MYSQL_SERVER;
const mysqlDatabase = process.env.MYSQL_DATABASE;
const mysqlPort = process.env.MYSQL_PORT;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;

const execute_sql = async (sql) => {

    //create the connection
    const connection = await mysql.createConnection({
        host: mysqlServer,
        user: mysqlUser,
        password: mysqlPassword,
        database: mysqlDatabase,
        port: mysqlPort,
        Promise: bluebird
    });

    //query the database
    const [rows, fields] = await connection.execute(sql);
    return rows;
}

//Globally available functionality
module.exports = { execute_sql };