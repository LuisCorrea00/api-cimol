const mysql=require("./mysqlConnect");
get=async(idCurso)=>{
    return await mysql.query("SELECT numero, local FROM armario WHERE curso_id_curso="+idCurso);
}



module.exports={get}