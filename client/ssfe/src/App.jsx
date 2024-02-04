import * as React from 'react'
import { store } from './redux/store';
import { ChakraProvider } from '@chakra-ui/react' 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { Login } from './pages/Login';
import { VerifyEmail } from './pages/VerifyEmail'
import { ResetComplete } from './pages/ResetComplete';
import { Dashboard } from './pages/Dashboard';
import { SignUp } from './pages/SignUp';
import PrivateRoute from './components/Auth/PrivateRoute';
import { Homepage } from './components/Dashboard/Homepage';
function App() {

  return (
    <BrowserRouter>
      <ChakraProvider>
      <Provider store={store}>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/forgotpassword' element={<forgotPassword/>}/>
        <Route path='/changepassword' element={<changePassword/>}/>
        <Route path='/resetcomplete' element={<ResetComplete/>}/>

        <Route
            path="/dashboard/*" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }>
            <Route index element={<Homepage/>} />

            {/* <Route path="myprofile" element={<MyProfile/>} />
            <Route path="saved" element={<Saved/>} />
            <Route path="friends" element={<Friends/>} />
            <Route path="settings" element={<Settings/>} />
            <Route path="community" element={<Community/>} /> */}
        </Route>

      </Routes>
      </Provider>
    </ChakraProvider>
    </BrowserRouter>
  )
}

export default App