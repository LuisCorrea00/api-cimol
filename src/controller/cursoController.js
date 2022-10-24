const userModel=require("../model/userModel");
const cursoModel=require("../model/cursoModel");

exports.post= async (headers, data)=>{
  auth = await userModel.verifyJWT(headers['x-access-token'],headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=cursoModel.post(data);
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
      resp=await cursoModel.get();
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.getCurso= async (headers, id_curso)=>{
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await cursoModel.getCurso(id_curso);
      resp=resp[0];
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.getCursoCoordenador= async (headers, idCoordenador)=>{
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await cursoModel.getCursoCoordenador(idCoordenador);
      resp=resp[0];
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.put= async (headers, data, idCurso)=>{
  auth= await userModel.verifyJWT(headers['x-access-token'],headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=cursoModel.put(data, idCurso);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}