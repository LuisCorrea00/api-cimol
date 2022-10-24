const mysql=require("./mysqlConnect");
get=async()=>{
    return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo FROM curso c");
}

getCurso=async(id_curso)=>{
  return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo, p.nome AS nomeCoordenador " 
  +"FROM curso c "
  +"JOIN coordenacao cc ON cc.curso_id_curso=c.id_curso "
  +"JOIN pessoa p ON p.id_pessoa=cc.professor_pessoa_id_pessoa "
  +"WHERE id_curso="+id_curso);
}

getCursoCoordenador=async(idCoordenador)=>{
  return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo, p.nome AS nomeCoordenador " 
  +"FROM curso c "
  +"JOIN coordenacao cc ON cc.curso_id_curso=c.id_curso "
  +"JOIN pessoa p ON p.id_pessoa=cc.professor_pessoa_id_pessoa "
  +"WHERE cc.professor_pessoa_id_pessoa="+idCoordenador);
}

post= async (data)=>{
  sql="INSERT INTO curso"+
  " (nome, numero)"+
  " VALUE"+
  " ('"+data.nome+"', '"+data.numero+"')";
 const result = await  mysql.query(sql);
  
  if(result){
    resp={"status":"OK", insertId:result.insertId}
  }else{
    resp={"status":"Error", "error":result}
  }   
  return resp;
}

put= async (data, idCurso)=>{
  
  sql="INSERT INTO curso"+
  " ( set";
  if(data.nome){
    sql+=" nome="+data.nome+",";
  }
  if(data.numero){
    sql+=" numero="+data.numero+",";
  }
  if(data.logo){
    sql+=" logo="+data.logo+",";
  }

}

module.exports={get, getCurso, getCursoCoordenador, post}