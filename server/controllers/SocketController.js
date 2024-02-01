const { Socket } = require("socket.io");
const mongoose = require("mongoose");
const User = require("../models/User");
// const falana = require("socket.io");
// server/controllers/socketController.js
// const io = require('socket.io')(httpServer);
const handleSocketConnections = (io) => {
  io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);


  // Private Messsge controller
    socket.on('private_message', (data) => {
      const { sender, recipient, message } = data;
      
      // writing the logic for peronal chat
      // console.log("first");
      var roomName = (sender < recipient) ? (sender + recipient) : (recipient + sender);
      // if the user is already in the room then no need to join him again
      const room = io.sockets.adapter.rooms.get(roomName);
      if(room && room.has(roomName))
      {
        io.sockets.in(roomName).emit('private_message', message);
        console.log("firstcndn");
      }
      else
      {
        socket.join(roomName);
        io.sockets.in(roomName).emit('serverMessage', message);
        console.log("secondcndn");
      }
      console.log(message);

      // else join him


      // update db of the chat model of both sender and receiver
      // updateChat(sender, receiver, message);

      // Now send the message to recepient (if online)
    });



    socket.on('group message', (data) => {
      const { sender, groupName, message } = data;
      var roomName = groupName;
      const room = io.sockets.adapter.rooms.get(roomName);

      if(room && room.has(roomName))
      {
        io.sockets.in(roomName).emit('private_message', {sender, message});
      }
      else{
        socket.join(roomName);
        io.sockets.in(roomName).emit('serverMessage',{sender, message});
        console.log("message is ",message);
        console.log("sender is ", sender);
      }
    })



    // TODO:-DB CALL ON USER DICONNECTION
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
  };
  module.exports = { handleSocketConnections };