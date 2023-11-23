const mysql = require('./mysqlConnect');

getByTurma = async (idTurma) => {
    return await mysql.query(
        'SELECT dia.id_dia, t.nome AS turma, dia.dia, h.turno , h.hora AS horario, d.nome AS dia_disciplina, ps.nome AS professor' +
            ' FROM turma t' +
            ' JOIN disciplina_turma dt ON dt.turma_id_turma=t.id_turma' +
            ' JOIN disciplina d ON d.id_disciplina=dt.disciplina_id_disciplina' +
            ' JOIN professor p ON p.pessoa_id_pessoa=dt.professor_pessoa_id_pessoa' +
            ' JOIN disciplina_turma_dia dtd ON dtd.disciplina_turma_disciplina_id_disciplina=dt.disciplina_id_disciplina' +
            ' LEFT JOIN dia ON dia.id_dia=dtd.horario_id_horario' +
            ' LEFT JOIN horario h ON h.id_horario=dtd.dia_id_dia' +
            ' JOIN pessoa ps ON ps.id_pessoa=p.pessoa_id_pessoa' +
            ' WHERE t.id_turma=' +
            idTurma +
            ' ORDER BY dia.id_dia, turno, horario ASC;'
    );
};

getByProfessor = async (idProfessor) => {
    return await mysql.query(
        'SELECT dia.id_dia, t.nome AS turma, dia.dia, h.turno , h.hora AS horario, d.nome AS dia_disciplina, ps.nome AS professor FROM turma t' +
            ' JOIN disciplina_turma dt ON dt.turma_id_turma=t.id_turma' +
            ' JOIN disciplina d ON d.id_disciplina=dt.disciplina_id_disciplina' +
            ' JOIN professor p ON p.pessoa_id_pessoa=dt.professor_pessoa_id_pessoa' +
            ' JOIN disciplina_turma_dia dtd ON dtd.disciplina_turma_disciplina_id_disciplina=dt.disciplina_id_disciplina' +
            ' LEFT JOIN dia ON dia.id_dia=dtd.horario_id_horario' +
            ' LEFT JOIN horario h ON h.id_horario=dtd.horario_id_horario JOIN pessoa ps ON ps.id_pessoa=p.pessoa_id_pessoa' +
            ' WHERE p.pessoa_id_pessoa=' +
            idProfessor +
            ' ORDER BY dia.id_dia, turno, horario ASC;'
    );
};

getHorarios = async () => {
    return await mysql.query(
        'SELECT DISTINCT DD.dia AS Dia, DD.dia_turno AS Turno, DD.id_dia AS id_dia, H.hora AS Horario, H.id_horario AS id_horario, D.nome AS Disciplina, D.id_disciplina AS id_disciplina, AMB.tipo AS Ambiente, P.nome AS Professor, T.nome AS Turma, T.id_turma AS id_turma, T.tamanho AS Tamanho' +
            ' FROM horario_disciplina_turma AS HDT' +
            ' INNER JOIN disciplina_turma AS DT ON HDT.disciplina_turma_turma_id_turma = DT.turma_id_turma' +
            ' INNER JOIN disciplina_turma AS DT2 ON HDT.disciplina_turma_disciplina_id_disciplina = DT2.disciplina_id_disciplina' +
            ' INNER JOIN disciplina_turma AS DT3 ON HDT.disciplina_turma_professor_pessoa_id_pessoa = DT3.professor_pessoa_id_pessoa' +
            ' INNER JOIN dia AS DD ON HDT.dia_id_dia = DD.id_dia' +
            ' INNER JOIN horario AS H ON HDT.horario_id_horario = H.id_horario' +
            ' INNER JOIN disciplina AS D ON HDT.disciplina_turma_disciplina_id_disciplina = D.id_disciplina' +
            ' INNER JOIN ambiente AS AMB on D.ambiente_idambiente = AMB.idambiente' +
            ' INNER JOIN professor AS PF ON HDT.disciplina_turma_professor_pessoa_id_pessoa = PF.pessoa_id_pessoa' +
            ' INNER JOIN pessoa AS P ON PF.pessoa_id_pessoa = P.id_pessoa' +
            ' INNER JOIN turma AS T on HDT.disciplina_turma_turma_id_turma = T.id_turma' +
            ' ORDER BY DD.dia, T.nome, H.hora;'
    );
};

getHorariosByDay = async (dia, turno) => {
    return await mysql.query(`SELECT DISTINCT DD.dia AS Dia, DD.dia_turno AS Turno, DD.id_dia AS id_dia, H.hora AS Horario, H.id_horario AS id_horario, D.nome AS Disciplina, D.id_disciplina AS id_disciplina, AMB.tipo AS Ambiente, P.nome AS Professor, T.nome AS Turma, T.id_turma AS id_turma, T.tamanho AS Tamanho
        FROM horario_disciplina_turma AS HDT
        INNER JOIN disciplina_turma AS DT ON HDT.disciplina_turma_turma_id_turma = DT.turma_id_turma
        INNER JOIN disciplina_turma AS DT2 ON HDT.disciplina_turma_disciplina_id_disciplina = DT2.disciplina_id_disciplina
        INNER JOIN disciplina_turma AS DT3 ON HDT.disciplina_turma_professor_pessoa_id_pessoa = DT3.professor_pessoa_id_pessoa
        INNER JOIN dia AS DD ON HDT.dia_id_dia = DD.id_dia
        INNER JOIN horario AS H ON HDT.horario_id_horario = H.id_horario
        INNER JOIN disciplina AS D ON HDT.disciplina_turma_disciplina_id_disciplina = D.id_disciplina
        INNER JOIN ambiente AS AMB on D.ambiente_idambiente = AMB.idambiente
        INNER JOIN professor AS PF ON HDT.disciplina_turma_professor_pessoa_id_pessoa = PF.pessoa_id_pessoa
        INNER JOIN pessoa AS P ON PF.pessoa_id_pessoa = P.id_pessoa
        INNER JOIN turma AS T on HDT.disciplina_turma_turma_id_turma = T.id_turma
        WHERE DD.dia = '${dia}' AND DD.dia_turno = '${turno}'
        ORDER BY DD.dia, T.tamanho desc, H.hora;`);
};

module.exports = { getByTurma, getByProfessor, getHorarios, getHorariosByDay };
