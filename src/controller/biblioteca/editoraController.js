const userModel=require("../../model/userModel");
const editoraModel=require("../../model/biblioteca/editoraModel");

exports.post= async (headers, data)=>{
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=editoraModel.post(data);
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
      resp=await editoraModel.get();
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.put = async (headers, data, editoraId)=>{
  console.log("AQUI 1");
  resp=await editoraModel.put(data, editoraId);
  console.log("AQUI 2")
  return resp;
}

exports.del= async (headers, editoraId)=>{
  resp=await editoraModel.del(editoraId);
  return resp;
}