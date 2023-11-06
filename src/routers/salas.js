const express = require('express');
const salasController = require('../controller/salasController');
const salasRouter = express.Router();

salasRouter.get('/', async (req, res, next) => {
    salas = await salasController.getSalas();
    res.status(200).send(salas);
});

salasRouter.get('/grade', async (req, res, next) => {
    grade = await salasController.getGrade(req.query.dia, req.query.turno);
    res.status(200).send(grade);
});

salasRouter.post('/criar-grade', async (req, res, next) => {
    await salasController.postSala(req.query.dia, req.query.turno);
    res.sendStatus(200);
});

salasRouter.post('/update', async (req, res, next) => {
    msg = await salasController.updateSala(req.body);
    res.status(200).send(msg);
});

salasRouter.post('/limpar', async (req, res, next) => {
    await salasController.setLimpar(req.body);
    res.sendStatus(200);
});

module.exports = salasRouter;
