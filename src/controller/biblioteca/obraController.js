const userModel=require("../../model/userModel");
const obraModel=require("../../model/biblioteca/obraModel");

exports.post= async (headers, data)=>{
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=obraModel.post(data);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.get= async (headers)=>{
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await obraModel.get();
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.getPreset= async (headers)=>{
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await obraModel.getPreset();
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.getById = async (headers, obraId)=>{
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await obraModel.getById(obraId);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.put = async (headers, data, obraId)=>{
  resp=await obraModel.put(data, obraId);
  console.log("AQUI 2")
  return resp;
}

exports.getObraRetirada= async (headers)=>{
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
      resp=await obraModel.getObraRetirada();

  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.putStatus = async (headers, data, obraId)=>{
  resp=await obraModel.putStatus(data, obraId);
  return resp;
}

exports.putStatusDisp = async (headers, data, obraId)=>{
  resp=await obraModel.putStatusDisp(data, obraId);
  return resp;
}

exports.del = async (headers, data, obraId)=>{
  auth = await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await obraModel.del(data, obraId);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.getByGenero = async (headers, generoId)=>{
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
      resp=await obraModel.getByGenero(generoId);
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.getBySearch = async (headers, search)=>{
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    resp=await obraModel.getBySearch(search);
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.getEmail= async (headers)=>{
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
      resp=await obraModel.getEmail();

  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}