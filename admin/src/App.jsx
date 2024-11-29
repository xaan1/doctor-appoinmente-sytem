
import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './contex/AdminContex';
import Navbar from './components/Navbar';
import Sidbar from './components/Sidbar';
import { Route, Routes } from 'react-router-dom';
import Dashpourd from './pages/admin/Dashpourd';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorList from './pages/admin/DoctorList';
import Appointment from './pages/admin/Appointment';
import { DoctorContext } from './contex/DoctorContex';
import DoctorDashpours from './pages/doctor/DoctorDashpours';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorAppoitmnets from './pages/doctor/DoctorAppoitmnets';
const App = () => {



  
  const {dtoken , setDtoken , backEndUrlDoctor} = useContext(DoctorContext)


  

  const {     atoken,
    setAtoken,
    backEndUrl} = useContext(AdminContext)
  return  atoken || dtoken  ? (
    <div className='bg-[#F8F9fD]'>
     
    
      <ToastContainer />
      <Navbar />

      <div className='flex items-start'>
        <Sidbar />
        <Routes>


          {/* admin routes */}
          
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashpourd/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorList/>} />
          <Route path='/all-appointments' element={<Appointment/>} />



          {/* doctor routes */}


        
          <Route path='/doctor-dashboard' element={<DoctorDashpours/>} />
          <Route path='/doctor-profile' element={<DoctorProfile/>} />
          <Route path='/doctor-AppointMenets' element={<DoctorAppoitmnets/>} />
          
          

        </Routes>

 </div>



    </div>
  ) : (
    <>
    
      <Login />
      <ToastContainer />
    </>
  )
}

export default App