

import React from 'react'

import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import Contact from './pages/Contact'
import About from './pages/About'
import Profile from './pages/Profile'
import ApointMent from './pages/ApointMent'
import ApointMentDoctor from './pages/ApointMentDoctor'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[5%]
    '>

 <Navbar />

   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/doctor/:speciality" element={<Doctor />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-appointments" element={<ApointMent />} />
      <Route path="/login" element={<Login />} />
      <Route path="/appointments/:id" element={<ApointMentDoctor />} />
   </Routes>

   <Footer />

    </div>
  )
}

export default App