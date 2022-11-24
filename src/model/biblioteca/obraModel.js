const mysql = require("../mysqlConnect");
// get=async()=>{
//     //return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo FROM curso c");
//     return await mysql.query("SELECT c.id_editora, c.nome FROM biblio_editora c");
// }

get = async () => {
    return await mysql.query("SELECT o.id_obra, o.titulo, o.img, o.situacao, o.relevancia, a.nome AS autor FROM biblio_obra AS o LEFT JOIN biblio_obra_autor AS oa ON o.id_obra=oa.biblio_obra_id_obra LEFT JOIN biblio_autor AS a ON a.id_autor = oa.biblio_autor_id_autor WHERE o.situacao LIKE 'disponivel' GROUP BY (o.id_obra) ORDER BY o.relevancia DESC LIMIT 20");
}

getById = async (obraId) => {
    return await mysql.query("SELECT o.id_obra, o.titulo, o.img, o.isbn, o.sinopse, o.n_paginas, o.n_edicao, o.situacao, t.nome AS tipo, e.nome AS editora FROM biblio_obra AS o JOIN biblio_tipo AS t ON o.tipo_id_tipo = t.id_tipo JOIN biblio_editora AS e ON o.editora_id_editora = e.id_editora WHERE o.id_obra = " + obraId);
}

getPreset = async () => {
    return await mysql.query("SELECT o.id_obra, o.titulo, o.img, o.situacao, a.nome AS autor FROM biblio_obra AS o LEFT JOIN biblio_obra_genero AS og ON o.id_obra = og.biblio_obra_id_obra LEFT JOIN biblio_genero AS g ON g.id_genero = og.biblio_genero_id_genero LEFT JOIN biblio_obra_autor AS oa ON o.id_obra = oa.biblio_obra_id_obra LEFT JOIN biblio_autor AS a ON a.id_autor = oa.biblio_autor_id_autor WHERE g.id_genero = (SELECT id_genero FROM biblio_genero LIMIT 1) GROUP BY (o.id_obra)");
}

getByGenero = async (generoId) => {
    return await mysql.query("SELECT o.id_obra, o.titulo, o.img, o.situacao, a.nome AS autor FROM biblio_obra AS o LEFT JOIN biblio_obra_genero AS og ON o.id_obra = og.biblio_obra_id_obra LEFT JOIN biblio_genero AS g ON g.id_genero = og.biblio_genero_id_genero LEFT JOIN biblio_obra_autor AS oa ON o.id_obra = oa.biblio_obra_id_obra LEFT JOIN biblio_autor AS a ON a.id_autor = oa.biblio_autor_id_autor WHERE g.id_genero =" + generoId + " GROUP BY (o.id_obra)");
}

getBySearch = async (search) => {
    return await mysql.query(`SELECT o.id_obra, o.titulo, o.img, o.situacao, o.relevancia, a.nome AS autor FROM biblio_obra AS o LEFT JOIN biblio_obra_genero AS og ON o.id_obra = og.biblio_obra_id_obra LEFT JOIN biblio_genero AS g ON og.biblio_genero_id_genero = g.id_genero LEFT JOIN biblio_obra_autor AS oa ON o.id_obra = oa.biblio_obra_id_obra LEFT JOIN biblio_autor AS a ON oa.biblio_autor_id_autor = a.id_autor LEFT JOIN biblio_tipo AS t ON o.tipo_id_tipo = t.id_tipo LEFT JOIN biblio_editora AS e ON o.editora_id_editora = e.id_editora WHERE o.titulo LIKE "%${search}%" OR g.nome LIKE "%${search}%" OR a.nome LIKE "%${search}%" GROUP BY(o.id_obra)`);
}

