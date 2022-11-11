exports.get= async ()=>{
    return {"controller":"aluno"};
}

exports.lista= async (headers, idAluno)=>{
    auth = await userModel.verifyJWT(headers['x-access-token'], headers['id_aluno']);
    if(auth.idAluno){
        if(headers.idAluno==auth.idAluno){
            resp=await alunoModel.lista(idAluno);
        }else{
            resp = {"status":"null", auth}
        }
    }else{
        resp = {"status":"null", auth}
    }
    return resp;
}
