const mysql=require("./mysqlConnect");
get=async()=>{
    return await mysql.query("SELECT * FROM patrimonio_item");
  }

post= async (data)=>{
  sql="INSERT INTO patrimonio_item"+
  " (descricao, numero_serie, numero_patrimonio, local, item_nota_fiscal, imagem)"+
  " VALUE"+
  " ('"+JSON.stringify(data.descricao)+"', '"+JSON.stringify(data.numero_serie)
  +"', '"+JSON.stringify(data.numero_patrimonio)
  +"', '"+JSON.stringify(data.local)
  +"', '"+JSON.stringify(data.item_nota_fiscal)
  +"', '"+JSON.stringify(data.imagem)+"');";
 const result = await mysql.query(sql);
  
  if(result){
    resp={"status":"OK", insertId:result.insertId}
  }else{
    resp={"status":"Error", "error":result}
  }   
  return resp;
}

put= async (data)=>{
  sql="UPDATE patrimonio_item"+
  " SET";
  if(data.numero_serie){
    sql+=" numero_serie="+JSON.stringify(data.numero_serie)+",";
  }
  if(data.descricao){
    sql+=" descricao="+JSON.stringify(data.descricao)+",";
  }
  if(data.numero_patrimonio){
    sql+=" numero_patrimonio="+JSON.stringify(data.numero_patrimonio)+",";
  }
  if(data.local){
    sql+=" local="+JSON.stringify(data.local)+",";
  }
  if(data.item_nota_fiscal){
    sql+=" item_nota_fiscal="+JSON.stringify(data.item_nota_fiscal)+",";
  }
  if(data.imagem){
    sql+=" imagem="+JSON.stringify(data.item_nota_fiscal)+"";
  }
  sql+=" WHERE id_patrimonio_item="+"4"+";";
  const result = await  mysql.query(sql);
  if(result){
    resp={"status":"OK", insertId:result.insertId}
  }else{
    resp={"status":"Error", "error":result}
  }   
  return resp;

}

module.exports={get, put, post}