const express=require('express');
const editoraController=require("../controller/biblioteca/editoraController");
const autorController=require("../controller/biblioteca/autorController");
const generoController=require("../controller/biblioteca/generoController");
const obraController=require("../controller/biblioteca/obraController");
const tipoController=require("../controller/biblioteca/tipoController");
const bibliotecaRouter = express.Router(); 


//-----------------------Bitlioteca-------------------------------------------------------
bibliotecaRouter.get('/biblioteca', (req, res, next)=>{
    res.status(200).send("<h1>Bom dia</h1>");
  })
  
  bibliotecaRouter.post('/biblioteca/editora', async(req, res, next)=>{
    resp=await editoraController.post (req.headers, req.body);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/biblioteca/editora', async(req, res, next)=>{
    user=await editoraController.get(req.headers);
    res.status(200).send(user);
  })
  
  bibliotecaRouter.put('/biblioteca/editora/:editoraId', async(req, res)=>{
    console.log("Achei 1");
    resp=await editoraController.put (req.headers, req.body, req.params.editoraId );
    res.status(200).send(resp);
    console.log("Achei 2");
  });
  
  // bibliotecaRouter.put('/biblioteca/obra/:obraId', async(req, res)=>{
  //   resp=await obraController.put (req.headers, req.body, req.params.obraId );
  //   res.status(200).send(resp);
  // })
  
  bibliotecaRouter.post('/biblioteca/autor', async(req, res, next)=>{
    resp=await autorController.post (req.headers, req.body);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/biblioteca/autor', async(req, res, next)=>{
    user=await autorController.get(req.headers);
    res.status(200).send(user);
  })
  
  bibliotecaRouter.put('/biblioteca/autor/:autorId', async(req, res)=>{
    resp=await autorController.put (req.headers, req.body, req.params.autorId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.delete('/biblioteca/autor/:autorId', async(req, res)=>{
    resp=await autorController.del (req.headers, req.params.autorId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.post('/biblioteca/genero', async(req, res, next)=>{
    resp=await generoController.post (req.headers, req.body);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/biblioteca/genero', async(req, res, next)=>{
    user=await generoController.get(req.headers);
    res.status(200).send(user);
  })
  
  bibliotecaRouter.put('/biblioteca/genero/:generoId', async(req, res)=>{
    resp=await generoController.put (req.headers, req.body, req.params.generoId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.delete('/biblioteca/genero/:generoId', async(req, res)=>{
    resp=await generoController.del (req.headers, req.params.generoId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/biblioteca/tipo', async(req, res, next)=>{
    resp=await tipoController.get(req.headers);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.post('/biblioteca/tipo', async(req, res, next)=>{
    resp=await tipoController.post (req.headers, req.body);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.put('/biblioteca/tipo/:tipoId', async(req, res)=>{
    resp=await tipoController.put (req.headers, req.body, req.params.tipoId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.delete('/biblioteca/tipo/:tipoId', async(req, res)=>{
    resp=await tipoController.del (req.headers, req.params.tipoId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/biblioteca/obra', async(req, res, next)=>{
    resp=await obraController.get(req.headers);
    res.status(200).send(resp);
  });
  
  bibliotecaRouter.post('/biblioteca/obra', async(req, res, next)=>{
    resp=await obraController.post (req.headers, req.body);
    res.status(200).send(resp);
  });
  
  bibliotecaRouter.put('/biblioteca/obra/:obraId', async(req, res)=>{
    resp=await obraController.put (req.headers, req.body, req.params.obraId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.delete('/biblioteca/obra/:obraId', async(req, res)=>{
    resp=await obraController.del (req.headers, req.body, req.params.obraId );
    res.status(200).send(resp);
  })


module.exports=bibliotecaRouter;