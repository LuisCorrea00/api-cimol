const mysql=require("../mysqlConnect");
// get=async()=>{
//     //return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo FROM curso c");
//     return await mysql.query("SELECT c.id_editora, c.nome FROM biblio_editora c");
// }

get = async() => {
  return await mysql.query("SELECT id_editora, nome, CASE 1 WHEN 1 THEN FALSE END AS apagar FROM biblio_editora WHERE id_editora IN(SELECT editora_id_editora FROM biblio_obra) UNION SELECT id_editora, nome, CASE 1 WHEN 1 THEN TRUE END AS apagar FROM biblio_editora WHERE id_editora NOT IN(SELECT editora_id_editora FROM biblio_obra) ORDER BY id_editora");
}

post= async (data)=>{
  sql="INSERT INTO biblio_editora"+
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

// put = async (data, editoraId)=>{
//   sql="UPDATE biblio_editora"+
//   " SET nome='"+data[0].nome+"'"+
//   " WHERE id_editora="+editoraId;
//   const result = await  mysql.query(sql);
//   if(result){
//     resp={"status":"OK", insertId:result.insertId, insertName:data.nome}
//   }else{
//     resp={"status":"Error", "error":result}
//   }   
//   return resp;
// }

put = async (data, editoraId)=>{
  console.log(data);
  console.log(editoraId);

  sql = "UPDATE biblio_editora"+ " SET nome='"+data.nome+"'"+ " WHERE id_editora="+editoraId;
  const result = await  mysql.query(sql);
  if(result){
    resp={"status":"OK", insertId:result.insertId, insertName:data.nome}
  }
  else{
    resp={"status":"Error", "error":result}
  }
  return resp;
}

del= async (editoraId)=>{
  sql="DELETE FROM biblio_editora WHERE id_editora="+editoraId;
 const result = await  mysql.query(sql);
  
  if(result){
    resp={"status":"OK"}
  }else{
    resp={"status":"Error", "error":result}
  }   
  return resp;
}

module.exports={get, post ,put, del}