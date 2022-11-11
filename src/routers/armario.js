const express=require('express');
const armariosController=require("../controller/armarioController");
const armarioRouter = express.Router();


armarioRouter.get('/:idCurso', async(req, res, next)=>{
    armarios=await armariosController.get(req.headers, req.params.idCurso);
    res.status(200).send(armarios);
  })
  
  armarioRouter.get('/busca/:idArmario', async(req, res, next)=>{
    armarios=await armariosController.busca(req.headers, req.params.idArmario);
    res.status(200).send(armarios);
  })

armarioRouter.post('/:idCurso', async(req, res, next)=>{
    resposta=await armariosController.post(req.headers, req.body, req.params.idCurso);
    res.status(200).send(resposta);
  })
  
  armarioRouter.post('/locar/:idCurso', async (req, res, next)=> {
      locacaoArmarios = await armariosController.locar(req.headers, req.body, req.params.idCurso);
      res.status(200).send(locacaoArmarios);
  })

  armarioRouter.post('/devolver/:idArmario', async(req, res, next)=>{
    devolucaoArmarios=await armariosController.devolver(req.headers, req.body, req.params.idArmario);
    res.status(200).send(devolucaoArmarios);
  })

  armarioRouter.get('/', async(req, res, next)=>{
    res.status(200).send({status:"ok"});
  })

  module.exports=armarioRouter;  
