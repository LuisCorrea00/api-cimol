const userModel=require("../model/userModel");
const armariosModel=require("../model/armarioModel");

//BUSCAR ARMARIOS
exports.get= async (headers,idCurso)=>{
  auth = await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
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

//DADOS DOS ARMARIOS
exports.busca= async (headers, idArmario)=>{
  auth = await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await armariosModel.busca(idArmario);
      console.log(resp);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

//CRIAR ARMARIOS
exports.post = async (headers, body, idCurso)=>{
  console.log(headers['x-access-token'])
  auth = await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
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

//LOCAR ARMARIOS
exports.locar = async ( headers, body, idCurso)=>{
  auth=await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await armariosModel.locar(body, idCurso);
    }else{
      resp={"status":"null", auth}
    }
  }else{
    resp={"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

//DEVOLVER ARMARIOS
exports.devolver = async( headers, body, idArmario)=>{
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp=await armariosModel.devolver( body.id_armario, body.id_aluno);
    }else{
      resp={"status":"null", auth}
    }
  }else{
    resp={"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

