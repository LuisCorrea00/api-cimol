const express=require('express');
const userController=require("../controller/userController");
const cursoController=require("../controller/cursoController");
const editoraController=require("../controller/biblioteca/editoraController");
const autorController=require("../controller/biblioteca/autorController");
const generoController=require("../controller/biblioteca/generoController");
const obraController=require("../controller/biblioteca/obraController");
const tipoController=require("../controller/biblioteca/tipoController");

const router = express.Router();

router.get('/', (req, res, next)=>{
  res.status(200).send("<h1>API CIMOL</h1>");
})
 
router.get('/user', async(req, res, next)=>{
  user=await userController.get(req.headers);
  res.status(200).send(user);
})

router.post('/user/login', async(req, res, next)=>{
  user=await userController.login(req.body);
  res.status(200).send(user);
})

router.get('/curso', async(req, res, next)=>{
  curso=await cursoController.get(req.headers);
  res.status(200).send(curso);
})

router.post('/curso', async(req, res, next)=>{
  resp=await cursoController.post (req.headers, req.body);
  res.status(200).send(resp);
})

router.put('/curso/:idCurso', async(req, res, next)=>{
  resp=await cursoController.put (req.headers, req.body, req.params.idCurso );
  res.status(200).send(resp);
})

//-----------------------Bitlioteca-------------------------------------------------------
router.get('/biblioteca', (req, res, next)=>{
  res.status(200).send("<h1>Bom dia</h1>");
})

router.post('/biblioteca/editora', async(req, res, next)=>{
  resp=await editoraController.post (req.headers, req.body);
  res.status(200).send(resp);
})

router.get('/biblioteca/editora', async(req, res, next)=>{
  user=await editoraController.get(req.headers);
  res.status(200).send(user);
})

router.put('/biblioteca/editora/:editoraId', async(req, res)=>{
  console.log("Achei 1");
  resp=await editoraController.put (req.headers, req.body, req.params.editoraId );
  res.status(200).send(resp);
  console.log("Achei 2");
});

// router.put('/biblioteca/obra/:obraId', async(req, res)=>{
//   resp=await obraController.put (req.headers, req.body, req.params.obraId );
//   res.status(200).send(resp);
// })

router.post('/biblioteca/autor', async(req, res, next)=>{
  resp=await autorController.post (req.headers, req.body);
  res.status(200).send(resp);
})

router.get('/biblioteca/autor', async(req, res, next)=>{
  user=await autorController.get(req.headers);
  res.status(200).send(user);
})

router.put('/biblioteca/autor/:autorId', async(req, res)=>{
  resp=await autorController.put (req.headers, req.body, req.params.autorId );
  res.status(200).send(resp);
})

router.delete('/biblioteca/autor/:autorId', async(req, res)=>{
  resp=await autorController.del (req.headers, req.params.autorId );
  res.status(200).send(resp);
})

router.post('/biblioteca/genero', async(req, res, next)=>{
  resp=await generoController.post (req.headers, req.body);
  res.status(200).send(resp);
})

router.get('/biblioteca/genero', async(req, res, next)=>{
  user=await generoController.get(req.headers);
  res.status(200).send(user);
})

router.put('/biblioteca/genero/:generoId', async(req, res)=>{
  resp=await generoController.put (req.headers, req.body, req.params.generoId );
  res.status(200).send(resp);
})

router.delete('/biblioteca/genero/:generoId', async(req, res)=>{
  resp=await generoController.del (req.headers, req.params.generoId );
  res.status(200).send(resp);
})

router.get('/biblioteca/tipo', async(req, res, next)=>{
  resp=await tipoController.get(req.headers);
  res.status(200).send(resp);
})

router.post('/biblioteca/tipo', async(req, res, next)=>{
  resp=await tipoController.post (req.headers, req.body);
  res.status(200).send(resp);
})

router.put('/biblioteca/tipo/:tipoId', async(req, res)=>{
  resp=await tipoController.put (req.headers, req.body, req.params.tipoId );
  res.status(200).send(resp);
})

router.delete('/biblioteca/tipo/:tipoId', async(req, res)=>{
  resp=await tipoController.del (req.headers, req.params.tipoId );
  res.status(200).send(resp);
})

router.get('/biblioteca/obra', async(req, res, next)=>{
  resp=await obraController.get(req.headers);
  res.status(200).send(resp);
});

router.post('/biblioteca/obra', async(req, res, next)=>{
  resp=await obraController.post (req.headers, req.body);
  res.status(200).send(resp);
});

router.put('/biblioteca/obra/:obraId', async(req, res)=>{
  resp=await obraController.put (req.headers, req.body, req.params.obraId );
  res.status(200).send(resp);
})

router.delete('/biblioteca/obra/:obraId', async(req, res)=>{
  resp=await obraController.del (req.headers, req.body, req.params.obraId );
  res.status(200).send(resp);
})

module.exports=router;