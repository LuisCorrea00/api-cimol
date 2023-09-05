const salasModel = require('../model/salasModel');
const horarioModel = require('../model/horarioModel');

exports.getSalas = async()=>{
    resp = await salasModel.getSalas();
    return resp;
}

exports.getGrade = async()=>{
    resp = await salasModel.getGrade();
    return resp;
}

exports.getGradeByDia = async(dia,turno)=>{
    resp = await salasModel.getGradeByDia(dia,turno);
    return resp;
}

exports.postSala = async()=>{
    //verificar 
    const horario = await horarioModel.getHorarios();
    const salas = await salasModel.getSalas();
    salas.forEach((salaItem)=> {
        horario.forEach(async (horarioItem) => {
            // console.log(horarioItem.Ambiente);
            if (horarioItem.Ambiente === salaItem.tipo && horarioItem.Tamanho <= salaItem.capacidade) {
                // console.log(horarioItem);
                console.log(horarioItem);
                const data = {
                    'turma': horarioItem.id_turma, 
                    'disc': horarioItem.id_disciplina, 
                    'idsala': salaItem.idsala
                };
                resp = await salasModel.postSala(data);
                return resp;
            }
        });
    });
}