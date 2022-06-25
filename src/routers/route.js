const express=require('express');
const userController=require("../controller/userController");
const router = express.Router();

router.get('/', (req, res, next)=>{
  res.status(200).send("<h1>API CIMOL</h1>");
})
 
router.get('/user', async(req, res, next)=>{
  user=await userController.get();
  res.status(200).send(user);
})

module.exports=router;