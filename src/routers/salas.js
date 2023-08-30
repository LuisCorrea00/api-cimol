const express = require('express');
const salasController = require('../controller/SalasController');
const salasRouter = express.Router(); 

salasRouter.get('/', async(req,res, next)=>{
    salas =await salasController.getSalas();
    res.status(200).send(salas);
})

salasRouter.post('/grade', async(req,res,next)=>{
    grade = await salasController.postSala();
    res.status(200).send(grade);
})

salasRouter.get('/grade/dia/:dia/:turno', async(req,res,next)=>{
    grade = await salasController.getGradeByDia(
        req.params.dia,
        req.params.turno
    )
    res.status(200).send(grade);
})

module.exports = salasRouter;