const mysql=require("../mysqlConnect");
get=async()=>{
    //return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo FROM curso c");
    return await mysql.query("SELECT id_genero, nome FROM biblio_genero");
}

post= async (data)=>{
  sql="INSERT INTO biblio_genero"+
  " (nome)"+
  " VALUE"+
  " ('"+data.nome+"')";
 const result = await  mysql.query(sql);
  
  if(result){
    resp={"status":"OK", insertId:result.insertId, insertName:data.nome}
  }else{
    resp={"status":"Error", "error":result}
  }   
  return resp;
}

put= async (data, generoId)=>{
  sql="UPDATE biblio_genero SET"+
  " nome='"+data[0].nome+"'"+
  " WHERE id_genero="+generoId;
 const result = await  mysql.query(sql);
  
  if(result){
    resp={"status":"OK", insertName:data[0].nome}
  }else{
    resp={"status":"Error", "error":result}
  }   
  return resp;
}

del= async (generoId)=>{
  sql="DELETE FROM biblio_genero WHERE id_genero="+generoId;
 const result = await  mysql.query(sql);
  
  if(result){
    resp={"status":"OK"}
  }else{
    resp={"status":"Error", "error":result}
  }   
  return resp;
}

module.exports={get, post, put, del};