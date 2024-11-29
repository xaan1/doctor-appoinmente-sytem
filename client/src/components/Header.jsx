import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row items-center bg-primary text-white px-10 py-12 rounded-lg mb-10'>
      {/* Qaybta Bidix */}

      
      <div className='md:w-1/2 flex flex-col items-start justify-center space-y-5 md:space-y-8'>
        <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
          Book Appointment <br /> With Trusted Doctors
        </h1>
        <p className='text-sm md:text-base'>
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </p>

        {/* Group Profiles */}
        <div className='flex items-center gap-3'>
          <img
            src={assets.group_profiles}
            alt='group'
            className='w-10 h-10 rounded-full'
          />
          <p className='text-sm'>Trusted by thousands of happy patients</p>
        </div>

        {/* Batoon */}
        <a
          href='#'
          className='bg-white text-primary px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-100 mt-5 md:mt-7'
        >
          Book Appointment
          <img src={assets.arrow_icon} alt='arrow' className='w-4' />
        </a>
      </div>

      {/* Qaybta Midig */}
      <div className='md:w-1/2 relative mt-10 md:mt-0'>
        <img
          src={assets.header_img}
          alt='doctor'
          className='absolute md:top-0 md:right-0 w-[280px] h-[200px]'
        />
      </div>
    </div>
  );
};

export default Header;
