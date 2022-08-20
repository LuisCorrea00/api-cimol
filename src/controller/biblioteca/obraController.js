const userModel=require("../../model/userModel");
const obraModel=require("../../model/biblioteca/obraModel");

exports.post= async (headers, data)=>{
  auth=userModel.verifyJWT(headers['x-access-token']);
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
  auth=userModel.verifyJWT(headers['x-access-token']);
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

exports.getById = async (headers, obraId)=>{
  auth=userModel.verifyJWT(headers['x-access-token']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await obraModel.getById(obraId);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

// exports.put = async (headers, data, obraId)=>{
//   auth=userModel.verifyJWT(headers['x-access-token']);
//   if(auth.idUser){
//     if(headers.iduser==auth.idUser){
//       resp=await obraModel.put(data, obraId);
//       console.log("AQUI 2")
//     }else{ 
//       resp= {"status":"null", auth}
//     }
//   }else{
//     resp= {"status":"null", auth}
    
//   }
//   return resp;
// }

exports.put = async (headers, data, obraId)=>{
  resp=await obraModel.put(data, obraId);
  console.log("AQUI 2")
  return resp;
}

exports.del = async (headers, data, obraId)=>{
  auth=userModel.verifyJWT(headers['x-access-token']);
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