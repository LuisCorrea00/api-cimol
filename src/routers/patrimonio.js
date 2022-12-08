const express=require('express');
const patrimonioController=require("../controller/patrimonioController");
const patrimonioRouter = express.Router(); 
patrimonioRouter.get('/lista', async(req, res, next)=>{
  patrimonio=await patrimonioController.get(req.headers);
  res.status(200).send(patrimonio);
})
patrimonioRouter.get('/lista/:idCurso', async(req, res)=>{
    patrimonio=await patrimonioController.getCurso(req.headers, req.params.idCurso);
    res.status(200).send({patrimonio});
  })
patrimonioRouter.get('/buscar/:codBarra', async(req, res)=>{
    patrimonio=await patrimonioController.getPatrimonios(req.headers, req.params.codBarra);
    res.status(200).send({patrimonio});
  })
patrimonioRouter.get(`/categoria`, async(req, res)=> {
    patrimonio=await patrimonioController.getCategoria(req.headers);
    res.status(200).send({patrimonio});
})
  patrimonioRouter.get('/tipoMov', async(req, res)=>{
    patrimonio=await patrimonioController.getSituacao(req.headers);
    res.status(200).send({patrimonio});
  })
  patrimonioRouter.get('/movimentacao', async(req, res)=>{
    patrimonio=await patrimonioController.getMovimentos(req.headers);
    res.status(200).send({patrimonio});
  })
  
patrimonioRouter.post('/criarPatrimonio', async(req, res, next)=>{
    patrimonio=await patrimonioController.post(req.headers, req.body);
    res.status(200).send(patrimonio);
  })
  
patrimonioRouter.post('/movimentacao/:idPatrimonio', async(req, res, next)=>{
    patrimonio=await patrimonioController.postMovimento(req.headers, req.body, req.params.idPatrimonio);
    res.status(200).send(patrimonio);
  })

  patrimonioRouter.post('/movimentacao/criarTipo', async(req, res, next)=>{
    patrimonio=await patrimonioController.postTipoMovimento(req.headers, req.body);
    res.status(200).send(patrimonio);
  })

patrimonioRouter.patch('/alterar/:idPatrimonio', async(req, res, next)=>{
    resp=await patrimonioController.patch (req.headers, req.body, req.params.idPatrimonio);
    res.status(200).send(resp);
  })
patrimonioRouter.patch('/alterar/:idMovimento', async(req, res, next)=>{
    resp=await patrimonioController.patchMov(req.headers, req.body, req.params.idMovimento);
    res.status(200).send(resp);
  })
  patrimonioRouter.put('/movimentacao/alterarTipo/:idTipoMovimento', async(req, res, next)=>{
    resp=await patrimonioController.putTipoMovimento(req.headers, req.body, req.params.idTipoMovimento);
    res.status(200).send(resp);
  })
  
  patrimonioRouter.delete('/remover/:idPatrimonio', async(req, res, next)=>{
    resp=await patrimonioController.remove(req.headers, req.params.idPatrimonio);
    res.status(200).send(resp);
  })


patrimonioRouter.get('/', async(req, res, next)=>{
    res.status(200).send({status:"ok"});
  })

module.exports=patrimonioRouter;