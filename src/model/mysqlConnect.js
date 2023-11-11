async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: 'mysql27-farm10.kinghost.net',
        user: 'infocimol12',
        password: 'S1a2l3a4s5',
        database: 'infocimol12',
    });
    console.log('Conectou no MySQL!');
    global.connection = connection;
    return connection;
}

async function query(sql) {
    const conn = await connect();
    const [rows] = await conn.query(sql);
    return rows;
}

module.exports = { query };
