const mysql = require("./mysqlConnect");
get = async () => {
  return await mysql.query("SELECT * FROM patrimonio_item;");
};

getCurso = async (idCurso) => {
  return await mysql.query(`SELECT pi.* FROM patrimonio_item pi 
    left join patrimonio_item_curso pic on pi.id_patrimonio_item = pic.patrimonio_item_id_patrimonio_item
    where pic.curso_id_curso = ${idCurso};`);
};
getPatrimonios = async (codBarra) => {
  sql= `SELECT * from patrimonio_item WHERE codigo_barra = '${codBarra}';`
  console.log(sql);
  return await mysql.query(sql);
};
getSituacao = async () => {
  return await mysql.query("SELECT nome FROM patrimonio_tipo_movimento;");
};
getMovimentos = async () => {
  return await mysql.query(`SELECT pm.*, ptm.nome from cimol.patrimonio_movimento pm 
  left join patrimonio_tipo_movimento ptm 
  on pm.patrimonio_tipo_movimento_id_patrimonio_tipo_movimento = ptm.id_patrimonio_tipo_movimento;`);
};
getCategoria = async () => {
  return await mysql.query(`SELECT nome_categoria FROM cimol.patrimonio_categoria;`);
}
post = async (data) => {
  sql = `INSERT INTO patrimonio_item
     (descricao, numero_serie, numero_patrimonio, local, item_nota_fiscal, imagem, codigo_barra) 
     VALUES ('
    ${data.descricao}', ' 
    ${data.numero_serie}', '
    ${data.numero_patrimonio}', '
    ${data.local}', ' 
    ${data.item_nota_fiscal}', ' 
    ${data.imagem}', '${data.codigo_barra}');`;
  const result = await mysql.query(sql);

  if (result) {
    resp = { status: "OK", insertId: result.insertId };
  } else {
    resp = { status: "Error", error: result };
  }
  return resp;
};

postMovimento = async (data) => {
  sql =
    `INSERT INTO patrimonio_movimento
    (data, descricao, patrimonio_tipo_movimento_id_patrimonio_tipo_movimento, patrimonio_item_id_patrimonio_item, categoria)
    VALUES
    (${data.date}, 
    '${data.desc}',
    '${data.id_patrimonio_tipo_movimento}',
    ${data.id_patrimonio_item},
    '${data.id_categoria}');`;
  const result = await mysql.query(sql);

  if (result) {
    resp = { status: "OK", insertId: result.insertId };
  } else {
    resp = { status: "Error", error: result };
  }
  return resp;
};

postTipoMovimento = async (data) => {
  sql =
    "INSERT INTO patrimonio_tipo_movimento" +
    " (nome)" +
    " VALUE" +
    " ('" +
    JSON.stringify(data.nome) +
    "');";
  const result = await mysql.query(sql);

  if (result) {
    resp = { status: "OK", insertId: result.insertId };
  } else {
    resp = { status: "Error", error: result };
  }
  return resp;
};

patch = async (data, idPatrimonio) => {
  sql = `UPDATE patrimonio_item SET 
  numero_serie= '${data.numero_serie}', 
  descricao= '${data.descricao}', 
  numero_patrimonio= '${data.numero_patrimonio}', 
  local= '${data.local}', 
  item_nota_fiscal= '${data.item_nota_fiscal}', 
  imagem= '${data.imagem}' 
  WHERE id_patrimonio_item= ${idPatrimonio};`;
  console.log(sql)
  const result = await mysql.query(sql);
  if (result) {
    resp = { status: "OK", insertId: result.insertId };
  } else {
    resp = { status: "Error", error: result };
  }
  return resp;
};
patchMov = async (data, idMovimento) => {
  sql = `UPDATE patrimonio_movimento SET 
  data= '${data.data}', 
  descricao= '${data.descricao}', 
  numero_patrimonio= '${data.numero_patrimonio}', 
  patrimonio_tipo_id_patrimonio_tipo_movimento= '${data.local}', 
  item_nota_fiscal= '${data.item_nota_fiscal}', 
  id_patrimonio_item = '${data.patrimonio_item_id_patrimonio_item}' 
  WHERE id_patrimonio_movimento= ${idMovimento};`;
  console.log(sql)
  const result = await mysql.query(sql);
  if (result) {
    resp = { status: "OK", insertId: result.insertId };
  } else {
    resp = { status: "Error", error: result };
  }
  return resp;
};

patchTipoMovimento = async (data, idTipoMovimento) => {
  sql = "UPDATE patrimonio_tipo_movimento" + " SET";
  if (data.nome) {
    sql += " nome =" + JSON.stringify(data.nome);
  }
  sql += " WHERE id_patrimonio_tipo_movimento = " + idTipoMovimento + ";";
  const result = await mysql.query(sql);
  if (result) {
    resp = { status: "OK", insertId: result.insertId };
  } else {
    resp = { status: "Error", error: result };
  }
  return resp;
};
remove = async (idPatrimonio) => {
  sql =
    "DELETE FROM patrimonio_item" +
    " WHERE id_patrimonio_item = " +
    idPatrimonio +
    ";";
  const result = await mysql.query(sql);
  if (result) {
    resp = { status: "OK", insertId: result.insertId };
  } else {
    resp = { status: "Error", error: result };
  }
  return resp;
};
removeMov = async (idMovimento) => {
  sql =
    `DELETE FROM patrimonio_movimento where id_patrimonio_movimento = ${idMovimento};`
  const result = await mysql.query(sql);
  if (result) {
    resp = { status: "OK", insertId: result.insertId };
  } else {
    resp = { status: "Error", error: result };
  }
  return resp;
};
module.exports = {
  get,
  getCurso,
  getMovimentos,
  patchMov,
  patch,
  post,
  postMovimento,
  postTipoMovimento,
  patchTipoMovimento,
  remove,
  getSituacao,
  getPatrimonios,
  getCategoria,
};