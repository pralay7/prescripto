import React from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets_admin/assets'
//import {assets} from '../assets_admin'
const AllAppoitments = () => {
  
  const{token,allAppointments,setAllAppointments,getAllAppointments, cancelAppointments}= useContext(AdminContext)
  const {calcAge, slotDateFormat}=useContext(AppContext)
  useEffect(()=>{
    getAllAppointments()

  },[token])

  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All appointments</p>
        <div className='bg-white border-0 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-0'>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & time</p>
            <p>Doctor</p>
            <p>fees</p>
            <p>Actions</p>
          </div>
          {allAppointments&&allAppointments.map((item,index)=>{
            return(<div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-0.5 hover:bg-gray-50'>
                <p className='max-sm:hidden'>{index+1}</p>
                <div className='flex items-center gap-2'>
                  <img  className='w-8 rounded-full' src= {item.userData.image} alt="" /><p>{item.userData.name}</p>
                </div>
                <p className='max-sm:hidden'>{calcAge(item.userData.dob)}</p>
                <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                 <div className='flex items-center gap-2'>
                  <img  className='w-8 rounded-full' src= {item.docData.image} alt="" /><p>{item.docData.name}</p>
                </div>
                <p>${item.docData.fees}</p>
                {
                item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted? <p className='text-green-500 text-xs font-medium'>Completed</p>:
                <img onClick={()=>{cancelAppointments(item._id,true)}} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                }
                
            </div>)
          })}
        </div>

    </div>
  )
}

export default AllAppoitments