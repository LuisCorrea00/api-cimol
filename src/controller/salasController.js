const salasModel = require('../model/salasModel');
const horarioModel = require('../model/horarioModel');

exports.getSalas = async () => {
    resp = await salasModel.getSalas();
    return resp;
};

exports.getGrade = async () => {
    resp = await salasModel.getGrade();
    return resp;
};

exports.getGradeByDia = async (dia, turno) => {
    resp = await salasModel.getGradeByDia(dia, turno);
    return resp;
};

exports.postSala = async (dia, turno) => {
    const horario = await horarioModel.getHorariosByDay(dia, turno);
    const salas = await salasModel.getSalas();
    let salaOcupada = new Set();
    let horarioAnterior = null;
    let salaAnterior = null;

    for (const horarioItem of horario) {
        for (const salaItem of salas) {
            if (
                horarioItem.Ambiente === salaItem.tipo &&
                horarioItem.Tamanho <= salaItem.capacidade
            ) {
                if (
                    horarioAnterior &&
                    salaAnterior &&
                    horarioAnterior.id_turma === horarioItem.id_turma &&
                    salaAnterior.idsala === salaItem.idsala
                ) {
                    const data = {
                        turma: horarioItem.id_turma,
                        disc: horarioItem.id_disciplina,
                        idsala: salaItem.idsala,
                        periodo: horarioItem.id_horario,
                    };
                    await salasModel.postSala(data);
                    break;
                } else if (!salaOcupada.has(salaItem.idsala)) {
                    const data = {
                        turma: horarioItem.id_turma,
                        disc: horarioItem.id_disciplina,
                        idsala: salaItem.idsala,
                        periodo: horarioItem.id_horario,
                    };
                    await salasModel.postSala(data);
                    salaAnterior = salaItem;
                    salaOcupada.add(salaItem.idsala);
                    break;
                }
            }
        }
        horarioAnterior = horarioItem;
    }
};

exports.setLimpar = async () => {
    await salasModel.setLimpar();
    return;
};
