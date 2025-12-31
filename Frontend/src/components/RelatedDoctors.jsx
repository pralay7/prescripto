import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const RelatedDoctors = (props) => {
    const{speciality,docId}= props
  const {doctors}=useContext(AppContext)
  const [relDoc,setRelDoc]=useState([])
  const navigate=  useNavigate()
  useEffect(()=>{
    if(doctors.length>0&& speciality){
        const docsData= doctors.filter((doc)=>doc.speciality===speciality && doc._id!=docId)
        setRelDoc(docsData)
    }
  },[docId,doctors,speciality])
    return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 ' id='relatedDocs'>
         
    <h2 className='text-3xl font-medium'>Top Doctors to Book</h2> 
       <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors</p>
         <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {relDoc.slice(0,5).map((item, index)=>{
                return(
                   <div onClick={()=>navigate(`/appointments/${item._id}`)} className='border border-blue-200 rounded-3xl overflow-hidden cursor-pointer hover:-translate-y-8 transition-all duration-500  **grid-custom-cols**' key={index} >
                        <img className='bg-blue-50' src={item.image} alt="" />
                        <div className='p-4'>
                          <div className={`flex items-center gap-2 text-sm text-center ${item.available?'text-green-500':'text-gray-500'} `}>
                            <p className={`w-2 h-2 ${item.available?'bg-green-500':'bg-gray-500'} rounded-full`}></p> 
                            <p >{item.available?'Available':'Unavailable'} </p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                   </div>
            </div>
                        
                )

            })}
         </div>
         <button onClick={()=>{navigate(`/doctors`);scrollTo(0,0)}} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
            more
         </button>
    </div>
  )
}

export default RelatedDoctors