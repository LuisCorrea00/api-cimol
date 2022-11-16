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

module.exports={get}
