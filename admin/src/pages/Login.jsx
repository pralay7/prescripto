import React, { useContext, useState } from 'react'
import { assets } from '../assets_admin/assets'
import { useSearchParams } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
// we will use it to log in both doctor and admin
 
const Login = () => {
   const[ state,setState ]= useState('Admin')

   const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
const{ backendUrl, setToken}=useContext(AdminContext)
const{dtoken,setDtoken}= useContext(DoctorContext)
   
const onSubmitHandler= async (event)=>{
    event.preventDefault()// prevents reloading of the website ehen the form is subbmitted
    try{
        //make an api call to backend and save the admin or doctor data
        if(state==='Admin'){
            
            const{data}=  await axios.post(backendUrl+ '/api/admin/login',{email,password})
            if(data.success){
                localStorage.setItem('Token',data.token)
                setToken(data.token)
                console.log(data.token)
            }
           
        } else{
            const{data}=  await axios.post(backendUrl+ '/api/doctor/login',{email,password})
            if(data.success){
                localStorage.setItem('dToken',data.token)
                setDtoken(data.token)
                console.log(data.token)
            }else{
                console.log("gandu 4")
            }
            }


    }catch(error){
        console.log(error.message);
        
    }
}

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl  text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span>Login</p>
            <div className='w-full'>
                <p>Email</p>  
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='email' required/>
            </div>
            <div className='w-full'>
                <p>password</p>
                <input  onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='password' required/>

            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md  text-base' >Login</button>
        {
             state==='Admin'?
                <p >Doctor Login? <span  className='text-primary underline cursor-pointer' onClick={()=>{setState('Doctor')}}>Click me</span></p>:
                 <p >Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>{setState('Admin')}}>Click me</span></p>
        }
        </div>
    </form>
  )
}

export default Login