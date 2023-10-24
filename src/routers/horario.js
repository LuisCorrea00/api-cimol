const express = require('express');
const horarioController = require('../controller/horarioController');
const horarioRouter = express.Router();

horarioRouter.get('/turma/:idTurma', async (req, res, next) => {
    const horario = await horarioController.getByTurma(
        req.headers,
        req.params.idTurma
    );
    res.status(200).send(horario);
});

horarioRouter.get('/professor/:idProfessor', async (req, res, next) => {
    const horario = await horarioController.getByProfessor(
        req.headers,
        req.params.idProfessor
    );
    res.status(200).send(horario);
});

horarioRouter.get('/', async (req, res, next) => {
    if (req.query.dia && req.query.turno) {
        grade = await horarioController.getHorariosByDay(
            req.query.dia,
            req.query.turno
        );
    } else grade = await horarioController.getHorarios();
    res.status(200).send(grade);
});

module.exports = horarioRouter;
