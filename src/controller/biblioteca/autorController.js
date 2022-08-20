const userModel=require("../../model/userModel");
const autorModel=require("../../model/biblioteca/autorModel");

exports.post= async (headers, data)=>{
  auth=userModel.verifyJWT(headers['x-access-token']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=autorModel.post(data);
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
      resp=await autorModel.get();
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
	resp=await autorModel.put(data, id);
	return resp;
}

exports.del= async (headers, id)=>{
	resp=await autorModel.del(id);
	return resp;
}