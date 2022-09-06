const userModel=require("../model/userModel");
const armariosModel=require("../model/armarioModel");

exports.get= async (headers,idCurso)=>{
  auth=userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await armariosModel.get(idCurso);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.post = async (headers, body, idCurso)=>{
  auth=userModel.verifyJWT(headers['x-acess-token']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await armariosModel.post(body, idCurso);
    }else{
      resp={"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.locar = async (_body, headers, idCurso)=>{
  auth=serModel.verifyJWT(headers['x-acess-token']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await armariosModel.locar(idCurso);
    }else{
      resp={"status":"null", auth}
    }
  }else{
    resp={"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

/*exports.devolver=async(body, _headers, idCurso)=>{
  auth=serModel.verifyJWT(body['x-acess-token']);
  if(auth.idUser){
    if(body.iduser==auth.idUser){
      resp=await armariosModel.devolver(idCurso);;
    }else{
      resp={"status":"null", auth}
    }
  }else{
    resp={"status":"null", auth}
  }
  console.log(resp);
  return resp;
}*/

