const mysql=require("../mysqlConnect");
get=async()=>{
    //return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo FROM curso c");
    return await mysql.query("SELECT id_autor, nome, CASE 1 WHEN 1 THEN FALSE END AS apagar FROM biblio_autor WHERE id_autor IN(SELECT biblio_autor_id_autor FROM biblio_obra_autor) UNION SELECT id_autor, nome, CASE 1 WHEN 1 THEN TRUE END AS apagar FROM biblio_autor WHERE id_autor NOT IN(SELECT biblio_autor_id_autor FROM biblio_obra_autor) ORDER BY id_autor");
}

getByObraId = async(obraId) => {
  return await mysql.query("SELECT biblio_autor.nome FROM biblio_autor JOIN biblio_obra_autor ON biblio_obra_autor.biblio_autor_id_autor = biblio_autor.id_autor WHERE biblio_obra_autor.biblio_obra_id_obra = " + obraId);
}

post= async (data)=>{
  sql="INSERT INTO biblio_autor"+
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

put= async (data, id)=>{
  sql="UPDATE biblio_autor"+
  " SET nome='"+data.nome+"'"+
  " WHERE id_autor="+id;
 const result = await  mysql.query(sql);
  
  if(result){
    resp={"status":"OK", insertName:data.nome}
  }else{
    resp={"status":"Error", "error":result}
  }   
  return resp;
}

del= async (id)=>{
  sql="DELETE FROM biblio_autor"+
  " WHERE id_autor="+id;
 const result = await  mysql.query(sql);
  
  if(result){
    resp={"status":"OK"}
  }else{
    resp={"status":"Error", "error":result}
  }   
  return resp;
}

module.exports={get, post, put, del, getByObraId};