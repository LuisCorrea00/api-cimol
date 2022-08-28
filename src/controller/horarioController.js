const horarioModel=require("../model/horarioModel");
const userModel=require("../model/userModel");

exports.getByTurma = async (headers,idTurma)=>{
    auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
    if(auth.idUser){
      
      if(headers.iduser==auth.idUser){
        resp=await horarioModel.getByTurma(idTurma)
        
      }else{ 
        console.log(1)
        resp= {"status":"null", auth}
      }
    }else{
        console.log(2)
      resp= {"status":"null", auth}
    }
    console.log(resp);
    return resp;
}

exports.getByProfessor = async(headers, idProfessor)=>{
    auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
    if(auth.idUser){
    
      if(headers.iduser==auth.idUser){
        resp=await horarioModel.getByProfessor(idProfessor)
        
      }else{ 
        resp= {"status":"null", auth}
      }
    }else{
      resp= {"status":"null", auth}
    }
    console.log(resp);
    return resp;
}