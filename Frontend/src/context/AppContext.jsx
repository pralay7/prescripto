import { createContext, useEffect, useState } from "react";
//import { doctors } from "../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext =createContext()


const AppContextProvider=(props)=>{

const[doctors,setDoctors]=useState([])
const backendUrl= import.meta.env.VITE_BACKEND_URL

const [userData ,setUserData]=useState(false)

const[utoken,setToken]= useState(localStorage.getItem('uToken')?localStorage.getItem('uToken'):'')




const getDoctors=async()=>{
    try{
        const {data}=  await axios.get(backendUrl+"/api/doctor/list")
        if(data.success){
            setDoctors(data.doctors)
            toast.success(data.message)
        }
        else{
            toast.error(data.message)
        }

    }catch(error){
        toast.error(error.message)
    }
}

const loadUserData= async()=>{
    try {
        const {data}= await axios.get(backendUrl +"/api/user/profile",{headers:{utoken:utoken}})
        if(data.success){
            setUserData(data.user)
            toast.success(data.message)
            console.log(data)

        }
        else{
        toast.error(data.message)
   
        }
    } catch (error) {
        toast.error(error.message)
    }
}
useEffect(()=>{
    if(utoken){
        loadUserData()
    }else{
        setUserData(false)
    }
},[utoken])
useEffect(()=>{
    getDoctors()
},[])
    const value={
        doctors,utoken ,setToken,getDoctors,
        backendUrl,setUserData,userData,loadUserData
    }
    
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
} 

export default AppContextProvider