
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContex'

const Doctor = () => {


  const {speciality
  } = useParams()

  console.log(speciality
  )




  const [filteredDoctors, setFilteredDoctors] = useState([])

  
  const { doctors } = useContext(AppContext);

  console.log(doctors  , "doctors")
  console.log(filteredDoctors  , "filteredDoctors")





  const filterDoctors = () => {

    if(speciality){
      setFilteredDoctors(doctors.filter((doctor) => doctor.speciality

      === speciality))

    } else{
      setFilteredDoctors(doctors)
    }
   
  }



  // console.log(filteredDoctors)

  const  navigate = useNavigate()

  useEffect(() => {
    filterDoctors()
  },[speciality , doctors])



  const [showFilter  , setShowFilter] = useState(false)

  console.log(showFilter , "showFilter")

  return (
    <div>


    <p

    className='text-3xl font-bold mb-4'
    
    
    >Browse  thought the doctors Specialist </p>

    <div className='flex  flex-col  sm:flex-row items-start gap-5 mt-5'>

 <button onClick={() => setShowFilter(prev => !prev)} className={`text-black px-4 py-2 rounded sm:hidden ${showFilter ? "bg-primary text-white" : ""}`}>FIlter</button>



      <div className= {` flex-col   gap-4 text-sm text-gray-600   ${showFilter ? "flex" : "hidden sm:flex"}`}>
        <p 
 onClick={() =>  speciality ==  "General Physician" ? navigate(`/doctor`)   : navigate(`/doctor/General Physician`)}
    
        
        className={`w-[94vw] mb-3 sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300  transition-all rounded cursor-pointer] ${speciality == "General physician" ? "bg-indigo-400 text-white" : ""}`}>General physician</p>
        <p onClick={() =>  speciality ==  "Gynecologist" ? navigate(`/doctor`)  : navigate(`/doctor/Gynecologist`)} className={`w-[94vw]  mb-3 sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300  transition-all rounded cursor-pointer] ${speciality == "Gynecologist" ? "bg-indigo-400 text-white" : ""} `}>Gynecologist</p>
        <p onClick={() =>  speciality ==  "Dermatologist" ? navigate(`/doctor`)  : navigate(`/doctor/Dermatologist`)}  className={`w-[94vw]  mb-3 sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300  transition-all rounded cursor-pointer]  ${speciality == "Dermatologist" ? "bg-indigo-400 text-white" : ""} `}>Dermatologist</p>
        <p  onClick={() =>  speciality ==  "Pediatrician" ? navigate(`/doctor`)  : navigate(`/doctor/Pediatrician`)} className={`w-[94vw]  mb-3 sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300  transition-all rounded cursor-pointer]  ${speciality == "Pediatricians" ? "bg-indigo-400 text-white" : ""}`}>Pediatricians</p>
        <p onClick={() =>  speciality ==  "Neurologist" ? navigate(`/doctor`)  : navigate(`/doctor/Neurologist`)} className={`w-[94vw]  mb-3 sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300  transition-all rounded cursor-pointer] ${speciality == "Neurologist" ? "bg-indigo-400 text-white" : ""}`}>"Neurologist"</p>
       

      </div>





  {/* all doctors */}



<div 

className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'

>




  {
    filteredDoctors.map((doctor) => (
      <div
      key={doctor._id}
      className="bg-white shadow-md rounded-lg p-7 flex flex-col items-center text-center"
      onClick={() => navigate(`/appointments/${doctor._id}`)}
    >
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-40 h-40 object-cover rounded-full mb-4"
      />
      <h3 className="text-lg font-bold">{doctor.name}</h3>
      <p className="text-gray-500">{doctor.speciality}</p>
      <p className="text-gray-400">{doctor.experience}</p>
      <p className="mt-2 text-green-600 font-medium">${doctor.fees} per visit</p>
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Book Now
      </button>
    </div>
    ))
  }

</div>



    </div>

    </div>
  )
}

export default Doctor