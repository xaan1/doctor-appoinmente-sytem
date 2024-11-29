
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../contex/AdminContex'
import {useNavigate} from "react-router-dom"

const Navbar = () => {
    const {     atoken,setAtoken
     } = useContext(AdminContext)


     const logout = () => {
       
        atoken && setAtoken("")
        atoken && localStorage.removeItem("atoken")
        navigate("/")
     }


     const navigate  =  useNavigate()



  return (
    <div className='flex  justify-between items-center px-4 sm:px-10 py-3 border-b bg-white '>


        <div className='flex items-center gap-x-3 text-sm'>
            <img src={assets.admin_logo} alt="admin_logo" className="w-20 h-20" />
            <p className='text-sm space-x-1'>  {atoken ? "Admin" : "Doctor"} </p>
        </div>

        <button  onClick={logout}   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Logout
        </button>
      


    </div>
  )
}

export default Navbar