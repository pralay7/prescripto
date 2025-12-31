import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const DoctorContext = createContext()

const DoctorContextProvider =(props)=>{


    const backendUrl= import.meta.env.VITE_BACKEND_URL
    const[dToken,setDtoken]= useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [appointments,setAppointments]=useState()
    const[dashData, setDashData]=useState(false)
    const[profileData, setProfileData]=useState(false)

    const myAppointments=async()=>{
        try {
            const {data} = await axios.get(backendUrl+"/api/doctor/appointments",{headers:{dToken}})
            if(data.success){
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse())
            }else{
            console.log('gandu4')

            }
        } catch (error) {
            toast.error(error.message)
             console.log(error)
            
        }
    }
    const cancelAppointments=async(appointmentId)=>{
        try{
            const {data}= await axios.post(backendUrl+"/api/doctor/cancel-appointments",{appointmentId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                myAppointments()
                
            }else{
                console.log("gandu5")
                console.log(data.message)
            }
        }catch(error){
            toast.error(error.message)
            console.log(error.message )

        }
    }
    const completeAppointment = async(appointmentId)=>{
        try{
            const {data}= await axios.post(backendUrl+"/api/doctor/complete-appointment",{appointmentId},{headers:{dToken}})
            if(data.success){
            toast.success(data.message)
                myAppointments()
                
            }else{
                console.log("gandu5")
                console.log(data.message)
            }
        }catch(error){
            toast.error(error.message)
            console.log(error.message )
        }
    }
    const getDashData=async()=>{
        try {
            const {data}= await axios.get(backendUrl +"/api/doctor/dashBoard",{headers:{dToken}})
            if(data.success){
                setDashData(data.dashBoard)
                console.log(data.dashBoard)
            }else{
                toast.error(data.message)
                            console.log("gandu5")

                console.log(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log("gandu5")
            console.log(error.message )
        }
    }

const getProfileData =async()=>{
    try {
        const {data}= await axios.get(backendUrl +"/api/doctor/doctorProfile",{headers:{dToken}})
        if(data.success){
                setProfileData(data.profile)
                console.log(data.profile)
            }else{
                toast.error(data.message)
                console.log("gandu61")
                console.log(data.message)
            }
    } catch (error) {
         toast.error(error.message)
            console.log("gandu6")
            console.log(error.message )
    }
}
const updateProfile=async(address,availability,fees)=>{
    try {
        const {data}= await axios.post(backendUrl +"/api/doctor/doctorProfile",{},{headers:{dToken}})
        if(data.success){
               toast.success(data.message)
        }else{
                toast.error(data.message)
                console.log("gandu71")
                console.log(data.message)
            }
    } catch (error) {
        toast.error(error.message)
            console.log("gandu7")
            console.log(error.message )
    }
}

    const value={
dToken,setDtoken,myAppointments,appointments,setAppointments, cancelAppointments,completeAppointment
,getDashData,dashData,setDashData,getProfileData,profileData,setProfileData,backendUrl
    }
    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider