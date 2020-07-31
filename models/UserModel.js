const r = require('rethinkdb')

const userCollection = r.table('users');

class User {

    constructor(data = null) {
        this.data = data
    }

    async getUsers() {
        const result = await userCollection.run(connection)

        if (result._responses.length > 0) {
            return result._responses[0].r
        } else {
            let dataresult = {
                success: false,
                message: "fetch user failed",
            }
            return dataresult
        }

    }

    async addUser() {
        let dataresult = {
            success: false,
            message: "add user failed",
        }
        
        try {
            const checkExisting = await userCollection
                .filter({username: this.data.username.toLowerCase()})
                .count()
                .eq(1)
                .run(connection);

            if (checkExisting) {
                if (!this.data.isLoggedIn == undefined || !this.data.isLoggedIn == null || !this.data.isLoggedIn === false || !this.data.isLoggedIn == '') {
                    userCollection
                        .filter({username: this.data.username.toLowerCase()})
                        .update({
                            room: this.data.room
                        })
                        .run(connection)

                    console.log('naa si dan, pero offline sya gikan, karon kay gi update nako iyang room')
                }

                dataresult = {
                    success: false,
                    message: "user exists",
                }
                
                console.log('naa si dan and online sya dili nato hilabtan ang room')
            } else {
                userCollection.insert(this.data).run(connection)
                dataresult = {
                    success: true,
                    message: "added user successfully",
                }

                console.log('gi add nato kay wala ni exist si dan')
            }
        } catch (e) {
            console.log(e)
        }

        return dataresult
    }
}

module.exports = User