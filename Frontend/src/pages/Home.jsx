import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className=''>
        <Header/>
        <SpecialityMenu/>
        <TopDoctors/>
        <Banner/>
    </div>
  )
}

export default Home