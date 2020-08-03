const r = require("rethinkdb");
const usersCollection = r.table("users");

class User {
  constructor(data , dataObject = null){
    this.data = data
    this.dataObject = dataObject
  }

  //User Create
  async create(){
    let dataresult = {
      'success': false,
      'message': "Failed",
    };
    try{

      if(this.data.username != ""){
        const addUser = await usersCollection.insert(this.data).run(connection)

        let userId = "";
        userId = addUser.generated_keys.toString()

        dataresult = {
          'success': true,
          'message': "User Created",
          'data':userId
        };
      }
    }catch(e){
      console.log(e)
      return dataresult = {
        'success': false,
        'message': "Api Fail",
        'error':e 
      };
    }
      return dataresult       
  }

  //User Get By Id
  async getUserById(){
    let dataresult = {
      'success': false,
      'message': "Failed",
    };
    console.log(this.data)
    try{

      if(this.data.id != "" || this.data.id != undefined ){
        const getUserInfo = await usersCollection.get(this.data).run(connection)
        dataresult = {
            'success': true,
            'message': "Successful",
            'data': getUserInfo
      };
    }      
    }catch(e){
      console.log(e)
    }
      return dataresult       
  }

  //User All
  async getAll(){
    let dataresult = {
      'success': false,
      'message': "Failed",
    };
    try{
        const getall = await usersCollection.run(connection)
        if(getall._responses.length > 0){
            dataresult = {
              'success': true,
              'message': "Successful",
              'data': getall._responses[0].r
            }      
        }else{
          dataresult = {
            'success': true,
            'message': "No Data"
          } 
        }
    }catch(e){
      console.log(e)
    }
      return dataresult       
  }

   //User Update
   async userUpdateById(){
    let dataresult = {
      'success': false,
      'message': "Update Failed",
    };
    try{
        const updateUser = await usersCollection
          .get(this.data)
          .update({'isLoggedIn': false})
          .run(connection)

        dataresult = {
            'success': true,
            'message': "User Updated",
        };
    }catch(e){
      console.log(e)
    }
      return dataresult       
  } 

   //User Delete
   async userDeleteById(){
    let dataresult = {
      'success': false,
      'message': "Failed",
    };
    try{
      if(this.data.user_Id != "" || this.data.user_Id != undefined ){
        const deleteUser = await usersCollection.get(this.data)
        .delete()
        .run(connection)
        .catch(error => console.log(error));

        dataresult = {
            'success': true,
            'message': "User Deleted",
        };
     }      
    }catch(e){
      console.log(e)
    }
      return dataresult       
  }

  async isUserExist(){
    let isExist = false;

    try{
        const userInfo = await usersCollection
          .filter({username:this.data})
          .run(connection)
          .catch(error => console.log(error));

        if(userInfo._responses.length > 0) {
          isExist = true
        }
    } catch (e) {
      console.log(e)
    }
    
    return isExist
  }

}


module.exports = User
