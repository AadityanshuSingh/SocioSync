import * as React from 'react'
import { useState, useEffect } from 'react';
import { Button, ChakraProvider, Input, extendTheme } from '@chakra-ui/react' 

import socketIO from 'socket.io-client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import {OTP} from './pages/OTP'
import { ResetPassword } from './pages/ResetPassword';
import { ChooseNewPassword } from './pages/ChooseNewPassword';
import { ResetComplete } from './pages/ResetComplete';
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
  
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({config})

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
      <Routes>
        <Route index element={<ResetComplete/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/otp' element={<OTP/>}/>
        <Route path='/resetpassword' element={<ResetPassword/>}/>
        <Route path='/choosenewpassword' element={<ChooseNewPassword/>}/>
        <Route path='/resetcomplete' element={<ResetComplete/>}/>
      </Routes>
    </ChakraProvider>
    </BrowserRouter>
  )
}

export default App