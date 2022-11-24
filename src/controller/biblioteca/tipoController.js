const userModel=require("../../model/userModel");
const tipoModel=require("../../model/biblioteca/tipoModel");

exports.post= async (headers, data)=>{
    auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
    if(auth.idUser){
      if(headers.iduser==auth.idUser){
        resp=tipoModel.post(data);
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
        resp=await tipoModel.get();
      }else{ 
        resp= {"status":"null", auth}
      }
    }else{
      resp= {"status":"null", auth}
    }
    console.log(resp);
    return resp;
  }

exports.put= async (headers, data, id)=>{
    resp=await tipoModel.put(data, id);
    return resp;
  }

exports.del= async (headers, id)=>{
    resp=await tipoModel.del(id);
    return resp;
}