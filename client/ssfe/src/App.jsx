import * as React from 'react'
import { store } from './redux/store';
import { ChakraProvider } from '@chakra-ui/react' 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { Login } from './pages/Login';
import { OTP } from './pages/OTP'
import { ResetPassword } from './pages/ResetPassword';
import { ChooseNewPassword } from './pages/ChooseNewPassword';
import { ResetComplete } from './pages/ResetComplete';
import { Dashborad } from './pages/Dashborad';
import { SignUp } from './pages/SignUp';

function App() {

  return (
    <BrowserRouter>
      <ChakraProvider>
      <Provider store={store}>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
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