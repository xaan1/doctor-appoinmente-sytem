
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContex'
import axios from 'axios';

const ApointMent = () => {


  const {doctors,   backEndUrl,
    token, setToken,} = useContext(AppContext)

  console.log(doctors, "doctors");


  const [appointments, setAppointments] = useState([])
  // BookedAppointment





  const slotDateFormate = (slotDate) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    // Transform ISO date string to readable format
    const date = new Date(slotDate); // Parse the ISO string
    const day = date.getDate(); // Get the day of the month
    const month = months[date.getMonth()]; // Get the month (0-indexed)
    const year = date.getFullYear(); // Get the year
  
    return `${day} ${month} ${year}`;
  };
  

  async function getAppointments() {


    try {
      const { data } = await axios.get(`${backEndUrl}/api/user/getappointments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data.appointment, "data in get appointments");

      if (data.success) {
        setAppointments(data.appointments)
      }

    } catch (error) {
      console.log(error);
    }

  }


  useEffect(() => {
    getAppointments();
  },[])




  async function cancelappointment(id) {
      
      try {


    const { data } = await axios.post(`${backEndUrl}/api/user/cancelappointment`, {
      appointmentId : id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (data.success) {
      getAppointments();
    }

    console.log(data, "data in cancel appointment");
       
  } catch (error) {
    console.log(error);
  }

}

;
  return (
    <div>
    
    <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>
      My AppointMent
    </p>

    <div>

      {
        appointments.map((doctor ,index) => {

        
          return (
            <div key={index} className='grid  grid-cols-1 sm:grid-cols-3 gap-y-2 space-y-4'>
            
            <div>

              <img  className='w-32 bg-indigo-50 mb-4' src={doctor.
doctorData.image} alt="doctor" />

              </div>

              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{doctor.
doctorData.name}</p>
                <p className='text-neutral-800 font-semibold'>{doctor.doctorData.speciality}</p>
              
                <p className='text-neutral-800 font-semibold'>
                Address: 
              </p>

                <p className='text-neutral-800 font-semibold'>
                {slotDateFormate(doctor.slotDate)} || {doctor.slotTime}
                </p>

 </div>


 <div>


<div>  </div>



 <div className='flex flex-col gap-x-2 justify-end'>
  
  <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded'> Pay Online</button>
    {
      !doctor.cancelled &&  <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded' onClick={() => cancelappointment(doctor._id)}> Cancel </button>
    } 
    {doctor.cancelled && <button className='text-sm text-red-900 text-center sm:min-w-48 py-2 border rounded text-red-900' disabled> appointmente Cancelled </button>}
 </div>
 </div>










            </div>
          )
        })
      }

    </div>

      </div>
  )
}

export default ApointMent