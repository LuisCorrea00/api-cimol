const express=require('express');
const disciplinaController=require("../controller/disciplinaController");
const disciplinaRouter = express.Router(); 
disciplinaRouter.get('/', async(req, res, next)=>{
    aluno=await disciplinaController.get(req.headers);
    res.status(200).send(aluno);
  })

module.exports=disciplinaRouter;