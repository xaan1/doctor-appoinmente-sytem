import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContex';

import axios from 'axios';
const Profile = () => {
  const { backEndUrl, token, setToken, userData, setUserData } = useContext(AppContext);

  console.log(token , "token");

  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);






  const updateProfile = async () => {
 

    try {


      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      if (image) formData.append('image', image);

      // const { data } = await axios.post(`${backEndUrl}/api/user/update`, formData, {
      //   headers : {
      //     "Authorization" : `Bearer ${token}`
      // }

      // });

      const {data} = await axios.post(`${backEndUrl}/api/user/update`, formData, {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
console.log(data , "data in update profile")

    } catch (error) {
      console.log(error);
    }
  };







  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm mb-10'>
      {edit ? (
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer '>
            <img
              src={image ? URL.createObjectURL(image) : userData.image || assets.default_image}
              className='w-36 rounded'
              alt="Profile"
            />
            {!image && <img src={assets.upload_icon} className='w-36 rounded' alt="Upload Icon" />}
          </div>
          <input id='image' type='file' onChange={(e) => setImage(e.target.files[0])} hidden />
        </label>
      ) : (
        <img src={userData.image || assets.default_image} className='w-36 rounded' alt="Profile" />
      )}

      {edit ? (
        <input
          className='bg-gray-50 text-3xl max-w-60 font-medium mt-4'
          value={userData.name || ''}
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          type='text'
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-800'>{userData.name || 'N/A'}</p>
      )}

      <hr className='bg-zinc-400 h-[1px] rounded' />

      <div>
        <p className='text-neutral-500 mt-1'>Contact information</p>
        <div className='grid grid-cols-1 sm:grid-cols-2'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email || 'N/A'}</p>
          <p className='font-medium'>Phone:</p>
          {edit ? (
            <input
              className='bg-gray-50 text-3xl max-w-60 font-medium mt-4'
              value={userData.phone || ''}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              type='text'
            />
          ) : (
            <p className='text-1xl'>{userData.phone || 'N/A'}</p>
          )}
          <p className='font-semibold text-1xl'>Address:</p>
          {edit ? (
            <p>
              <input
                className='bg-gray-50 text-3xl max-w-60 font-medium mt-4'
                value={userData.address?.line || ''}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line: e.target.value },
                  }))
                }
                type='text'
              />
              <br />
              <input
                className='bg-gray-50 text-3xl max-w-60 font-medium mt-4'
                value={userData.address?.line2 || ''}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type='text'
              />
            </p>
          ) : (
            <p>
              LineAddress 1: {userData.address?.line || 'N/A'}
              <br />
              LineAddress 2: {userData.address?.line2 || 'N/A'}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className='flex gap-x-2 mt-10 mb-1'>
        {edit ? (
          <button    className='border border-primary px-4 rounded-full text-2xl' onClick={updateProfile}>
            Save Information
          </button>
        ) : (
          <button className='border border-primary px-4 rounded-full text-2xl' onClick={() => setEdit(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
