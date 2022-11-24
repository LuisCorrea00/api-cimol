const mysql=require("./mysqlConnect");


get=async(idCurso)=>{
  let sql= "SELECT p.id_pessoa AS id_aluno, p.nome, p.email, a.matricula FROM aluno a JOIN pessoa p ON p.id_pessoa=a.pessoa_id_pessoa"
  if(idCurso){
   sql+=" JOIN aluno_curso ac ON ac.aluno_pessoa_id_pessoa= a.pessoa_id_pessoa "
   +"WHERE ac.curso_id_curso="+idCurso;
  }
  alunos=await mysql.query(sql);
  return alunos;
}

post= async (data)=>{
  sql="INSERT INTO pessoa"+
  " (nome, email)"+
  " VALUE"+
  " ('"+data.nome+"', '"+data.email+"')";
 let resPessoa = await  mysql.query(sql);
  
  if(resPessoa){
    sql="INSERT INTO aluno"+
    " (pessoa_id_pessoa, matricula)"+
    " VALUE"+
    " ('"+resPessoa.insertId+"', '"+data.matricula+"')";
    let resAluno = await  mysql.query(sql);
    if(resAluno){
      resp={"status":"OK", 'id_pessoa':resPessoa.insertId, 'id_aluno':resAluno.insertId}
    }else{
       resp={"status":"Error", "error":resAluno}
    }
    
  }else{
    resp={"status":"Error", "error":resPessoa}
  }   
  return resp;
}

module.exports={get,post}
