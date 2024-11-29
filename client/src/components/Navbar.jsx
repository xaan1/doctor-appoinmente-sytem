
import React, { useContext, useState } from 'react'

import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContex'

const Navbar = () => {


          const navigate  = useNavigate()
          const [showMenu, setShowMenu] = useState(false)
        

          const {  backEndUrl,
                token, setToken   } = useContext(AppContext);


                const logout = () => {
                                  
                        token && setToken("")
                        token && localStorage.removeItem("token")
                        navigate("/")
                }

  return (
    <div


    className='flex items-center justify-between px-10 py-5 border-b text-sm mb-5'
    >

        <img  className='w-44 cursor-pointer' src={assets.logo}  alt='logo' />




        <ul

        className='hidden md:flex items-center space-x-10'
        
        >

            <NavLink to="/" >
                    
                    <li
                    className='py-2 '
                    
                    >
    
                    HOME
                    <hr className='border-none outline-none h-0.5 bg-primary hidden' />
    
                    </li>
            </NavLink>

            <NavLink to="/doctor">
                    
                    <li   className='py-2 '>
    
                    All Doctors
                    <hr className='border-none outline-none h-0.5 bg-primary hidden' />
    
                    </li>
            </NavLink>

            <NavLink to="/about"> 
                    
                    <li   className='py-2 '>
    
                    About
                    <hr className='border-none outline-none h-0.5 bg-primary hidden'  />
    
                    </li>
            </NavLink>

            <NavLink to="/contact">
                    
                    <li   className='py-2 '>
    
                    Contact
                    <hr className='border-none outline-none h-0.5 bg-primary hidden'  />
    
                    </li>
            </NavLink>


        </ul>


        <div className='flex items-center gap-4'>

          {
                token ? (
                        <div className='flex items-center cursor-pointer group relative gap-x-2'>
                                <img src={assets.profile_pic} alt='avatar' className='w-10 h-10 rounded-full cursor-pointer' />
                                <img src={assets.dropdown_icon} alt='dropdown' className='w-5 h-5 cursor-pointer' />

                                <div className='absolute top-0  right-0  pt-14 z-20 font-medium hidden group-hover:block'>
                                        

                                        <div className='bg-stone-100 p-5 flex flex-col space-y-2 rounded-md shadow-md min-w-49'>
                                        <p onClick={() => navigate("/profile")} className='hover:text-primary cursor-pointer'>Profile</p>
                                        <p onClick={() => navigate("/my-appointments")} className='hover:text-primary cursor-pointer'> Appointments</p>
                                        <p onClick={logout} className='hover:text-primary cursor-pointer'>Logout</p>
                                                </div>                                         
                                      
                                        </div>
                        </div>
                )  : 
                (
                        <>
                          <button

onClick={() => navigate('/login')}

className='px-5 py-2 bg-primary text-white rounded-md hidden md:block'

>Create Account </button>
                        </>
                )
          }



          <img src={assets.menu_icon} alt='menu' className='w-5 h-5 cursor-pointer md:hidden' onClick={() => setShowMenu(!showMenu)} />

                {/* -----moilMenu */}
                <div className={`${showMenu ? "fixed w-full" : "h-0 w-0"}  md:hidden right-0 top-0 bottom-0 z-20  overflow-hidden bg-white transition`}>

             

                <div className='flex items-center justify-between px-3 py-4'>
                        <img src={assets.logo} alt='logo' className='w-44 cursor-pointer md:hidden' />
                        <img src={assets.cross_icon} alt='cross' className='w-5 h-5 cursor-pointer md:hidden' onClick={() => setShowMenu(!showMenu)} />
                      
                </div>

                <ul className='flex flex-col items-center gap-4 px-4 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)}  to="/" > <p  className="px-4 py-3 rounded inline-block">Home</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/doctor" > <p className="px-4 py-3 rounded inline-block" >All Doctors</p></NavLink>
                        <NavLink   onClick={() => setShowMenu(false)} to="/about" > <p className="px-4 py-3 rounded inline-block">About</p></NavLink>
                        <NavLink   onClick={() => setShowMenu(false)} to="/contact" > <p className="px-4 py-3 rounded inline-block">Contact</p></NavLink>
                </ul>
                
                </div>
          
           
        </div>


    </div>
  )
}

export default Navbar