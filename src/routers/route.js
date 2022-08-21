const express=require('express');

const cursoController=require("../controller/cursoController");
const router = express.Router();
//const user=require("../routers/user");

router.get('/', (req, res, next)=>{
  res.status(200).send("<h1>API CIMOL</h1>");
})

//router.use('/user', user);
/* 
router.get('/user', async(req, res, next)=>{
  user=await userController.get(req.headers);
  res.status(200).send(user);
})

router.post('/user/login', async(req, res, next)=>{
  user=await userController.login(req.body);
  res.status(200).send(user);
})
*/
router.get('/curso', async(req, res, next)=>{
  console.log(BASE_URL);
  curso=await cursoController.get(req.headers);
  res.status(200).send(curso);
})

router.post('/curso', async(req, res, next)=>{
  resp=await cursoController.post (req.headers, req.body);
  res.status(200).send(resp);
})

router.put('/curso/:idCurso', async(req, res, next)=>{
  console.log(req.params.idCurso);

  resp=await cursoController.put (req.headers, req.body, req.params.idCurso );
  res.status(200).send(resp);
})

module.exports=router;