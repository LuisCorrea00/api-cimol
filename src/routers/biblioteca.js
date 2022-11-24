const express=require('express');
const editoraController=require("../controller/biblioteca/editoraController");
const autorController=require("../controller/biblioteca/autorController");
const generoController=require("../controller/biblioteca/generoController");
const obraController=require("../controller/biblioteca/obraController");
const tipoController=require("../controller/biblioteca/tipoController");
const bibliotecaRouter = express.Router(); 


//-----------------------Bitlioteca-------------------------------------------------------
bibliotecaRouter.get('/', (req, res, next)=>{
    res.status(200).send("<h1>Bom dia</h1>");
  })
  
  bibliotecaRouter.post('/editora', async(req, res, next)=>{
    resp=await editoraController.post (req.headers, req.body);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/editora', async(req, res, next)=>{
    user=await editoraController.get(req.headers);
    res.status(200).send(user);
  })
  
  bibliotecaRouter.put('/editora/:editoraId', async(req, res)=>{
    console.log("Achei 1");
    resp=await editoraController.put (req.headers, req.body, req.params.editoraId );
    res.status(200).send(resp);
    console.log("Achei 2");
  });
 
  
  bibliotecaRouter.post('/autor', async(req, res, next)=>{
    resp=await autorController.post (req.headers, req.body);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/autor', async(req, res, next)=>{
    user=await autorController.get(req.headers);
    res.status(200).send(user);
  })
  
  bibliotecaRouter.put('/autor/:autorId', async(req, res)=>{
    resp=await autorController.put (req.headers, req.body, req.params.autorId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.delete('/autor/:autorId', async(req, res)=>{
    resp=await autorController.del (req.headers, req.params.autorId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.post('/genero', async(req, res, next)=>{
    resp=await generoController.post (req.headers, req.body);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/genero', async(req, res, next)=>{
    user=await generoController.get(req.headers);
    res.status(200).send(user);
  })
  
  bibliotecaRouter.put('/genero/:generoId', async(req, res)=>{
    resp=await generoController.put (req.headers, req.body, req.params.generoId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.delete('/genero/:generoId', async(req, res)=>{
    resp=await generoController.del (req.headers, req.params.generoId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/tipo', async(req, res, next)=>{
    resp=await tipoController.get(req.headers);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.post('/tipo', async(req, res, next)=>{
    resp=await tipoController.post (req.headers, req.body);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.put('/tipo/:tipoId', async(req, res)=>{
    resp=await tipoController.put (req.headers, req.body, req.params.tipoId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.delete('/tipo/:tipoId', async(req, res)=>{
    resp=await tipoController.del (req.headers, req.params.tipoId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/obra', async(req, res, next)=>{
    resp=await obraController.get(req.headers);
    res.status(200).send(resp);
  });
  
  bibliotecaRouter.get('/obra/preset', async(req, res, next)=>{
    resp=await obraController.getPreset(req.headers);
    res.status(200).send(resp);
  });

  bibliotecaRouter.post('/obra', async(req, res, next)=>{
    resp=await obraController.post (req.headers, req.body);
    res.status(200).send(resp);
  });

  bibliotecaRouter.get('/obra/retirada', async(req, res, next)=>{
    resp=await obraController.getObraRetirada(req.headers);
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.get('/obra/:obraId', async(req, res, next)=>{
    resp=await obraController.getById(req.headers, req.params.obraId);
    res.status(200).send(resp);
  });

  bibliotecaRouter.put('/obra/:obraId', async(req, res)=>{
    resp=await obraController.put (req.headers, req.body, req.params.obraId );
    res.status(200).send(resp);
  })
  
  bibliotecaRouter.delete('/obra/:obraId', async(req, res)=>{
    resp=await obraController.del (req.headers, req.body, req.params.obraId );
    res.status(200).send(resp);
  })

  bibliotecaRouter.delete('/editora/:editoraId', async(req, res)=>{
    resp=await editoraController.del (req.headers, req.params.editoraId );
    res.status(200).send(resp);
  })

  bibliotecaRouter.get('/obra/genero/:generoId', async(req, res, next)=>{
    resp=await obraController.getByGenero(req.headers, req.params.generoId);
    res.status(200).send(resp);
  });

  bibliotecaRouter.get('/obras/:search', async(req, res, next)=>{
    resp=await obraController.getBySearch(req.headers, req.params.search);
    res.status(200).send(resp);
  });

  bibliotecaRouter.get('/generos/:obraId', async(req, res, next)=>{
    user=await generoController.getByObraId(req.headers, req.params.obraId);
    res.status(200).send(user);
  })

  bibliotecaRouter.get('/autores/:obraId', async(req, res, next)=>{
    user=await autorController.getByObraId(req.headers, req.params.obraId);
    res.status(200).send(user);
  })

  bibliotecaRouter.put('/statusdisp/:obraId', async(req, res)=>{
    resp=await obraController.putStatusDisp (req.headers, req.body, req.params.obraId );
    res.status(200).send(resp);
  })

  bibliotecaRouter.put('/status/:obraId', async(req, res)=>{
    resp=await obraController.putStatus (req.headers, req.body, req.params.obraId );
    res.status(200).send(resp);
  })

  bibliotecaRouter.get('/email', async(req, res, next)=>{
    user=await obraController.getEmail(req.headers);
    res.status(200).send(user);
  })


module.exports=bibliotecaRouter;