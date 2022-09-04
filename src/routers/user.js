const express=require('express');
const userController=require("../controller/userController");
const userRouter = express.Router(); 

userRouter.get('/', async(req, res, next)=>{
    user=await userController.get(req.headers);
    res.status(200).send(user);
  })
  
  userRouter.post('/login', async(req, res, next)=>{
    user=await userController.login(req.body);
    res.status(200).send(user);
  })

module.exports=userRouter;