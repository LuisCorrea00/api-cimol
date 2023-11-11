const salasModel = require('../model/salasModel');
const horarioModel = require('../model/horarioModel');

exports.getSalas = async () => {
    return await salasModel.getSalas();
};

exports.getGrade = async (dia, turno) => {
    return await salasModel.getGrade(dia, turno);
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

exports.updateSala = async (body) => {
    const horario = await horarioModel.getHorariosByDay(body.dia, body.turno);
    const salas = await salasModel.getSalas();
    const grade = await salasModel.getGrade(body.dia, body.turno);

    const dia_id = horario[0].id_dia;
    const predio = body.sala.slice(0, 1);
    const salaNome = body.sala.slice(2, 6);
    let sala_id = null;
    let disc_id = null;
    let turma_id = null;
    let periodos = [];
    let turmaOcupante = null;

    salas.forEach((salaItem) => {
        if (salaItem.predio == predio && salaItem.nome == salaNome) {
            sala_id = salaItem.idsala;
        }
    });

    horario.forEach((horarioItem) => {
        if (
            horarioItem.Disciplina == body.disc &&
            horarioItem.Turma == body.turma
        ) {
            disc_id = horarioItem.id_disciplina;
            turma_id = horarioItem.id_turma;
            periodos.push(horarioItem.Horario);
        }
    });

    const numPeriodos = periodos.length;

    grade.forEach((gradeItem) => {
        if (gradeItem.Predio == predio && gradeItem.Sala == salaNome) {
            turmaOcupante = gradeItem.Turma;
            for (i = 0; i < periodos.length; i++) {
                if (gradeItem.Horario == periodos[i]) {
                    periodos.shift();
                }
            }
        }
    });

    if (periodos.length != numPeriodos) {
        return `Sala ocupada por ${turmaOcupante}!`;
    }

    const data = {
        turma: turma_id,
        disc: disc_id,
        idsala: sala_id,
        dia: dia_id,
    };
    await salasModel.updateSala(data);
    return 'OK';
};

exports.setLimpar = async (body) => {
    if (body.dia) {
        const horario = await horarioModel.getHorariosByDay(
            body.dia,
            body.turno
        );

        const dia_id = horario[0].id_dia;
        let disc_id = null;
        let turma_id = null;

        horario.forEach((horarioItem) => {
            if (
                horarioItem.Disciplina == body.disc &&
                horarioItem.Turma == body.turma
            ) {
                disc_id = horarioItem.id_disciplina;
                turma_id = horarioItem.id_turma;
            }
        });

        const data = {
            turma: turma_id,
            disc: disc_id,
            dia: dia_id,
        };

        await salasModel.setLimpar(data);
        return;
    }

    await salasModel.setLimpar();
    return;
};
