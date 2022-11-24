const express=require('express');
const alunoController=require("../controller/alunoController");
const alunoRouter = express.Router(); 
alunoRouter.get('/', async(req, res, next)=>{
    aluno=await alunoController.get();
    res.status(200).send(aluno);
  })
  alunoRouter.post('/', async(req, res, next)=>{
    resp=await alunoController.post (req.headers, req.body);
    res.status(200).send(resp);
  })

alunoRouter.get('/lista', async(req, res, next)=>{
  if(req.query.idCurso){
    idCurso=req.query.idCurso;
  }else{
    idCurso=null;
  }
  alunos=await alunoController.lista(req.headers, idCurso);
  res.status(200).send(alunos);
})
  
module.exports=alunoRouter;