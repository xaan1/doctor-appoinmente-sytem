
import React, { useContext, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContex';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
const ApointMentDoctor = () => {


  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');



  const daysOfWeak = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  const getAvailableSlots = () => {
    setDocSlot([]);
  
    let today = new Date();
    console.log(today, "today");
  
    // calculate 7 days
    for (let i = 0; i < 7; i++) {
      // Clone the current date and add `i` days
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // dhamaadka waqtiga maalinta
  
    
  
      // Haddii ay tahay maanta (maalinta 0aad)
      if (today.getDate() === currentDate.getDate()) {
        // Haddii waqtiga hadda jira uu ka weyn yahay 10:30 subaxnimo
        if (currentDate.getHours() >= 10 && currentDate.getMinutes() > 30) {
          currentDate.setHours(currentDate.getHours() + 1); // saacad ku dar
          currentDate.setMinutes(0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(30);
        }
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      
      let timeSlot = [];
  
      // Samee boosaska 30 daqiiqo ah ilaa 9PM
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
        timeSlot.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      setDocSlot((prev) => [...prev, timeSlot]);
    }
  };
  










  const { id } = useParams();

  console.log(id);

  const {doctors  ,getDoctors ,token  ,backEndUrl} = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)


  useEffect(() => {
    getAvailableSlots()

  },[docInfo])



  const fetchInfo = async () => {
    const doctorId = doctors.find((doctor) => doctor._id === id)
    console.log(doctorId , "doctorId");
    setDocInfo(doctorId)

  }



  useEffect(() => {
    fetchInfo()
  }, [])


  console.log(docInfo, "docInfo");







  const navigate  = useNavigate();




  // Book Appointment
  console.log(docSlot, "docSlot");




  async function bookAppointment() {


    if(!token){
    alert('Please login to book appointment')
       return navigate('/login')
    }


    try {

  
const date = docSlot[slotIndex][0].datetime;
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const slotDate = `${day}-${month}-${year}`; // Correct format

      console.log(slotDate, "slotDate");
   
      const {data} = await axios.post(`${backEndUrl}/api/user/BookedAppointment`, {
        doctorId : docInfo._id,
        slotDate,
        slotTime : slotTime,
      }, {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })

      console.log(data, "data in book appointment");

      if(data.success){
        toast.success(data.message)
        navigate('/my-appointments')
      }
    }
   catch (error) {
    console.log(error);
   }

   









  }


  return  docInfo &&(


    <div className='mb-5'>


      {/* doctor details */}

      <div className='flex flex-col sm:flex-row gap-x-4'>


        <div


        
        >

          <img src={docInfo.image} 

          className='bg-primary w-full sm:max-w-72 rounded-lg'
          
          />

        </div>


        <div

        className='flex-1 border border-gray-400 p-8 py-7 bg-white sm:mx-0 mt-[-80px] sm:mt-0 rounded-lg'
        
        >

          <p className='flex items-center gap-2 text-2xl  font-semibold'> {docInfo.name}  </p>


          <div className='flex items-center gap-x-2 text-sm mt-1 text-gray-600'>
            <p> {docInfo.degree}  - {docInfo.speciality}</p>
            <button

            className='bg-primary text-white px-5 py-3 rounded-md'
            
            >
              {docInfo.experience}
            </button>

          </div>



          {/* about  */}


          <div  

        
          
          >
            <p   className='flex items-center gap-x-2 mt-4 text-sm '>
              About
              <img src={assets.info_icon}  />
            </p>
      
            <p
            className='text-gray-600 mt-2 max-w-[400px]'
            
            >
              {docInfo.about}
            </p>


          </div>

          <p

          className='mt-4 text-2xl font-semibold'
          
          >
            appointment fee :   <span>${docInfo.fees}</span>  
          </p>

  
      


        </div>




      </div>




{/*  Booking */}


<div className='mt-10 sm:ml-72 sm:pl-4  font-medium text-gray-700'>



<p className='text-2xl font-semibold'>Book an appointment</p>



<div className='flex gap-x-3 items-baseline w-ful mt-4 overflow-hidden'>
  {
    docSlot.length && docSlot.map((item, index) => (
      <div onClick={() => setSlotIndex(index)} className={
        `text-center py-6 min-w-16 rounded-full cursor-pointer  ,
        ${slotIndex === index  ? 'bg-primary text-white' : 'bg-gray-200'}`
      } key={index}>
        

        <p>
          {item[0]   && daysOfWeak[item[0].datetime.getDay()]} 

        </p>

        <p>
          {item[0]   && item[0].datetime.getDate()}

        </p>
      </div>
    ))
  }
</div>


<div className='mt-4 flex gap-x-2 items-center w-full overflow-x-scroll'>

  {
    docSlot.length && docSlot[slotIndex].map((item, index) => (
      <div onClick={() => setSlotTime(item.time)} className={
        `text-center py-6 min-w-16 rounded-full cursor-pointer  ,
        ${slotTime === item.time  ? 'bg-primary text-white' : 'bg-gray-200'}`
      } key={index}>
        

        <p>
          {item.time} 

        </p>

      </div>
    ))
  }


</div>

<button className=' mt-5 bg-primary text-white px-5 py-3 rounded-md'  onClick={bookAppointment}>Book Appointments </button>




</div>





   
      
      </div>
  )
}

export default ApointMentDoctor