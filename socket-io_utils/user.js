const UsersModel = require('../models/Users-models')

const users = [];

const addUser = async ({ id, username, room, isOnline }) => {

  // 1 username lang sa whole chat app, not per room kay para if mo balhin ang user, dili na pud ma conflict sa username
  // const existingUser = users.find((user) => user.username === username);
  
  //get user if exist
  let user_id = new UsersModel(username)
  const existingUser = user_id.isUserExist()

  //get userId then update to isOnline to true
  let userUpdateOnline = new UsersModel(id , {isOnline:true})
  let dataTempUpdate = await userUpdateOnline.userUpdateById()
  //debuf only for now
  if(dataTempUpdate.success)
  {
      // console.log(dataTempUpdate.success)
  }else{
      // console.log(dataTempUpdate.success)
  }

  //get the user recently updated
  let getUserInfo = new UsersModel(id)
  const dataTempId = await getUserInfo.getUserById()



  if (!username) return { error: "Username is required." };
  if (!existingUser) {
    return {
      error: `${
        username[0].toUpperCase() + username.slice(1)
      } already exists. Please use another username.`,
    };
  }

  // const { data } = dataTempId
  // const { id, username, room, isOnline } = data
  // const user = { id, username, room, date };
  // users.push(user);
  return {user:dataTempId.data}
};

const userLeft = async (id) => {
    let getAllUserByIdx = new UsersModel(id)
    const indexx = await getAllUserByIdx.getUserById()
    
    //update user isOnline to false
    let getALLuserOnline = new UsersModel(id , {isOnline:false})
    const OnlineUser = await getALLuserOnline.userUpdateById()
    if(OnlineUser.success)
    {
      console.log(OnlineUser.message)
    }else{
      console.log(OnlineUser.message)
    }

    if(indexx != null){
      return indexx.data
    }

    // users.push(indexx)

    // const index = await users.findIndex(user => user.id === id);

    // if(index !== -1) {
    //     return users.splice(index, 1)[0]
    // }
    // set isLoggedIn to false when user disconnects
    // let currentUser = new UsersModel(id)
    // const getUserId = await currentUser.getUserById()
    // const result = await getUserId.userUpdateById()
    // console.log(result)
    // return result
}

// const getCurrentUser = (id) => users.find((user) => user.id === id);.
const getCurrentUser = async (id) => {
  let getAllUserById = new UsersModel(id)
  const userInfo = await getAllUserById.getUserById()
  // console.log('userInfo')
  // console.log(userInfo.data)
  return userInfo.data
} 

// room-based chat
// const gestOnlineUsers = (room) => users.filter((user) => user.room === room);
const getOnlineUsers = async (room) => {
  let getALLuserOnline = new UsersModel(data = null)
  const OnlineUser = await getALLuserOnline.getAllUserByFilter(true , room)
  return OnlineUser.data
}

// no-room-chatroom
// const getOnlineUsers = () => users.filter((user) => user);

module.exports = { addUser, userLeft, getCurrentUser, getOnlineUsers };
