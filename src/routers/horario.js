const express=require('express');
const horarioController=require("../controller/horarioController");
const horarioRouter = express.Router(); 

horarioRouter.get('/turma/:idTurma', async(req, res, next)=>{
    horarioRouter=await horarioController.getByTurma(req.headers,req.params.idTurma);
    res.status(200).send(horario);
  })
  
  horarioRouter.get('/professor/:idProfessor', async(req, res, next)=>{
    horarioRouter=await horarioController.getByProfessor(req.headers,req.params.idProfessor);
    res.status(200).send(horario);
  })

  horarioRouter.get('/', async(req, res, next)=>{
    res.status(200).send({status:"ok"});
  })

module.exports=horarioRouter;