const express=require('express');
const patrimonioController=require("../controller/patrimonioController");
const patrimonioRouter = express.Router(); 

patrimonioRouter.get('/curso/patrimonio/:idCurso', async(req, res, next)=>{
    patrimonio=await patrimonioController.get(req.headers, req.body, req.params.idCurso);
    res.status(200).send(patrimonio);
  })
  
patrimonioRouter.post('/curso/patrimonio', async(req, res, next)=>{
    patrimonio=await patrimonioController.post(req.headers, req.body);
    res.status(200).send(patrimonio);
  })
  
patrimonioRouter.put('/curso/patrimonio/:idCurso/:idPatrimonio', async(req, res, next)=>{
    resp=await patrimonioController.put (req.headers, req.body, req.params.idCurso, req.params.idPatrimonio);
    res.status(200).send(resp);
  })

module.exports=patrimonioRouter;