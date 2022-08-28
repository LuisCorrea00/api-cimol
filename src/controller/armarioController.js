const userModel=require("../model/userModel");
const armariosModel=require("../model/armariosModel");



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