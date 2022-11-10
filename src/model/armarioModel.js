const mysql=require("./mysqlConnect");
get=async(idCurso)=>{
    sql= "SELECT a.id_armario, a.numero ,a.local, ";
    sql += "(select count(armario_id_armario) FROM armario_aluno WHERE armario_id_armario=a.id_armario AND data_devolucao IS null ) AS locado ,";

    sql+="(SELECT count(armario_id_armario) FROM armario_aluno WHERE armario_id_armario=a.id_armario AND data_previsao_devolucao < '2022-08-11' AND data_devolucao IS null ) as atraso ";

    sql +="from armario a WHERE curso_id_curso="+idCurso;
    let armarios = await mysql.query(sql);
    for(i=0; i<armarios.length; i++){
        armarios [i].cor="green";

        if(armarios[i].locado>0){
            armarios[i].cor="blue";
            if(armarios[i].atraso>0){
                armarios[i].cor="red";
            }
        }
    }
    return armarios;
}

busca =async(id_armario)=>{
    sql = "SELECT a.id_armario, a.numero, a.local,";
    sql += "(select count(armario_id_armario) FROM armario_aluno WHERE armario_id_armario=a.id_armario AND data_devolucao IS null) AS locado, ";
    sql += "(SELECT count(armario_id_armario) FROM armario_aluno WHERE armario_id_armario=a.id_armario AND data_previsao_devolucao < '2022-08-11' AND data_devolucao IS null ) as atraso ";

    sql +="from armario a WHERE id_armario="+id_armario;
    
    return await mysql.query(sql);
}


//CRIAR ARMÁRIOS 
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

//LOCAR ARTMÁRIOS
locar = async(data, idCurso)=>{
    sql="INSERT INTO armario_aluno"+
    "(armario_id_armario, aluno_pessoa_id_pessoa,  data_locacao, data_previsao_devolucao)"+
    "VALUE"+
    "('"+data.id_armario+"', '"+data.id_aluno+"',  '"+data.data_locacao+"', '"+data.data_previsao_devolucao+"')";
    const result = await mysql.query(sql);

    if(result){
        resp={"status":"Locação realizada!", insertId:result.insertId}
    }else{
        resp={"status":"Não é possível realizar a locação!"}
    }return resp;
}

//DEVOLUÇÃO ARMÁRIOS
devolver = async(data, idCurso)=>{
    sql= "UPDATE armario_aluno"+ 
    "SET id_armario = armario_id_armario"+
    "SET dataDevolucao = data_devolucao"+
    "WHERE ('"+data.id_aluno+"', '"+data.data_devolucao+"')";
    const result = await mysql.query(sql);

    if(result){
        resp={"status":"Devolução realizada!", updateId:result.updateId}
    }else{
        resp={"status":"Não é possível realizar a devolução!"}
    }return resp;

}

module.exports={get,post,put, locar, devolver, busca}