import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Contact from './pages/Contact'
import About from './pages/About'
import MyFile from './pages/MyFile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Footer from './components/Footer'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App= () => {
  return (
    
    <div className='mx-4 sm:mx-[10%]'>
      <NavBar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Docs/>}/>
        <Route path='/doctors/:speciality' element={<Docs/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/myprofile' element={<MyFile/>}/>
        <Route path='/myappointments' element={<MyAppointments/>}/>
        <Route path='/appointments/:docId' element={<Appointment />}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
      <Footer/>
    </div>
  )
}

export default App
