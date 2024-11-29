
import React, { useContext, useState } from 'react'

import {assets} from "../assets/assets"
import { AdminContext } from '../contex/AdminContex'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../contex/DoctorContex'


const Login = () => {



  const {     atoken,
    setAtoken,
    backEndUrl} = useContext(AdminContext)

    const {dtoken , setDtoken , backEndUrlDoctor} = useContext(DoctorContext)



  // admin or doctor login



  const [state , setState] = useState('admin')



  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')





  const onSubmitHandler = async (e) => {
    e.preventDefault()

 

    try {


      if(state === "admin"){

        const {data} =  await axios.post(`${backEndUrl}/api/admin/login`, {email , password})
        console.log(data)


        if(data.success){
          setAtoken(data.token)
          localStorage.setItem('atoken' , data.token)
         
        } else {

          toast.error(data.message)
        
      

      }  

      } else {

      let {data} =  await axios.post(`${backEndUrl}/api/doctors/doctorLogin`, {email , password})


        console.log(data , "data login waaye")
        if(data.success){
          setDtoken(data.token)
          localStorage.setItem('dtoken' , data.token)
         
        } else {

          toast.error(data.message)


      }
    }

      
    



    } catch (error) {
      console.log(error)
      if(error.response){
        toast.error(error.response.data.message)
      }
      
   
  }
}



  return (
    <form 
    onSubmit={onSubmitHandler}

    className="min-h-[80vh] flex    items-center"
    
    >


<div className='flex flex-col  gap-3 mx-auto items-start p-8 min-w-[340px]  sm:min-w-96 border rounded-xl shadow-lg '>
  <p className='text-2xl text-center font-semibold m-auto'>  <span className='text-center text-primary'> {state}</span>  <span>Login</span></p>

<div className='w-full'>

<label className="block text-sm font-medium mb-1" htmlFor="">
    Email
  </label>
  <input
    type="text"
    required
  
    onChange={(e)=>setEmail(e.target.value)}
    value={email}
    className="w-full border border-gray-300 p-2 rounded"
    placeholder=" Enter your Email "
  />
</div>




<div className='w-full'>

<label className="block text-sm font-medium mb-1" htmlFor="">
    Password
  </label>
  <input
    type="password"
    required
    onChange={(e)=>setPassword(e.target.value)}
    value={password}
  
    className="w-full border border-gray-300 p-2 rounded"
    placeholder=" Enter your Password "
  />
</div>

 <button className="w-full bg-blue-500 text-white p-2 rounded mt-3">Login</button>

 {
  state === 'admin'  ? <p className='text-center m-auto text-primary cursor-pointer' onClick={()=>setState('doctor')}>Login as Doctor</p> : <p className='text-center m-auto text-primary cursor-pointer' onClick={()=>setState('admin')}>Login as Admin</p>
 }
 </div>


    </form>
  )
}

export default Login