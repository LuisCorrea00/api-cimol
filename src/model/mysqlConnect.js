async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
      return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection({
      host: 'private-db-mysql-sfo3-95135-do-user-12927057-0.b.db.ondigitalocean.com',
      port:'25060',
      user: 'doadmin',
      password : 'AVNS_SOm51ZeZIavFnTW5Al5',
      database: 'defaultdb'
      
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
