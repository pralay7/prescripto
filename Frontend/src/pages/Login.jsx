import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate =useNavigate()
  const {utoken, setToken , backendUrl}= useContext(AppContext)

  const[email,setEmail]= useState('')
  
  const[state,setState]= useState('Sign Up')
  const[password,setPassword]= useState('')
  const[name,setName]= useState('')



  const onSubmithandler= async (event)=>{
    event.preventDefault()
    try{
      if(state==='Sign Up'){
        const{data}= await axios.post(backendUrl+ '/api/user/register',{email,password,name})
        if(data.success){
          localStorage.setItem('uToken',data.token)
          setToken(data.token)
          toast.success('Signup succesful')
        }else{
          toast.error(data.message)
        }
      }
      else{
         const{data}= await axios.post(backendUrl+'/api/user/login',{email,password})
        if(data.success){
          localStorage.setItem('uToken',data.token)
          setToken(data.token)
          toast.success('login succesful')
          navigate('/')
        }else{
          toast.error(data.message)
        }
      } 

    }
    catch(error){
      toast.error(error.message)
    }
  }
  useState(()=>{
    if(utoken){
      
    }
  },[utoken])
  return (
    <form onSubmit={onSubmithandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-200 rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state==='Sign Up'?'Create Account':'Login'}</p>
          <p >Please {state==='sign Up'?'Create Account':'Login'} to book appointment</p>
        {state==='Sign Up'&&(<div className='w-full'>
          <p>Full Name</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>)}
        <div className='w-full'>
          <p>Email</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" onChange={(e)=>setEmail(e.target.value)} value={email} type="email" />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" onChange={(e)=>setPassword(e.target.value)} value={password} type="password" />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>Create account</button>
        {
          state==="Sign Up"?
          <p>Already have an account?<span onClick={()=>setState('Login')}  className='text-primary underline cursor-pointer'>login here</span></p>:
           <p>Create an account?<span  onClick={()=>setState('Sign Up')} className='text-primary underline  cursor-pointer'>click here</span></p>
          
        }
        </div>
    </form>
  )
}
 
export default Login