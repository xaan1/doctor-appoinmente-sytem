
import React from 'react'
import Header from '../components/Header'
import Spicialist from '../components/Spicialist'
import DoctorList from '../components/DoctorList'
import Cva from '../components/Cva'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>

      <Header />
      <Spicialist/>
      <DoctorList/>
      <Cva />
   
       </div>
  )
}

export default Home