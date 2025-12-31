import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { utoken, backendUrl } = useContext(AppContext)

  const [appointment, setAppointments] = useState([])
  const months = [" ",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

const slotDateFormat= (slotDate)=>{
  const dateArray= slotDate.split('_')
  return dateArray[0]+' '+months[Number(dateArray[1])]+" "+dateArray[2]


}
const navigate =useNavigate()

const cancelAppointments = async (appointmentId)=>{
  try {
    const { data } = await axios.post(backendUrl + "/api/user/cancel-appointments",{appointmentId}, {headers:{ utoken } })
     if (data.success) {
        toast.success(data.message)
        console.log(data.appointment) 
        getUserAppointments()
      } else {
        toast.error(data.message) 
      }
  } catch (error) {
    toast.error(error.message)
  }
}

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { utoken } })
      
      if (data.success) {
         setAppointments(data.appointment.reverse())
        console.log(data.appointment) 
      } else {
        toast.error(data.message) 
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  

  const appointmentRazorpay = async (appointmentId)=>{
      try {
        
      const {data}= await axios.post(backendUrl +"/api/user/payment-razorpay",{appointmentId},{headers:{utoken}} )
      
        if(data.success){
            console.log(data.orders)   
            initPay(data.orders)       
        }

      } catch (error) {
        toast.error(error.message)
        console.log(error)
      }
  }  
const initPay=(orders)=>{
  const options={
    key:import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount:orders.amount,
    currency:orders.currency,
    name:"Appointment payment",
    description:"Appointment payment",
    order_id:orders.id,
    receipt:orders.receipt,
    handler: async(response)=>{
      console.log(response)
      const n= response.razorpay_order_id

      const paymentRespose= await axios.post(backendUrl+"/api/user/payment-verification",{n},{headers:{utoken}})
     try {
        if(paymentRespose.success){
        getUserAppointments()
        navigate("/myappointments")
      }
      }catch(error){
        toast.error(error.message)
        console.log(error.message)
      }
    }
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}
  
  useEffect(() => {
    if (utoken) {
      getUserAppointments()
    }
  }, [utoken])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>

      <div>
        {appointment.map((item, index) => {
          return (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={item._id || index}>
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData?.image || item.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData?.name || item.name}</p>
                <p>{item.docData?.speciality || item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData?.address?.line1 || item.address.line1}</p>
                <p className='text-xs'>{item.docData?.address?.line2 || item.address.line2}</p>
                
    
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && !item.isCompleted&& item.payment &&<button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
                {!item.cancelled && !item.isCompleted&& !item.payment && <button onClick={()=>{appointmentRazorpay(item._id)}} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500' >Pay Now</button>}
                {item.cancelled&&!item.isCompleted&&<button className='text-sm text-center sm:min-w-48 py-2  border-black border rounded text-red-600' >Cancelled</button> }
                {item.isCompleted&&<p className='text-sm text-center sm:min-w-48 py-2  border-black border rounded text-green-600'>Completed</p>}
                {!item.cancelled &&!item.isCompleted&& <button onClick={()=>cancelAppointments(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-500' >Cancel appointment</button>}
              </div>

            </div>)
        })}
      </div>
    </div>
  )
}

export default MyAppointments