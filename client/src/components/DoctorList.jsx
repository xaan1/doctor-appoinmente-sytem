
import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContex';

const DoctorList = () =>  {

  const navigate = useNavigate()


  const { doctors } = useContext(AppContext);


  
    return (
        <div className="flex  flex-col items-center py-12 justify-center  ">
          <h2 className="text-2xl font-bold mb-4 text-center">Top Doctors to Book</h2>
          <p className="text-center mb-8 text-gray-500">
            Simply browse through our extensive list of trusted doctors.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white shadow-md rounded-lg p-7 flex flex-col items-center text-center"
              





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
            ))}
          </div>
        </div>
      );
}

export default DoctorList