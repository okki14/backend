const Router=require('express').Router()
const {ProductControllers}=require('./../controller')



Router.post('/getproduct',ProductControllers.register)

module.exports=Router