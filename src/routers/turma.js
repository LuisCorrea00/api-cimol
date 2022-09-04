const express=require('express');
const turmaController=require("../controller/turmaController");
const turmaRouter = express.Router();
 
turmaRouter.get('/', async(req, res, next)=>{
    turma=await turmaController.get(req.headers);
    res.status(200).send(turma);
  })

module.exports=turmaRouter;