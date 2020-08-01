// const User = require('../../models/userModel')

const users = [];

const addUser = ( {id, username, room, date} ) => {
    // gi butangan lang nako ug slice kay sa local if mag manual search sa chatroom kay makasud gihapon bisag 
    // lapas sa max character sa name
    // sa URL if sa local nya if lapas ang max char kay makita gyapon sa URL pero naka slice na sya sa chatwindow
    console.log(username)
    username = username.trim().toLowerCase().slice(0, 10);
    console.log(username)

    // 1 username lang sa whole chat app, not per room kay para if mo balhin ang user, dili na pud ma conflict sa username
    const existingUser = users.find(user => user.username === username);

    if(!username) return { error: 'Username is required.' };
    if(existingUser) { return { error: `${username[0].toUpperCase() + username.slice(1)} already exists. Please use another username.`}; }

    const user = { id, username, room, date };
    users.push(user);


}

const getCurrentUser = (id) => users.find(user => user.id === id)

// room-based chat
const getOnlineUsers = (room) => users.filter(user => user.room === room)

// no-room-chatroom
// const getOnlineUsers = () => users.filter((user) => user);

module.exports = { addUser, userLeft, getCurrentUser, getOnlineUsers }