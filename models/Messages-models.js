const r = require('rethinkdb')

const messageCollection = r.table('messages');

class Message {

    constructor(data = null) {
        this.data = data
    }

    async getMessages() {
        const result = await messageCollection
            .orderBy({index:'date'})
            .filter({'room': this.data})
            .run(connection)

        if (result._responses.length > 0) {
            return result._responses[0].r
        } else {
            let dataresult = {
                success: false,
                message: "fetch message failed",
            }
            return dataresult
        }

    }

    async addMessage() {
        let dataresult = {
            success: false,
            message: "add message failed",
        }
        
        try {
            messageCollection.insert(this.data).run(connection)

            dataresult = {
                success: true,
                message: "added message successfully",
            }
        } catch (e) {
            console.log(e)
        }

        return dataresult
    }
}

module.exports = Message