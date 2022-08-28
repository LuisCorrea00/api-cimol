const mysql=require("./mysqlConnect");

getByTurma = async (idTurma)=>{
    return await mysql.query("SELECT dia.id_dia, t.nome AS turma, dia.dia, h.turno , h.hora AS horario, d.nome AS dia_disciplina, ps.nome AS professor"
        + " FROM turma t"
        + " JOIN disciplina_turma dt ON dt.turma_id_turma=t.id_turma"
        + " JOIN disciplina d ON d.id_disciplina=dt.disciplina_id_disciplina"
        + " JOIN professor p ON p.pessoa_id_pessoa=dt.professor_pessoa_id_pessoa"
        + " JOIN disciplina_turma_dia dtd ON dtd.disciplina_turma_disciplina_id_disciplina=dt.disciplina_id_disciplina"
        + " LEFT JOIN dia ON dia.id_dia=dtd.horario_id_horario"
        + " LEFT JOIN horario h ON h.id_horario=dtd.dia_id_dia"
        + " JOIN pessoa ps ON ps.id_pessoa=p.pessoa_id_pessoa"
        + " WHERE t.id_turma="+idTurma
        + " ORDER BY dia.id_dia, turno, horario ASC;"
    );
}

getByProfessor=async(idProfessor)=>{
    return await mysql.query("SELECT dia.id_dia, t.nome AS turma, dia.dia, h.turno , h.hora AS horario, d.nome AS dia_disciplina, ps.nome AS professor FROM turma t" 
        + " JOIN disciplina_turma dt ON dt.turma_id_turma=t.id_turma"
        + " JOIN disciplina d ON d.id_disciplina=dt.disciplina_id_disciplina" 
        + " JOIN professor p ON p.pessoa_id_pessoa=dt.professor_pessoa_id_pessoa" 
        + " JOIN disciplina_turma_dia dtd ON dtd.disciplina_turma_disciplina_id_disciplina=dt.disciplina_id_disciplina" 
        + " LEFT JOIN dia ON dia.id_dia=dtd.horario_id_horario" 
        + " LEFT JOIN horario h ON h.id_horario=dtd.horario_id_horario JOIN pessoa ps ON ps.id_pessoa=p.pessoa_id_pessoa"
        + " WHERE p.pessoa_id_pessoa="+idProfessor
        + " ORDER BY dia.id_dia, turno, horario ASC;"
    );
}

module.exports={getByTurma, getByProfessor}