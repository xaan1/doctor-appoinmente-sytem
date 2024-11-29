import React from 'react';
import { specialityData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';


const Spicialist = () => {

  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center py-16 bg-white'>
      {/* Qoraalka sare */}
      <h2 className='text-3xl font-bold mb-4'>Find by Speciality</h2>
      <p className='text-gray-500 text-sm mb-12 text-center max-w-lg'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      {/* Grid-ka takhasusyada */}
      
      <div className='grid grid-cols-2 md:grid-cols-6 gap-10'>
        {specialityData.map((item, index) => (
          <div
            key={index}
            className='flex flex-col items-center text-center space-y-3'
            onClick={() => navigate(`/doctor/${item.speciality}`)}
          >
            {/* Sawirka */}
            <img
              src={item.image}
              alt={item.speciality}
              className='w-20 h-20 object-cover rounded-full shadow-lg'
            />
            {/* Qoraalka */}
            <p className='text-gray-700 font-medium'>{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};



export default Spicialist