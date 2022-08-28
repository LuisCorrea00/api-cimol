const express=require('express');
const armariosController=require("../controller/armariosController");
const armarioRouter = express.Router();


router.get('/curso/armarios/:idCurso', async(req, res, next)=>{
  
    armarios=await armariosController.get(req.headers, req.params.idCurso);
    res.status(200).send(armarios);
  })
  
  router.post('/curso/armarios', async(req, res, next)=>{
    armarios=await armariosController.post(req.headers, req.body);
    res.status(200).send(armarios);
  })
  
  router.post('/curso/amarios/locar', async(req, res, next)=>{
    locacaoArmarios=await armariosController.locar(req.headers, req.body);
    res.status(200).send(locacaoArmarios);
  })
  
