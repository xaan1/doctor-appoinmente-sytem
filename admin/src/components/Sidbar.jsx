
import React, { useContext } from 'react'
import { AdminContext } from '../contex/AdminContex'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../contex/DoctorContex'
const Sidbar = () => {


    const {     atoken,setAtoken
    } = useContext(AdminContext)



    const {dtoken , setDtoken , backEndUrlDoctor} = useContext(DoctorContext)


  return (
    <div className='min-h-screen bg-white border-r'>


        {
            atoken && <ul className='text-[#515151]  mt-5'>
                <NavLink  className={({isActive}) => `flex gap-x-2 items-center py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2F3FF] border-r-4 border-primary" : ""} `} to={'/admin-dashboard'}>
                  <img src={assets.home_icon} alt="home_icon" className="w-8 h-9" />
                  <p>Dashboard</p>
                </NavLink>


                <NavLink className={({isActive}) => `flex gap-x-2 items-center py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2F3FF] border-r-4 border-primary" : ""} `} to={'/all-appointments'}>
                  <img src={assets.appointment_icon} alt="appointment_icon" className="w-10 h-10" />
                  <p>Appointment</p>
                </NavLink>


                <NavLink className={({isActive}) => `flex gap-x-2 items-center py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2F3FF] border-r-4 border-primary" : ""} `}  to={'/add-doctor'}>
                  <img src={assets.doctor_icon} alt=".doctor_icon" className="w-10 h-10" />
                  <p>Add Doctor</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex gap-x-2 items-center py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2F3FF] border-r-4 border-primary" : ""} `}   to={'/doctor-list'}>
                  <img src={assets.list_icon} alt="list_icon" className="w-10 h-10" />
                  <p>Doctor List</p>
                </NavLink>

            </ul>
        }


{
            dtoken && <ul className='text-[#515151]  mt-5'>
                <NavLink  className={({isActive}) => `flex gap-x-2 items-center py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2F3FF] border-r-4 border-primary" : ""} `} to={'/doctor-dashboard'}>
                  <img src={assets.home_icon} alt="home_icon" className="w-8 h-9" />
                  <p>Dashboard doctor</p>
                </NavLink>


                <NavLink className={({isActive}) => `flex gap-x-2 items-center py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2F3FF] border-r-4 border-primary" : ""} `} to={'/doctor-profile'}>
                  <img src={assets.doctor_icon} alt="appointment_icon" className="w-10 h-10" />
                  <p>Profile Doctor</p>
                </NavLink>


                <NavLink className={({isActive}) => `flex gap-x-2 items-center py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#f2F3FF] border-r-4 border-primary" : ""} `}  to={'/doctor-AppointMenets'}>
                  <img src={assets.doctor_icon} alt=".doctor_icon" className="w-10 h-10" />
                  <p>
                    Appointments
                  </p>
                </NavLink>

               
            </ul>
        }



    </div>
  )
}

export default Sidbar