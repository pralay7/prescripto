import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets_admin/assets'
import { AppContext } from '../../context/AppContext'

const DoctoDashboard = () => {
 const { dToken, dashData, setDashData, getDashData } = useContext(DoctorContext)
  const{slotDateFormat}= useContext(AppContext)
  const [isEdit, setIsEdit]= useState(false)
useEffect(() => {
    if (dToken) {
        getDashData()
    }
}, [dToken])

return dashData && (
    <div className='m-5'>
      {dashData && (
              <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                  <img className='w-14' src={assets.earning_icon} alt="" />
                  <div>
                    <p className='text-xl font-semibold text-gray-600'>${dashData.earnings}</p>
                    <p className='text-gray-400'>Earnings</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                  <img src={assets.patients_icon} alt="" />
                  <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                    <p className='text-gray-400'>Users</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                  <img src={assets.appointments_icon} alt="" />
                  <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                    <p className='text-gray-400'>Appointments</p>
                  </div>
                </div>
              </div>
            )}
            <div className='bg-white border-0 rounded mt-10'>
                    <div className='flex items-center gap-2.5 px-4 py-4 border-0'>
                      <img src={assets.list_icon} alt="" />
                      <p className='font-semibold'>Latest Bookings</p>
                    </div>
            
                    <div className='pt-4'>
                      {/* 2. THE FIX:
                      
                      
                      dashData?.appts?.map handles the loading state safely */}
                      {dashData?.latestAppointments?.map((item, index) => (
                        <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-50' key={index}>
                        <img className='rounded-full w-10' src={item.userData.image} alt="" />
                        <div className='flex-1 text-sm'>
                          <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                          <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                        </div>
                         { item.cancelled
                          ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                          :item.isCompleted?<p className='text-green-400 text-xs font-medium'>Completed</p>: <div>
                          <img onClick={()=>{cancelAppointments(item._id)}} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                          <img onClick={()=>{completeAppointment(item._id)}}  className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                          </div> 
                          }
                        </div>
                      ))}
                    </div>
                  </div>
    </div>
)
}

export default DoctoDashboard