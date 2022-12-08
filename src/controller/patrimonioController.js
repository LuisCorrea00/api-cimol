const userModel=require("../model/userModel");
const patrimonioModel=require("../model/patrimonioModel");

exports.get= async (headers)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp = await patrimonioModel.get();
    }else{ 
      resp = {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}
exports.getCurso= async (headers, idCurso)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp = await patrimonioModel.getCurso(idCurso);
    }else{ 
      resp = {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}
exports.getPatrimonios= async (headers, codBarra)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp = await patrimonioModel.getPatrimonios(codBarra);
    }else{ 
      resp = {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}
exports.getCategoria = async (headers, idPatrimonio)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp = await patrimonioModel.getCategoria(idPatrimonio);
    }else{ 
      resp = {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.getMovimentos= async (headers, idPatrimonio)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp = await patrimonioModel.getMovimentos(idPatrimonio);
    }else{ 
      resp = {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  console.log(resp);
  return resp;
}

exports.post= async (headers, body)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp= patrimonioModel.post(body);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.postMovimento= async (headers, body)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp= patrimonioModel.postMovimento(body);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.postTipoMovimento= async (headers, body)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp= patrimonioModel.postTipoMovimento(body);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.patch= async (headers, data, idPatrimonio)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp= await patrimonioModel.patch(data, idPatrimonio);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}
exports.patchMov= async (headers, data, idPatrimonio)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp= await patrimonioModel.patchMov(data, idPatrimonio);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}

exports.putTipoMovimento= async (headers, data, idTipoMovimento)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp= await patrimonioModel.putTipoMovimento(data, idTipoMovimento);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}
exports.remove= async (headers, idPatrimonio)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp= patrimonioModel.remove(idPatrimonio);
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}


exports.getSituacao= async (headers)=>{
  if(headers['perfil']!="coordenador"){
    return {status:"null",msg:"Operação não permitida", auth}
  }
  auth= await userModel.verifyJWT(headers['x-access-token'], headers['perfil']);
  if(auth.idUser){
    if(headers.iduser==auth.idUser){
      resp= patrimonioModel.getSituacao();
    }else{ 
      resp= {"status":"null", auth}
    }
  }else{
    resp= {"status":"null", auth}
  }
  return resp;
}