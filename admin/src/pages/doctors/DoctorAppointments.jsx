import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'

const DoctorAppointments = () => {
  const{getAllAppointments}= useContext(AdminContext)
  const{appointments,myAppointments,dToken,cancelAppointments,completeAppointment}= useContext(DoctorContext)
    const {calcAge, slotDateFormat}=useContext(AppContext)
  
  useEffect(()=>{
      myAppointments()
  
    },[dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All appointments</p>
        <div className='bg-white border-0 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_2fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-0'>
            <p>#</p>
            <p>patitent</p>
            <p>payment</p>
            <p>age</p>
            <p>Date & time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {
           appointments&& appointments.map((item, index)=>{
                return(
                  <div key={index}  className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-0.5 hover:bg-gray-50'>
                    <p>{index+1}</p>
                    <div>

                    <img  className='w-8 rounded-full'  src={item.userData.image} alt="" /><p>{item.userData.name}</p>
                    </div>
                    <p className='text-xs text-grey-400'>{item.payment? 'ONLINE':'CASH'}</p>
                    <p className='max-sm:hidden px-12'>{calcAge(item.userData.dob)}</p>
                    <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                    <p  className='flex items-center gap-2'>${item.docData.fees}</p>
                     {
                      item.cancelled
                      ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                      :item.isCompleted?<p className='text-green-400 text-xs font-medium'>Completed</p>: <div>
                        <img onClick={()=>{cancelAppointments(item._id)}} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={()=>{completeAppointment(item._id)}}  className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                      </div> 
                      }
                  </div>
                )
            })
          }
        </div>
    </div>
  )
}

export default DoctorAppointments