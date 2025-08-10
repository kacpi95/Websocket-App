const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const server = app.listen(8000, () => {
  console.log('Server is runing on port: 8000');
});
const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, 'client')));

const io = socket(server);
io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join', (user) => {
    console.log(`Dodano nowego użytkowniak do listy ${user} ${socket.id}`);
    users.push({ user, id: socket.id });

    socket.broadcast.emit('newUser', user);
  });

  socket.on('message', (message) => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    const user = users.findIndex((user) => user.id === socket.id);
    if (user !== -1) {
      const userName = users[user].user;
      users.splice(user, 1);
      socket.broadcast.emit('removeUser', userName);
    }
    console.log('Aktualna lista użytkowników ', users);
    // console.log('Oh, socket ' + socket.id + ' has left');
  });
  // console.log("I've added a listener on message and disconnect events \n");
});
