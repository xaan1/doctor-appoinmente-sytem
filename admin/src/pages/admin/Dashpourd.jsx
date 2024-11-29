
import React, { useContext } from 'react'
import { AdminContext } from '../../contex/AdminContex'
import { assets } from '../../assets/assets'

const Dashpourd = () => {



  const {dashboard ,cancelappointment ,atoken} = useContext(AdminContext)





  console.log(dashboard);


  
  return (
    <div className="m-5">


      <div className='flex flex-wrap gap-7' >



        <div className='flex items-center gap-2 bg-white  p-8 rounded border-2 border-gray-700  cursor-pointer hover:scale-95'>




          <img src={assets.doctor_icon} alt="doctor_icon" className="w-14 h-14" />
          <div>
            <h1>Doctors</h1>
            <h2>{dashboard.
totalDoctors
}</h2>
    


          </div>

        </div>




        <div  className='flex items-center gap-2 bg-white  p-8 rounded border-2 border-gray-700  cursor-pointer hover:scale-95'>




<img src={assets.appointment_icon} alt="doctor_icon" className="w-14 " />
<div>
  <h1>Appointments</h1>
  <h2>{dashboard.
totalAppointments
}</h2>



</div>

</div>



<div  className='flex items-center gap-2 bg-white  p-8 rounded border-2 border-gray-700  cursor-pointer hover:scale-95'>




<img src={assets.patients_icon} alt="doctor_icon" className="w-14 h-13" />
<div>
  <h1>Patient</h1>
  <h2>{dashboard.
totalUsers
}</h2>



</div>

</div>





      </div>



      <div className=" bg-white mt-5">

        <div className="flex items-center gap-3 mt-10 px-5 py-4 border">
          <img src={assets.list_icon} alt="list_icon" className="w-14 h-14" />
          <p>Latest Booking</p>
        </div>


        <div className='pt-4 border border-t-0'>

         
         {
          dashboard.lastAppointments?.map((item , index) => (

            <div className='flex items-center px-6 py-3 gap-3  hover:bg-gray-300' key={index}>

        <img src={item.doctorData.image} alt='image'  className=' rounded-full w-10'/>

<p>
  {item.
doctorData.name}
</p>




   </div>
  
          ))
         }

        </div>

      </div>






    </div>
  )
}

export default Dashpourd