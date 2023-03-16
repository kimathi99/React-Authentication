import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { AuthProvider } from './auth/auth';
import Home from './pages/Home';
import { Navbar } from './components/header';
import NoMatch from './pages/NoMatch';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import BusinessRegistration from './pages/BusinessRegistration';
import Activate from './pages/Activate';
import LogoutButton from './components/logout';
import Otp from './pages/otp';
import RequireAuth from './auth/requireAuth';
import ForgotPassword from './pages/forgotpassword';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Routes>            
            <Route path='/' element={<Home/>}/>
            <Route path='/profile' element={<RequireAuth> <Profile/></RequireAuth>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/login' element={<Login/>}/>   
            <Route path='/logout' element={<LogoutButton/>}/> 
            <Route path='/verify/account' element={<Activate/>}/> 
            <Route path='/register' element={<Register/>}/>
            <Route path='/verify' element={<Otp/>}/>
            <Route path='/forgotPassword' element={<ForgotPassword/>}/>
            <Route path='/businessregistration' element={<RequireAuth><BusinessRegistration/></RequireAuth>}/>

            <Route path='*' element={<NoMatch/>}/>

          </Routes>
      </AuthProvider>
        
    </BrowserRouter>
  )
  
}

export default App;
