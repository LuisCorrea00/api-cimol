const mysql=require("./mysqlConnect");
get=async(idCurso)=>{
    sql= "SELECT a.id_armario, a.numero ,a.local, ";
    sql += "(select count(armario_id_armario) FROM armario_aluno WHERE armario_id_armario=a.id_armario AND data_devolucao IS null ) AS locado ,";

    sql+="(SELECT count(armario_id_armario) FROM armario_aluno WHERE armario_id_armario=a.id_armario AND data_previsao_devolucao < '2022-08-11' AND data_devolucao IS null ) as atraso ";

    sql +="from armario a WHERE curso_id_curso="+idCurso;
    return await mysql.query(sql);

}

//'data' refere-se a dados passados
post = async(data, idCurso)=>{
    sql="INSERT INTO armario"+
    "(numero, local, curso_id_curso)"+
    "VALUE"+
    "('"+data.numero+"', '"+data.local+"', "+idCurso+")";
    const result = await mysql.query(sql);

    if(result){
        resp={"status":"OK", insertId:result.insertId}
    }else{
        resp={"status":"Error", "error":result}
    }return resp;
}

post = async(data)=>{
    sql="INSERT INTO armario_aluno"+
    "(aluno_pessoa_id_pessoa, curso_id_curso, data_locacao, data_previsao_devolucao)"+
    "VALUE"+
    "('"+data.aluno+"', '"+data.curso+"', '"+data.locacao+"', '"+data.previsaoDevolucao+"')";
    const result = await mysql.query(sql);

    if(result){
        resp={"status":"Locação realizada!", insertId:result.insertId}
    }else{
        resp={"status":"Não é possível realizar a locação!"}
    }return resp;
}

module.exports={get,post,put}