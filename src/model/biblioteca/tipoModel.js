const mysql=require("../mysqlConnect");

get = async() => {
    console.log("Moda 1");
    return await mysql.query("SELECT * FROM biblio_tipo");
}

// post = async (data) => {
//     sql = "INSERT INTO biblio_obra" +
//         " (img, titulo, isbn, sinopse, n_paginas, n_edicao, tipo_id_tipo, genero_id_genero, pessoa_id_pessoa, biblio_editora_id_editora)" +
//         " VALUE" +
//         " ('" + data.img + "', '" + data.titulo + "', '" + data.isbn + "', '" + data.sinopse + "', '" + data.n_paginas + "', '" + data.n_edicao + "', '" + data.tipo_id_tipo + "', '" + data.genero_id_genero + "', '" + data.pessoa_id_pessoa + "', '" + data.biblio_editora_id_editora + "')";
//     const result = await mysql.query(sql);
//     if (result) {
//         resp = { "status": "OK", insertId: result.insertId, insertName: data.nome }
//     } else {
//         resp = { "status": "Error", "error": result }
//     }
//     return resp;
// }

post = async (data) => {
    sql = "INSERT INTO biblio_tipo" +
        " (nome)" +
        " VALUE" +
        " ('" + data.nome + "')";
    const result = await mysql.query(sql);
    if (result) {
        resp = { "status": "OK", insertId: result.insertId, insertName: data.nome }
    } else {
        resp = { "status": "Error", "error": result }
    }
    return resp;
}

put = async (data, id) => {
    sql = "UPDATE biblio_tipo SET" +
        " nome='" + data[0].nome + "'" +
        " WHERE id_tipo=" + id;
    const result = await mysql.query(sql);
    if (result) {
        resp = { "status": "OK", insertName: data[0].nome }
    } else {
        resp = { "status": "Error", "error": result }
    }
    return resp;
}

del = async (id) => {
    sql = "DELETE FROM biblio_tipo WHERE id_tipo=" + id;
    const result = await mysql.query(sql);
    if (result) {
        resp = { "status": "OK" }
    } else {
        resp = { "status": "Error", "error": result }
    }
    return resp;
}

module.exports={get, post, put, del};