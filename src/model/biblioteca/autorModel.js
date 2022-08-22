const mysql=require("../mysqlConnect");
get=async()=>{
    //return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo FROM curso c");
    return await mysql.query("SELECT id_autor, nome FROM biblio_autor");
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
  " SET nome='"+data[0].nome+"'"+
  " WHERE id_autor="+id;
 const result = await  mysql.query(sql);
  
  if(result){
    resp={"status":"OK", insertName:data[0].nome}
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

module.exports={get, post, put, del};