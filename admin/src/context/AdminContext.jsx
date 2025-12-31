import { createContext, useState } from "react";
import axios from "axios";
export const AdminContext = createContext()
import { toast } from "react-toastify";
const AdminContextProvider =(props)=>{
    // state variable to store token' 

    const[token, setToken]=useState(localStorage.getItem('Token')?localStorage.getItem('Token'):'')
    const[doctors, setDoctors]= useState([])
    const[allAppointments,setAllappointments]=useState([])

    const[dashData, setDashdata]=useState(false)

    const backendUrl =import.meta.env.VITE_BACKEND_URL
    
    const getAllAppointments= async()=>{
        try{

            const {data} = await axios.get(backendUrl+"/api/admin/all-appointments",{headers:{token}})
            if(data.success){
                setAllappointments(data.appointments)
                console.log(data.appointments)
                console.log("gandu")
            }else{
                toast.error(data.message +" ee ganduu")
            }

        }catch(error){
            console.log(error.message)
            toast.error(error.message)
        }
    }
    
    const getAllDoctors= async()=>{

        try{
            const {data}= await axios.post( backendUrl+'/api/admin/all-doctors',{},{headers:{token}})
            if(data.success){
            setDoctors(data.doctors)
            console.log(data.doctors)
        }
        else{ 
            toast.error(data.message)
        }
      }catch(error){
            toast.error(error.message)
            console.log(error.message )
      }
    }
    const changeAvailability = async(docId)=>{
        try{
            const {data}=await axios.post( backendUrl+'/api/admin/change-availability',{docId},{headers:{token}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)

            }
        }catch(error){
             toast.error(data.message)
        }
    }
    const cancelAppointments=async(appointmentId)=>{
        try{
            const {data}= await axios.post(backendUrl+"/api/admin/cancel-appointments",{appointmentId},{headers:{token}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                console.log("gandu2")
                console.log(data.message)
            }
        }catch(error){
            toast.error(error.message)
            console.log(error.message )

        }
    }

    const adminDashboard =async()=>{
        try {
            
            const {data}= await axios.get(backendUrl+"/api/admin/dashboard",{headers:{token}})
            if(data.success){
                setDashdata(data.dashData)
                console.log(data.dashData)
            }else{
                console.log("gandu3")
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error.message )
        }
    }

    const value={
        token,
        setToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        allAppointments,
        setAllappointments,
        getAllAppointments,
        cancelAppointments,dashData ,setDashdata,adminDashboard
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider