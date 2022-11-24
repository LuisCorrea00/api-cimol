const mysql=require("../mysqlConnect");
get=async()=>{
    //return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo FROM curso c");
    return await mysql.query("SELECT id_genero, nome, CASE 1 WHEN 1 THEN FALSE END AS apagar FROM biblio_genero WHERE id_genero IN(SELECT biblio_genero_id_genero FROM biblio_obra_genero) UNION SELECT id_genero, nome, CASE 1 WHEN 1 THEN TRUE END AS apagar FROM biblio_genero WHERE id_genero NOT IN(SELECT biblio_genero_id_genero FROM biblio_obra_genero) ORDER BY id_genero");
}

getByObraId = async(obraId) => {
  return await mysql.query("SELECT biblio_genero.nome FROM biblio_genero JOIN biblio_obra_genero ON biblio_obra_genero.biblio_genero_id_genero = biblio_genero.id_genero WHERE biblio_obra_genero.biblio_obra_id_obra = " + obraId);
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
  " nome='"+data.nome+"'"+
  " WHERE id_genero="+generoId;
 const result = await  mysql.query(sql);
  
  if(result){
    resp={"status":"OK", insertName:data.nome}
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

module.exports={get, post, put, del, getByObraId};