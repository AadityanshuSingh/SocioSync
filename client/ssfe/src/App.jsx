import * as React from 'react'
import { useState, useEffect } from 'react';
import { Button, ChakraProvider, Input } from '@chakra-ui/react' 

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

// import io from "socket.io-client"
// const socket = io("http://localhost:4000");

function App() {

  const [value, setValue] = useState('');
  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  }
  useEffect( () => {
      socket.on('serverMessage', (data) => {
        const {message} = data;
      });
      setValue("");
      setMessage("");
  }, [socket,message]);

  const sendMessage = () => {
    setMessage(value);
    recipient = value;
    if (recipient && message) {
      socket.emit('private_message', { socket, recipient, message });
    }
  }
  
  return (
    <ChakraProvider>
      <>
      <Input value={value} 
             type='text'
             placeholder='Write your message' 
             onChange={handleChange}/>

      <Button colorScheme='green' onClick={sendMessage}>
        Send Message
      </Button>
      </>
    </ChakraProvider>
  )
}

export default App