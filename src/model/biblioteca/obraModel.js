const mysql=require("../mysqlConnect");
// get=async()=>{
//     //return await mysql.query("SELECT c.id_curso, c.nome, c.numero, c.logo FROM curso c");
//     return await mysql.query("SELECT c.id_editora, c.nome FROM biblio_editora c");
// }

    get = async() => {
        return await mysql.query("SELECT * FROM biblio_obra");
    }

    getById = async(obraId) => {
        return await mysql.query("SELECT * FROM biblio_obra WHERE id_obra=" + obraId);
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
        sql = "INSERT INTO biblio_obra" +
            " (img, titulo, isbn, sinopse, n_paginas, n_edicao, tipo_id_tipo, genero_id_genero, pessoa_id_pessoa, biblio_editora_id_editora)" +
            " VALUE" +
            " ('" + data.img + "', '" + data.titulo + "', '" + data.isbn + "', '" + data.sinopse + "', '" + data.n_paginas + "', '" + data.n_edicao + "', '" + data.tipo_id_tipo + "', '" + data.genero_id_genero + "', '" + data.pessoa_id_pessoa + "', '" + data.biblio_editora_id_editora + "')";
        const result = await mysql.query(sql);
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
        sql = "UPDATE biblio_obra" +
            " SET img='" + data[0].img + "', titulo='" + data[0].titulo + "', isbn='" + data[0].isbn + "', sinopse='" + data[0].sinopse + "', n_paginas='" + data[0].n_paginas + "', n_edicao='" + data[0].n_edicao + "', tipo_id_tipo='" + data[0].tipo_id_tipo + "', genero_id_genero='" + data[0].genero_id_genero + "', pessoa_id_pessoa='" + data[0].pessoa_id_pessoa + "', biblio_editora_id_editora='" + data[0].biblio_editora_id_editora + "'" +
            " WHERE id_obra=" + obraId;
        const result = await mysql.query(sql);
        if (result) {
            resp = { "status": "OK" }
        } else {
            resp = { "status": "Error", "error": result }
        }
        return resp;
    }

    del = async (data, obraId) => {
        sql = "DELETE FROM biblio_obra WHERE id_obra=" + obraId;
        const result = await mysql.query(sql);
        if (result) {
            resp = { "status": "OK" }
        } else {
            resp = { "status": "Error", "error": result }
        }
        return resp;
    }

module.exports={get, post ,put, del};