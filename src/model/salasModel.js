const mysql = require('./mysqlConnect');

getSalas = async () => {
    return await mysql.query(
        'SELECT sala.idsala, sala.predio, sala.nome, sala.capacidade, ambiente.tipo FROM sala' +
            ' INNER JOIN ambiente on sala.ambiente_idambiente = ambiente.idambiente order by idsala;'
    );
};

getGrade = async () => {
    return await mysql.query(`select distinct S.predio AS Predio, S.nome AS Sala, DD.dia AS Dia, DD.dia_turno AS turno, H.hora AS Horario, D.nome AS Disciplina, T.nome AS Turma from horario_disciplina_turma AS HDT
    INNER JOIN 
	    disciplina_turma AS DT ON HDT.disciplina_turma_turma_id_turma = DT.turma_id_turma
    INNER JOIN 
	    disciplina_turma AS DT2 ON HDT.disciplina_turma_disciplina_id_disciplina = DT2.disciplina_id_disciplina
    INNER JOIN 
        dia AS DD ON HDT.dia_id_dia = DD.id_dia
    INNER JOIN
        sala AS S ON HDT.sala_idsala = S.idsala
    INNER JOIN 
        horario AS H ON HDT.horario_id_horario = H.id_horario
    INNER JOIN 
        disciplina AS D ON HDT.disciplina_turma_disciplina_id_disciplina = D.id_disciplina
    INNER JOIN 
        turma AS T on HDT.disciplina_turma_turma_id_turma = T.id_turma
    ORDER BY DD.dia, T.nome, H.hora;`);
};

getGradeByDia = async (dia, turno) => {
    return await mysql.query(`select distinct S.predio AS Predio, S.nome AS Sala, DD.dia AS Dia, DD.dia_turno AS turno, H.hora AS Horario, D.nome AS Disciplina, T.nome AS Turma from horario_disciplina_turma AS HDT
    INNER JOIN 
	    disciplina_turma AS DT ON HDT.disciplina_turma_turma_id_turma = DT.turma_id_turma
    INNER JOIN 
	    disciplina_turma AS DT2 ON HDT.disciplina_turma_disciplina_id_disciplina = DT2.disciplina_id_disciplina
    INNER JOIN 
        dia AS DD ON HDT.dia_id_dia = DD.id_dia
    INNER JOIN
        sala AS S ON HDT.sala_idsala = S.idsala
    INNER JOIN 
        horario AS H ON HDT.horario_id_horario = H.id_horario
    INNER JOIN 
        disciplina AS D ON HDT.disciplina_turma_disciplina_id_disciplina = D.id_disciplina
    INNER JOIN 
        turma AS T on HDT.disciplina_turma_turma_id_turma = T.id_turma
    WHERE 
        DD.dia = '${dia}' AND DD.dia_turno = '${turno}'
    ORDER BY DD.dia, T.nome, H.hora;`);
};

postSala = async (data) => {
    sql = `UPDATE horario_disciplina_turma SET sala_idsala = ${data.idsala} WHERE disciplina_turma_turma_id_turma = ${data.turma} AND disciplina_turma_disciplina_id_disciplina = ${data.disc} AND horario_id_horario = ${data.periodo};`;
    const res = await mysql.query(sql);
    return res;
};

setLimpar = async () => {
    return await mysql.query(
        'update horario_disciplina_turma set sala_idsala = null;'
    );
};

module.exports = { getSalas, getGrade, getGradeByDia, postSala, setLimpar };
