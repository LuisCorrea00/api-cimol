const express=require('express');
const armariosController=require("../controller/armarioController");
const armarioRouter = express.Router();


armarioRouter.get('/:idCurso', async(req, res, next)=>{
    armarioRouter=await armariosController.get(req.headers, req.params.idCurso);
    res.status(200).send(armarios);
  })
  
  armarioRouter.post('/', async(req, res, next)=>{
    armarios=await armariosController.post(req.headers, req.body);
    res.status(200).send(armarios);
  })
  
  armarioRouter.post('/locar', async(req, res, next)=>{
    locacaoArmarios=await armariosController.locar(req.headers, req.body);
    res.status(200).send(locacaoArmarios);
  })

  armarioRouter.get('/', async(req, res, next)=>{
    res.status(200).send({status:"ok"});
  })
  module.exports=armarioRouter;  
