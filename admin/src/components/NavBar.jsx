import React, { useContext } from 'react'
import { assets } from '../assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const NavBar = () => {
    const {token,setToken}=useContext(AdminContext )
    const {dToken,setDtoken}=useContext(DoctorContext)
    const navigate = useNavigate()

    const handleLogout=  ()=>{
        navigate('/')
        token && setToken('')
        token && localStorage.removeItem('Token')
        dToken && setDtoken('')
        dToken && localStorage.removeItem('dToken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-r-0 bg-white'>  
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
             <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{token?'Admin':'Doctor'}</p>
        </div>
        <button onClick={handleLogout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default NavBar