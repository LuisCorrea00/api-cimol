const express=require('express');
const curriculoController=require("../controller/curriculoController");
const curriculoRouter = express.Router(); 

curriculoRouter.get('/', async(req, res, next)=>{
  res.status(200).send({status:"ok"});
})

curriculoRouter.get('/:idAluno', async(req, res, next)=>{
    curriculo=await curriculoController.get(req.headers,  req.params.idAluno);
    res.status(200).send(curriculo);
  })

curriculoRouter.put('/:idAluno/:idcurriculo', async(req, res, next)=>{
    resp=await curriculoController.put (req.headers, req.body, req.params.idAluno,req.params.idcurriculo );
    res.status(200).send(resp);
  })
  
curriculoRouter.post('/', async(req, res, next)=>{
    resp=await curriculoController.post(req.headers, req.body);
    res.status(200).send(resp);
  })

  curriculoRouter.get('/', async(req, res, next)=>{
    res.status(200).send({status:"OK"});
  })

module.exports=curriculoRouter;