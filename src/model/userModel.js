const mysql=require("./mysqlConnect");
 get=async()=>{
  //users=await mysql.query("SELECT *, (SELECT nome FROM pessoa WHERE id=u.pessoa_id_pessoa) as nome FROM usuario u");
  users=await mysql.query("SELECT p.nome, p.email, u.senha FROM usuario u JOIN pessoa p ON p.id_pessoa=u.pessoa_id_pessoa")
  
  return users;
}

module.exports={get}