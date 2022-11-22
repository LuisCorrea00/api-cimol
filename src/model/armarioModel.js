const mysql=require("./mysqlConnect");
const moment = require('moment'); 

get=async(idCurso)=>{
    sql= "SELECT a.id_armario, a.numero ,a.local, ";
    sql += "(SELECT COUNT(armario_id_armario) FROM armario_aluno WHERE armario_id_armario=a.id_armario AND data_devolucao IS null ) AS locado ,";

    sql+="(SELECT COUNT(armario_id_armario) FROM armario_aluno WHERE armario_id_armario=a.id_armario AND data_previsao_devolucao < NOW() AND data_devolucao IS null ) AS atraso ";

    sql +="FROM armario a WHERE curso_id_curso="+idCurso;
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
    sql += "(SELECT COUNT(armario_id_armario) FROM armario_aluno WHERE armario_id_armario=a.id_armario AND data_devolucao IS null) AS locado, ";
    sql += "(SELECT COUNT(armario_id_armario) FROM armario_aluno WHERE armario_id_armario=a.id_armario AND data_previsao_devolucao < '2022-08-11' AND data_devolucao IS null ) as atraso ";

    sql +="from armario a WHERE id_armario="+id_armario;
    
    let armario= await mysql.query(sql);
    if(armario[0].locado===0){
        armario[0].txLocado="Disponível";
    }else if(armario[0].locado>0){
        sql = "SELECT distinct p.id_pessoa AS id_aluno, p.nome  FROM pessoa p ";
        sql += "JOIN aluno a ON a.pessoa_id_pessoa = p.id_pessoa ";
        sql +="JOIN armario_aluno aa ON a.pessoa_id_pessoa = aa.aluno_pessoa_id_pessoa ";
        sql +="WHERE aa.armario_id_armario = ";
        sql += armario[0].id_armario;
        let aluno=await mysql.query(sql); 
        armario[0].aluno=aluno[0];
        armario[0].txLocado="Ocupado";
        if(armario[0].atraso>0){
            armario[0].txLocado="Ocupado e atrasado";
        }

        sql="SELECT data_locacao, data_devolucao, data_previsao_devolucao FROM armario_aluno WHERE armario_id_armario="+armario[0].id_armario;
        let dadosLocacao = await mysql.query(sql);
        console.log(dadosLocacao);
        if(dadosLocacao.length>0){
            armario[0].dataLocacao=moment(dadosLocacao[0].data_locacao).format('DD/MM/YYYY');
            armario[0].dataPrevDevolucao=moment(dadosLocacao[0].data_previsao_devolucao).format('DD/MM/YYYY');
        }
    }
    return armario;
}

//CRIAR ARMÁRIOS 
//'data' refere-se a dados passados
post = async(data, idCurso)=>{
    sql="INSERT INTO armario "+
    "(numero, local, curso_id_curso) "+
    "VALUE "+
    "('"+data.numero+"', '"+data.local+"', "+idCurso+") ";
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
    "('"+data.id_armario+"', '"+data.id_aluno+"',  NOW(), '"+data.data_previsao_devolucao+"')";
    const result = await mysql.query(sql);

    if(result){
        resp={"status":"Locação realizada!", insertId:result.insertId}
    }else{
        resp={"status":"Não é possível realizar a locação!"}
    }return resp;
}

    //DEVOLUÇÃO ARMÁRIOS
devolver = async(idArmario, idAluno)=>{
    sql= "UPDATE armario_aluno "+ 
    "SET data_devolucao = NOW() "+
    "WHERE armario_id_armario = " +idArmario+ " AND aluno_pessoa_id_pessoa = " +idAluno;

    console.log(sql)
    const result = await mysql.query(sql);

    if(result){
        resp={"status":"Devolução realizada!", updateId:result.updateId}
    }else{
        resp={"status":"Não é possível realizar a devolução!"}
    }return resp;

}

module.exports={get,post,put,locar,devolver,busca};