async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
      return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection({
      host: '164.92.90.220',
      port:'3306',
      user: 'usersiscimol',
      password : 'g8#@&0ocC!71',
      database: 'cimol'
      
    });
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

async function query(sql){
  const conn = await connect();
  const [rows] = await conn.query(sql);
  return rows;
}

module.exports={query}
