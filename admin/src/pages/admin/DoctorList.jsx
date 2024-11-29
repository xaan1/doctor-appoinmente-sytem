
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../contex/AdminContex'
import axios from 'axios'
import { toast } from 'react-toastify'
const DoctorList = () => {


  

  const {     atoken,
    setAtoken,
    backEndUrl} = useContext(AdminContext)

    const [doctors, setDoctors] = useState([]); // Xogta dhakhaatiirta

  // fetch Doctors from the database



  // change_Availability
  async function fetchDoctors(){
    try {
      const {data} = await axios.get(`${backEndUrl}/api/admin/all_Doctor`, {
        headers: {
          Authorization: `Bearer ${atoken}`
        }})
        setDoctors(data.result)

        console.log(data)
      } catch (error) {
        console.log(error)
      }
  }


  useEffect(() => {
    fetchDoctors()
  }, [atoken])







  async function changeAvailability(docId) {
    try {
      const {data} = await axios.put(`${backEndUrl}/api/admin/change_Availability`, {docId}, {
        headers: {
          Authorization: `Bearer ${atoken}`
        }
      })
      // console.log(data  ,"changeAvailability")

      if(data.success){

        toast.success(data.message)

        fetchDoctors()

      }


    
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className="p-8  m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-2xl font-bold text-center mb-8">All Doctors</h1>
      <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer p-4 shadow-md"
          >
            <img
              src={doctor.image} // Sawirka dhakhtarka
              alt={doctor.name}
              className=" bg-indigo-50 hover:bg-primary transition-all duration-500   rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.speciality
            }


            </p>
            <div className=' mt-2 flex text-center   items-center gap-1 text-sm'>


            <input  onChange={() => changeAvailability(doctor.
_id
)}  type='checkbox' className='mt-4' checked={doctor.available} />
            <p className="text-gray-600 mt-4">available</p>



     </div>


          </div>
        ))}
      </div>
    </div>
  );
  
}

export default DoctorList