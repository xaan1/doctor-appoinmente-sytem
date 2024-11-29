
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContex';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {  backEndUrl,
    token, setToken   } = useContext(AppContext);

  console.log(backEndUrl , "backEndUrl");

  const [state  ,setState] = useState("Sign up")

  const [email , setEmail]  = useState("")
  const [password , setPassword] = useState("")
  const [name , setName] = useState("")



  const navigate = useNavigate()

  useEffect(() => {

    if(token){
      navigate("/")
    }

  },[token])




  const onsubmitHandler  = async (e) => {
    e.preventDefault()
    console.log(email , password , name)



    try {



      if(state === 'Sign up'){
        const {data} = await axios.post(`${backEndUrl}/api/user/signup` , {email , password , name})

       if(data.success){
        console.log(data);
        setEmail("")
        setPassword("")
        setName("")
        localStorage.setItem("token" , data.token)
        setToken(data.token)
        setState("login")
       } else {
        toast.error(data.error)   
       }

      } else {
        const {data} = await axios.post(`${backEndUrl}/api/user/Login` , {email , password })

       
        if(data.success){
          console.log(data);
          setEmail("")
          setPassword("")
          setName("")
          localStorage.setItem("token" , data.token)
          setToken(data.token)
        
        }else {
          toast.error(data.error)        }
       
       
      }




    } catch (error) {
      console.log(error);
    }
 


  }





  return (
   
      <form onSubmit={onsubmitHandler} className='min-h-[80vh] flex item-center'>
        <div className=" flex flex-col gap-3 p-8 m-auto items-start min-w-[340px] sm:min-w-96 border rounded-xl  text-zinc-700 text-sm shadow ">
          <p

          className='text-2xl font-semibold text-center'
          
          >
            {state === 'Sign up'  ?  "Create Account"  : "Login"}
          </p>
        

        {
          state ===  "Sign up" && (
            <div className='w-full'>

        <label className="block text-sm font-medium mb-1" htmlFor="">
            Full Name
          </label>
          <input
            type="text"
            onChange={(e) =>  setName(e.target.value)}
            value={name}
            required
          
            className=" border border-zinc-300 w-full p-2 rounded"
            placeholder=" Enter your Full Name"
          />
        </div>

          )
        }

        
          
        <div className='w-full'>

<label className="block text-sm font-medium mb-1" htmlFor="">
    Email
  </label>
  <input
    type="text"
    onChange={(e) =>  setEmail(e.target.value)}
    value={email}
    required
  
    className="w-full border border-gray-300 p-2 rounded"
    placeholder=" Enter your Email "
  />
</div>

<div className='w-full'>

<label className="block text-sm font-medium mb-1" htmlFor="">
   Password
  </label>
  <input
    type="text"
    onChange={(e) =>  setPassword(e.target.value)}
    value={password}
    required
  
    className="w-full border border-gray-300 p-2 rounded"
    placeholder="Enter your Password"
  />
</div>


  
<button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
        
        {state === 'Sign up'  ?  "Create Account"  : "Login"}
        </button>

        {

state === 'Sign up'  ? <p onClick={()=> setState("login")}   className='text-2xl   underline cursor-pointer '>
  Already Have Account? Login here
</p>   : <p   onClick={()=> setState("Sign up")} className='text-2xl   underline cursor-pointer '>
 Create an new Account
</p>
        }
          
        </div>
    
      </form>
     

  )
}

export default Login