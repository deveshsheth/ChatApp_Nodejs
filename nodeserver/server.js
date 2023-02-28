// Node Server which will handle socket io connections.

const io = require('socket.io')(3030) // import socket and define port number.

// const time = moment().format('h:mm a')
const users = {};

io.on('connection', socket => { // it will listen and handle imcoming req like person 1,2,3 connect to chat app.

    // aa recieve kare che client side thi
    socket.on('new-user-joined', name => { // when any particular user connection occurs so how to handle that connection
        users[socket.id] = name; 
        socket.broadcast.emit('user-joined', name) // new person join the group so the msg goes to all the person in the group accept his that (xys has joined the grp.)
    });

    // aa send kare client ne
    socket.on('send-msg', message => { // whenever a person send msg to grp and broadcast to all people
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });

    socket.on('disconnect', message => { // whenever a person send msg to grp and broadcast to all people
        socket.broadcast.emit('left', users[socket.id] )
        delete users[socket.id];
    });
})