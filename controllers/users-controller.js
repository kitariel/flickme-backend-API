let Users = require("../models/Users-models");
const User = require("../models/Users-models");

exports.apiCreate = async (req , res) => {
let createUser = new Users(req.body)
let isExist = new User(req.body.username)
const resultIfExist = await isExist.isUserExist()

  if(!resultIfExist){
    const result = await createUser.create().catch(err => console.log(err))    
    if(result.success){
        res.json(result)
    }else{
        res.json(result.message , result.error)
    }
  }else{
    res.json('User Exist')
  }

}

exports.apiGetAll = async (req , res) => {
  let user = new Users(req.body = null)
  res.json(await user.getAll)
}


exports.apiUserGet = (req , res) => {
  // console.log(req.query.id)// query or params debug mode
let getUserId = new Users(req.query.id)
  getUserId.getUserById()
  .then(result => res.json(result))
  .catch(err => console.log(err))
}

exports.apiUpdateUser = (req , res) => {
  let userObject = {
      username:req.body.username,
      room_id:req.body.room_id,
      isOnline:true
  }
  let userUpdate = new Users(req.params.getUserId ,userObject)
  userUpdate.userUpdateById()
  .then(result => res.json(result))
  .catch(err => console.log(err))    
}

exports.apiUserDelete = (req , res) => {
  let user_id = req.params.getUserId;
  let userUpdate = new Users( user_id)
  userUpdate.userDeleteById()
  .then(result => res.json(result))
  .catch(err => console.log(err)) 
}

exports.apiUserChecker = (req , res) =>{
  let userUpdate = new Users(req.query.username)
  userUpdate.isUserExist()
  .then(result => res.json(result))
  .catch(err => console.log(err)) 
}


