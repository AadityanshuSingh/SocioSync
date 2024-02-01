import * as React from 'react'
import { useState, useEffect } from 'react';
import { store } from './redux/store';
import { Button, ChakraProvider, Input, extendTheme } from '@chakra-ui/react' 
import socketIO from 'socket.io-client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { Login } from './pages/Login';
import {OTP} from './pages/OTP'
import { ResetPassword } from './pages/forgotPassword';
import { ChooseNewPassword } from './pages/changePassword';
import { ResetComplete } from './pages/ResetComplete';
import { Dashborad } from './pages/Dashborad';
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
      <Provider store={store}>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/otp' element={<OTP/>}/>
        <Route path='/forgotpassword' element={<forgotPassword/>}/>
        <Route path='/changepassword' element={<changePassword/>}/>
        <Route path='/resetcomplete' element={<ResetComplete/>}/>
        <Route path='/dashboard' element={<Dashborad/>}/>
      </Routes>
      </Provider>
    </ChakraProvider>
    </BrowserRouter>
  )
}

export default App