getObraRetirada = async() => {
    return await mysql.query("SELECT o.titulo, o.id_obra, o.data_devolucao, p.nome, p.id_pessoa, t.nome AS turma, c.nome AS curso FROM biblio_obra o LEFT JOIN pessoa p ON p.id_pessoa = o.pessoa_id_pessoa LEFT JOIN turma_aluno ta ON o.pessoa_id_pessoa = ta.aluno_pessoa_id_pessoa LEFT JOIN turma t ON t.id_turma = ta.turma_id_turma LEFT JOIN aluno_curso ac ON ac.aluno_pessoa_id_pessoa = o.pessoa_id_pessoa LEFT JOIN curso c ON ac.curso_id_curso = c.id_curso WHERE o.situacao = 'indisponivel' GROUP BY(o.id_obra)");
}
// INSERT INTO `biblio_obra` (`id_obra`, `img`, `titulo`, `isbn`, `sinopse`,
//  `n_paginas`, `n_edicao`, `tipo_id_tipo`, `genero_id_genero`, `pessoa_id_pessoa`,
//   `biblio_editora_id_editora`) VALUES (NULL, 
//     'https://images-na.ssl-images-amazon.com/images/I/81ibfYk4qmL.jpg', 'Bom dia', 
//     '1234567890123', 'longo texto', '10', '1', '1', '1', '2', '8');

// post= async (data)=>{
//     sql="INSERT INTO biblio_editora"+
//     " (nome)"+
//     " VALUE"+
//     " ('"+data.nome+"')";
//    const result = await  mysql.query(sql);

//     if(result){
//       resp={"status":"OK", insertId:result.insertId, insertName:data.nome}
//     }else{
//       resp={"status":"Error", "error":result}
//     }   
//     return resp;
//   }

post = async (data) => {
    sql = `INSERT INTO biblio_obra(titulo, img, isbn, sinopse, n_paginas, n_edicao, tipo_id_tipo, editora_id_editora, pessoa_id_pessoa, situacao, relevancia) VALUES ("${data.titulo}", "${data.img}", "${data.isbn}", "${data.sinopse}", ${data.n_paginas}, ${data.n_edicao}, (SELECT id_tipo FROM biblio_tipo WHERE nome = "${data.tipo}"), (SELECT id_editora FROM biblio_editora WHERE nome = "${data.editora}" LIMIT 1), (SELECT pessoa_id_pessoa FROM usuario WHERE perfil LIKE "%biblioteca%" LIMIT 1), "disponivel", 0)`;

    const result = await mysql.query(sql);

    const generoArray = data.genero;
    console.log(generoArray);

    for (i = 0; i < generoArray.length; i++) {
        sql2 = `INSERT INTO biblio_obra_genero(biblio_obra_id_obra, biblio_genero_id_genero) VALUES ((SELECT biblio_obra.id_obra FROM biblio_obra WHERE biblio_obra.isbn = "${data.isbn}" LIMIT 1), (SELECT biblio_genero.id_genero FROM biblio_genero WHERE biblio_genero.nome = "${data.genero[i]}" LIMIT 1))`;
        const result = await mysql.query(sql2);
    }

    const autorArray = data.autor;
    console.log(autorArray);


    for (i = 0; i < autorArray.length; i++) {
        sql4 = `INSERT INTO biblio_obra_autor(biblio_obra_id_obra, biblio_autor_id_autor) VALUES ((SELECT biblio_obra.id_obra FROM biblio_obra WHERE biblio_obra.isbn = "${data.isbn}" LIMIT 1), (SELECT biblio_autor.id_autor FROM biblio_autor WHERE biblio_autor.nome = "${data.autor[i]}" LIMIT 1))`;
        const result = await mysql.query(sql4);
    }

    if (result) {
        resp = { "status": "OK", insertId: result.insertId, insertName: data.nome }
    } else {
        resp = { "status": "Error", "error": result }
    }
    return resp;
}

// put = async (data, obraId) => {
//     sql = "UPDATE biblio_obra" +
//         " SET img='" + data.img + "', titulo='" + data.titulo + "', isbn='" + data.isbn + "', sinopse='" + data.sinopse + "', n_paginas='" + data.n_paginas + "', n_edicao='" + data.n_edicao + "', tipo_id_tipo='" + data.tipo_id_tipo + "', genero_id_genero='" + data.genero_id_genero + "', pessoa_id_pessoa='" + data.pessoa_id_pessoa + "', biblio_editora_id_editora='" + data.biblio_editora_id_editora + "'" +
//         " WHERE id_obra=7";
//     const result = await mysql.query(sql);
//     if (result) {
//         resp = { "status": "OK", insertId: result.insertId, insertName: data.nome }
//     } else {
//         resp = { "status": "Error", "error": result }
//     }
//     return resp;
// }

