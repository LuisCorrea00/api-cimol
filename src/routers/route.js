const express=require('express');
const userController=require("../controller/userController");
const cursoController=require("../controller/cursoController");
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

module.exports=router;