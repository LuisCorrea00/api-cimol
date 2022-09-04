const express=require('express');
const professorController=require("../controller/professorController");
const professorRouter = express.Router(); 

professorRouter.get('/', async(req, res, next)=>{
    
    res.status(200).send({status:"ok"});
})

module.exports=professorRouter;