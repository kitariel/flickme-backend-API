const r = require("rethinkdb");
const usersCollection = r.table("users");

class User {
  constructor(data, dataObject = null) {
    this.data = data;
    this.dataObject = dataObject;
  }

  //User Create
  async create() {
    let dataresult = {
      success: false,
      message: "Failed",
    };
    try {
      if (this.data.username != "") {
        const addUser = await usersCollection.insert(this.data).run(connection);

        let userId = "";
        userId = addUser.generated_keys.toString();
        // console.log(userId)

        dataresult = {
          success: true,
          message: "User Created",
          data: userId,
        };
      }
    } catch (e) {
      console.log(e);
      return (dataresult = {
        success: false,
        message: "Api Fail",
        error: e,
      });
    }
    return dataresult;
  }

  async login() {
    let queryResult = {
      username: "",
      room: "",
      status: false,
      isOnline: false,
    };
    // console.log(this.data);
    try {
      const user = await usersCollection
        .filter(this.data)("username")
        .run(connection);
      // console.log(user._responses[0].r);
      let username = user._responses[0].r[0];
      if (user._responses[0].r) {
        const room = await this.fetchRoom();

        // queryResult = {
        //   username,
        //   room: room,

        // };
        return room;
      }
    } catch (e) {
      return false;
    }
  }

  async fetchRoom() {
    try {
      const room = await usersCollection.filter(this.data)("room").run(connection);
      // console.log(user._responses[0].r);
      if (room._responses[0].r) {
        return room._responses[0].r[0];
      }
    } catch (e) {
      return false;
    }
  }

  //Im here -->
  //User Get By Id
  async getUserById() {
    let deleteMe = 'dlete me if pulled'// -- >>>>
    let dataresult = {
      success: false,
      message: "Failed",
    };
    // console.log(this.data);
    try {
      if (this.data.id != "" || this.data.id != undefined) {
        const getUserInfo = await usersCollection.get(this.data).run(connection);
        dataresult = {
          success: true,
          message: "Successful",
          data: getUserInfo,
        };
      }
    } catch (e) {
      console.log(e);
    }
    return dataresult;
  }

  //User All
  async getAll() {
    let dataresult = {
      success: false,
      message: "Failed",
    };
    try {
      const getall = await usersCollection.run(connection);
      if (getall._responses.length > 0) {
        dataresult = {
          success: true,
          message: "Successful",
          data: getall._responses[0].r,
        };
      } else {
        dataresult = {
          success: true,
          message: "No Data",
        };
      }
    } catch (e) {
      console.log(e);
    }
    return dataresult;
  }

    //User All
    async getAllUserByFilter(isOnlineParams , getRoom) {
      let dataresult = {
        success: false,
        message: "Failed",
      };
      try {
        const getall = await usersCollection.filter({isOnline:isOnlineParams , room:getRoom}).run(connection);
        if (getall._responses.length > 0) {
          dataresult = {
            success: true,
            message: "Successful",
            data: getall._responses[0].r,
          };
        } else {
          dataresult = {
            success: true,
            message: "No Data",
          };
        }
      } catch (e) {
        console.log(e);
      }
      return dataresult;
    }

  //User Update
  async userUpdateById() {
    let dataresult = {
      success: false,
      message: "Failed",
    };
    try {
      const updateUser = await usersCollection
        .get(this.data)
        .update(this.dataObject)
        .run(connection)
        .catch((error) => console.log(error));

      dataresult = {
        success: true,
        message: "User Updated",
      };
    } catch (e) {
      console.log(e);
    }
    return dataresult;
  }

  //User Delete
  async userDeleteById() {
    let dataresult = {
      success: false,
      message: "Failed",
    };
    try {
      if (this.data.user_Id != "" || this.data.user_Id != undefined) {
        const deleteUser = await usersCollection
          .get(this.data)
          .delete()
          .run(connection)
          .catch((error) => console.log(error));

        dataresult = {
          success: true,
          message: "User Deleted",
        };
      }
    } catch (e) {
      console.log(e);
    }

    return dataresult;
  }

  async isUserExist() {
    let isExist = false;

    try {
      const userInfo = await usersCollection
        .filter({ username: this.data })
        .run(connection)
        .catch((error) => console.log(error));
      // console.log(userInfo._responses.length);
      if (userInfo._responses.length > 0) {
        isExist = true;
      }
    } catch (e) {
      console.log(e);
    }
    return isExist;
  }

}

module.exports = User;
