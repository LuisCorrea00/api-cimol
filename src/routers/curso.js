const express=require('express');
const cursoController=require("../controller/cursoController");
const cursoRouter = express.Router();
 
cursoRouter.get('/', async(req, res, next)=>{
    curso=await cursoController.get(req.headers);
    res.status(200).send(curso);
  })
  
  cursoRouter.get('/:idCurso', async(req, res, next)=>{
    curso=await cursoController.getCurso(req.headers, req.params.idCurso);
    res.status(200).send(curso);
  })

  cursoRouter.get('/coordenador/:idCoordenador', async(req, res, next)=>{
    curso=await cursoController.getCursoCoordenador(req.headers, req.params.idCoordenador);
    res.status(200).send(curso);
  })
  
  cursoRouter.post('/', async(req, res, next)=>{
    resp=await cursoController.post (req.headers, req.body);
    res.status(200).send(resp);
  })
  
cursoRouter.put('/:idCurso', async(req, res, next)=>{
    console.log(req.params.idCurso);
  
    resp=await cursoController.put (req.headers, req.body, req.params.idCurso );
    res.status(200).send(resp);
  })

module.exports=cursoRouter;