const salasModel = require('../model/salasModel');
const horarioModel = require('../model/horarioModel');

exports.getSalas = async()=>{
    resp = await salasModel.getSalas();
    return resp;
}

exports.getGradeByDia = async(dia,turno)=>{
    resp = await salasModel.getGradeByDia(dia,turno);
    return resp;
}

exports.postSala = async()=>{
    const horario = await horarioModel.getHorarios();
    const salas = await salasModel.getSalas();
    salas.forEach((salaItem)=> {
        horario.forEach(async (horarioItem) => {
            if (horarioItem.Ambiente === salaItem.tipo && horarioItem.Tamanho <= salaItem.capacidade) {
                const data = {
                    'turma': horarioItem.Turma, 
                    'disc': horarioItem.Disciplina, 
                    'idsala': salaItem.idsala
                };
                resp = await salasModel.postSala(data);
                return resp;
            }
        });
    });
}