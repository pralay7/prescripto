import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-600' id='speciality'>
        <h2 className='text-3xl font-medium'>Find by speciality</h2> 
       <p className=" sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors<br/></p>
        <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-scroll"> 
            {specialityData.map((item , index)=>{
                return(<Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                    <img src={item.image} alt="" />
                    <p>{item.speciality}</p>
                </Link>)
            })}
        </div>
    </div>
  )
}

export default SpecialityMenu