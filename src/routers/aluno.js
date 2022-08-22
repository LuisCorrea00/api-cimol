const express=require('express');
const alunoController=require("../controller/alunoController");
const alunoRouter = express.Router(); 
alunoRouter.get('/', async(req, res, next)=>{
    aluno=await alunoController.get();
    res.status(200).send(aluno);
  })

module.exports=alunoRouter;