import React from 'react'
import { assets } from '../assets/assets';

const Cva = () => {
    return (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row  justify-between items-center bg-primary  px-10 py-12 rounded-lg mb-10 ">
        
            <div className="'md:w-1/2 flex flex-col items-start justify-center space-y-5 md:space-y-8">
              <h1 className="text-3xl font-bold mb-4">Book Appointment</h1>
              <p className="text-xl mb-6">With 100+ Trusted Doctors</p>
              <button className="bg-white text-blue-500 px-4 py-2 rounded-full shadow">
                Create account
              </button>
            </div>
            <div className="'md:w-1/2 flex flex-col items-start justify-center space-y-5 md:space-y-8 relative">
              <img
                src={assets.appointment_img} // Replace with actual image URL
                alt="Doctor"
                className="w-96  object-cover rounded-lg"
              />
            </div>
          </div>
       
      );
}

export default Cva