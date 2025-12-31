import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './context/AppContext';
import { AdminContext } from './context/AdminContext';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import AllAppoitments from './pages/admin/AllAppoitments';
import AddDoctors from './pages/admin/AddDoctors';
import Doctors from './pages/admin/Doctors';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard  from './pages/doctors/DoctoDashboard'
import DoctorAppointments from './pages/doctors/DoctorAppointments'
import DoctorProfile from './pages/doctors/DoctorProfile'
const App = () => {

  const{token}=useContext(AdminContext)
  const{dToken}= useContext(DoctorContext)

  return token ||dToken? (
    <div className='bg-[#F8F9FD]'>
      <NavBar/>
      <ToastContainer/>
      <div className='flex items-start'>
       <ToastContainer/>
       <SideBar/>
      <Routes>
        <Route path='/' element={<></>}/>
        <Route path='/admin-dashBoard' element={<Dashboard/>}/>
        <Route path='/all-appointments' element={<AllAppoitments/>}/>
        <Route path='/add-doctor' element={<AddDoctors/>}/>
        <Route path='/doctor-list' element={<Doctors/>}/>

        <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
         <Route path='/doctor-appointments' element={<DoctorAppointments />} />
        <Route path='/doctor-profile' element={<DoctorProfile />} />
      </Routes> 
      </div>
      
      
    </div>
  ):
  (
    <div>
      <Login/>
      <ToastContainer/>
    </div>
  )
}

export default App