const userModel=require("../../model/userModel");
const generoModel=require("../../model/biblioteca/generoModel");

exports.post= async (headers, data)=>{
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=generoModel.post(data);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.get= async (headers)=>{
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await generoModel.get();
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.getByObraId = async (headers, obraId)=>{
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await generoModel.getByObraId(obraId);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.put= async (headers, data, generoId)=>{
  resp=await generoModel.put(data, generoId);
  return resp;
}

exports.del= async (headers, generoId)=>{
  resp=await generoModel.del(generoId);
  return resp;
}