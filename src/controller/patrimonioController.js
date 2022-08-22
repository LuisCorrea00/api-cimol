const userModel=require("../model/userModel");
const patrimonioModel=require("../model/patrimonioModel");

exports.get= async (headers, data, idPatrimonio)=>{
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp = await patrimonioModel.get(idPatrimonio);
    }else{ 
      resp = {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.post= async (headers, body)=>{
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp= patrimonioModel.post(body);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.put= async (headers, data, idPatrimonio, idCurso)=>{
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp= await patrimonioModel.put(data, idPatrimonio, idCurso);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}
