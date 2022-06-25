const userModel=require("../model/userModel");
exports.get= async ()=>{
  return await userModel.get()
}