import * as React from 'react'
import { useState, useEffect } from 'react';
import { Button, ChakraProvider, Input } from '@chakra-ui/react' 

import socketIO from 'socket.io-client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
// const socket = socketIO.connect('http://localhost:4000');

// import io from "socket.io-client"
// const socket = io("http://localhost:4000");

function App() {

  // const [value, setValue] = useState('');
  // const [message, setMessage] = useState("");
  // const handleChange = (event) => {
  //   event.preventDefault();
  //   setValue(event.target.value);
  // }
  // useEffect( () => {
  //     socket.on('serverMessage', (data) => {
  //       const {message} = data;
  //     });
  //     setValue("");
  //     setMessage("");
  // }, [socket,message]);

  // const sendMessage = () => {
  //   setMessage(value);
  //   recipient = value;
  //   if (recipient && message) {
  //     socket.emit('private_message', { socket, recipient, message });
  //   }
  // }
  
  return (
    <BrowserRouter>
      <ChakraProvider>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </ChakraProvider>
    </BrowserRouter>
  )
}

export default App