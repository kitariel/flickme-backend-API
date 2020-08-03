let Users = require("../models/Users-models");
const User = require("../models/Users-models");


exports.apiCreate = async (req , res) => {
  let createUser = new Users(req.body)
  let isExist = new User()
  const resultIfExist = await isExist.isUserExist(req.body.username)
  
  let resultContainer = []
    if(!resultIfExist){
      const result = await createUser.create().catch(err => console.log(err))    
      if(result.success){
          let objectRes = {
            isAccess:true,
            results:result
          }
          resultContainer.push(objectRes)
          res.json(resultContainer)
      }else{
          res.json(result.message , result.error)
      }
    }else{
      let objectRes = {
        isAccess:false,
        results:'No User Created'
      }
      resultContainer.push(objectRes)
      res.json(resultContainer)
    }
  
}

exports.apiGetAll = async (req , res) => {
  let user = new Users(req.body = null)
  res.json(await user.getAll())
}


exports.apiUserGet = async (req , res) => {
  // console.log(req.query.id)// query or params debug mode
  let getUserId = new Users()
    const result = await getUserId.getUserById(req.query.id)
    res.json(result)
}

exports.apiUpdateUser = async (req , res) => {
  let userObject = {
      username:req.body.username,
      room_id:req.body.room_id,
      isOnline:true
  }
  // console.log(userObject , req.query.id)// query or params debug mode
  let userUpdate = new Users()
  const result = await userUpdate.userUpdateById(req.query.id , userObject)
  res.json(result)
}

exports.apiUserDelete = async (req , res) => {
  let user_id = req.query.id;
  let userUpdate = new Users()
  const result = await userUpdate.userDeleteById(user_id)
  res.json(result)
}

exports.apiUserChecker = async (req , res) =>{
  let userUpdate = new Users()
  const result = await userUpdate.isUserExist(req.query.username)
  res.json(result)
}



