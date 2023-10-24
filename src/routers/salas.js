const express = require('express');
const salasController = require('../controller/salasController');
const salasRouter = express.Router();

salasRouter.get('/', async (req, res, next) => {
    salas = await salasController.getSalas();
    res.status(200).send(salas);
});

salasRouter.get('/grade', async (req, res, next) => {
    console.log(req.query);
    if (req.query.dia && req.query.turno) {
        grade = await salasController.getGradeByDia(
            req.query.dia,
            req.query.turno
        );
    } else grade = await salasController.getGrade();
    res.status(200).send(grade);
});

salasRouter.post('/criar-grade', async (req, res, next) => {
    grade = await salasController.postSala(req.query.dia, req.query.turno);
    res.status(200).send(grade);
});

salasRouter.post('/limpar', async (req, res, next) => {
    limpar = await salasController.setLimpar();
    res.sendStatus(200);
});

module.exports = salasRouter;