put = async (data, obraId) => {
    sql = `UPDATE biblio_obra SET titulo = "${data.titulo}", img = "${data.img}", isbn = "${data.isbn}", sinopse = "${data.sinopse}", n_paginas = ${data.n_paginas}, n_edicao = ${data.n_edicao}, tipo_id_tipo = (SELECT biblio_tipo.id_tipo FROM biblio_tipo WHERE biblio_tipo.nome = "${data.tipo}"), editora_id_editora = (SELECT biblio_editora.id_editora FROM biblio_editora WHERE biblio_editora.nome = "${data.editora}") WHERE biblio_obra.id_obra = ${obraId}`;
    const result = await mysql.query(sql);

    const autorArray = data.autor;
    console.log(autorArray);

    sql13 = `DELETE FROM biblio_obra_autor WHERE biblio_obra_id_obra = ${obraId}`;
    const result2 = await mysql.query(sql13);

    for(i = 0; i < autorArray.length; i++){
        sql15 = `INSERT INTO biblio_obra_autor (biblio_obra_id_obra, biblio_autor_id_autor) VALUES (${obraId}, (SELECT biblio_autor.id_autor FROM biblio_autor WHERE biblio_autor.nome = "${data.autor[i]}"))`;
        const result = await mysql.query(sql15);
    }

    
    const generoArray = data.genero;
    console.log(generoArray);

    sql3 = `DELETE FROM biblio_obra_genero WHERE biblio_obra_id_obra = ${obraId}`;
    const result1 = await mysql.query(sql3);

    for(i = 0; i < generoArray.length; i++){
        // sql3 = `UPDATE biblio_obra_genero SET biblio_genero_id_genero = (SELECT biblio_genero.id_genero FROM biblio_genero WHERE biblio_genero.nome = "${data.genero[i]}") WHERE biblio_obra_id_obra = ${obraId}`;

        sql4 = `INSERT INTO biblio_obra_genero (biblio_obra_id_obra, biblio_genero_id_genero) VALUES (${obraId}, (SELECT biblio_genero.id_genero FROM biblio_genero WHERE biblio_genero.nome = "${data.genero[i]}"))`;
        const result2 = await mysql.query(sql4);
    }

    if (result) {
        resp = { "status": "OK" }
    } else {
        resp = { "status": "Error", "error": result }
    }
    return resp;
}

putStatus = async (data, obraId) => {
    sql = `UPDATE biblio_obra SET data_retirada = "${data.data_retirada}", data_devolucao = "${data.data_devolucao}", pessoa_id_pessoa = (SELECT pessoa.id_pessoa FROM pessoa WHERE pessoa.email = "${data.email}"), situacao = "indisponivel", relevancia = relevancia+1 WHERE biblio_obra.id_obra = ${obraId}`;
    console.log(sql);
    const result = await mysql.query(sql);

    if (result) {
        resp = { "status": "OK" }
    } else {
        resp = { "status": "Error", "error": result }
    }
    return resp;
}

putStatusDisp = async (data, obraId) => {
    sql = `UPDATE biblio_obra SET data_retirada = NULL, data_devolucao = NULL, pessoa_id_pessoa = (SELECT pessoa_id_pessoa FROM usuario WHERE perfil LIKE "%biblioteca%" LIMIT 1), situacao = "disponivel" WHERE biblio_obra.id_obra = ${obraId}`;
    console.log(sql);
    const result = await mysql.query(sql);

    if (result) {
        resp = { "status": "OK" }
    } else {
        resp = { "status": "Error", "error": result }
    }
    return resp;
}

getEmail = async() => {
    return await mysql.query("SELECT pessoa.email FROM pessoa");
}

del = async (data, obraId) => {
    sql3 = `DELETE FROM biblio_obra_autor WHERE biblio_obra_id_obra = ${obraId}`;
    const result3 = await mysql.query(sql3);

    sql2 = `DELETE FROM biblio_obra_genero WHERE biblio_obra_id_obra = ${obraId}`;
    const result2 = await mysql.query(sql2);

    sql = "DELETE FROM biblio_obra WHERE id_obra=" + obraId;
    const result = await mysql.query(sql);
    
    if (result) {
        resp = { "status": "OK" }
    } else {
        resp = { "status": "Error", "error": result }
    }
    return resp;
}

module.exports = { get, getById, post, put,  putStatus,putStatusDisp, del, getByGenero, getBySearch, getPreset, getEmail, getObraRetirada };