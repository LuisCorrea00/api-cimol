const userModel=require("../model/userModel");
const alunoModel=require("../model/alunoModel");

exports.get= async ()=>{
    return {"controller":"aluno"};
}

exports.post= async (headers, data)=>{
    auth = await userModel.verifyJWT(headers['x-access-token'],headers['perfil']);
    if(auth.idUser){
      if(headers.iduser==auth.idUser){
        resp=alunoModel.post(data);
      }else{ 
        resp= {"status":"null", auth}
      }
    }else{
      resp= {"status":"null", auth}
    }
    return resp;
  }

exports.lista= async (headers, idcurso)=>{
    console.log(headers);
    console.log(idCurso);
    auth = await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
    if(auth.idUser){
        if(headers.iduser==auth.idUser){
            resp=await alunoModel.get(idCurso);
        }else{
            resp = {"status":"null", auth}
        }
    }else{
        resp = {"status":"null", auth}
    }
    return resp;
}
