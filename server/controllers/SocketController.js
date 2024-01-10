// server/controllers/socketController.js
const handleSocketConnections = (io) => {
    io.on('connection', (socket) => {
      console.log(`⚡: ${socket.id} user just connected!`);


    //   Sending Private Messsge controller
      socket.on('private_message', (data) => {
        const { recipient, message } = data;
        io.to(recipient).emit('private_message', { sender: socket.id, message });
      });
  
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  };
  
  module.exports = { handleSocketConnections };