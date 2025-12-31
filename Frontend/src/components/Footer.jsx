import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        {/*it has three secs so 3 divs */}
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>
            {/*.............left................*/}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md;2/3 text-gray-600 leading-6'>awsdad aeff  asf af saef af aef ds fd df d f ad srewr ew
            humpty dumpty sat on a wall and fucked his head up oh no he was so dumb pagla choda hoye e gechi
            </p>

            </div>
            <div>
            <p className='text-xl font-medium mb-5'> Company</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
            {/*.............mid................*/}
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <div>
                <ul className='flex flex-col gap-2 text-gray-600'> 
                    <li>+91 9123653453</li>
                    <li>rmridam@gmail.com</li>
                </ul>
            </div>
             {/*.............right................*/}
        </div>
        </div>
        
        
        <div>
            <hr/>
            <p>Copyright 2024@  Prescripto -All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer