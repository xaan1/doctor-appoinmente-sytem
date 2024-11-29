
import React, { useContext } from 'react'
import { AdminContext } from '../../contex/AdminContex'
import { assets } from '../../assets/assets'
import axios from 'axios'

const Appointment = () => {



 
  const { Appointment , setAppointment ,cancelappointment} = useContext(AdminContext)

  console.log(Appointment , "Appointment")


  const calculateAge = (dob) => {
   

    const today  = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
   

    return age
  }


  const months = [  " ",'Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec']

  const slotDate = (slotDate) => {
    const datArry = slotDate.split('-')
    return  `${datArry[0]} ${months[Number(datArry[1])]} ${datArry[2]}`
  }




  
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='text-2xl mb-3 font-medium'>  All Appointment</p>


<div className='bg-white border min-h-[60vh] rounded text-sm max-h-[80vh] overflow-scroll'>



<div  className='hidden sm:grid grid-cols-7 grid-flow-col py-3 px-6 border-b'>

<p>#</p>
<p>Patient</p>
<p>Age</p>
<p>Date % time</p>
<p>Doctor</p>
<p>Fee</p>
<p>Action</p>



</div>

{
  Appointment.map((item , index) => (
    <div key={index} className='grid grid-cols-7 grid-flow-col py-3 px-6 border-b hover:bg-gray-300'>


<p className='max-sm:hidden'>{index + 1}</p>
<div className='flex items-center gap-x-3'>
  <img src={item.userData.
image
} alt="" className='w-10 h-10 rounded-full mr-2'/>
<p>{item.userData.name}</p>
</div>

<p className='max-sm:hidden'>{calculateAge(item.userData.dop)}</p>


<p className='max-sm:hidden'>{ slotDate(item.slotDate)} </p>
<p className='flex items-center gap-x-3'>
  <img src={item.doctorData.image} alt="" className='w-10 h-10 rounded-full bg-gray-300'/>
  <p>{item.doctorData.name}</p>

</p>
<p className='max-sm:hidden'>${item.amount}</p>
<p className='flex items-center max-sm:hidden '>
  {
    item.cancelled  ? <p className='text-sm text-red-800 font-medium'>  Cancelled </p>  : <img onClick={() => cancelappointment(item._id)} src={assets.cancel_icon} alt="" className='w-10 h-10 mr-2'/>
  }

</p>
      </div>
  ))
}


</div>


    </div>
  )
}

export default Appointment