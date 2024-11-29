
import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mb-10">
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-md">
      <h2 className="text-center text-2xl font-semibold mb-6">Contact Us</h2>
      <div className="flex flex-col items-center">
        <img
          src={assets.contact_image}
          alt="Office"
          className="w-full h-auto mb-4 rounded-lg"
        />
        <div className="text-center">
          <h3 className="text-lg font-medium">Our Office</h3>
          <p>1234  Xalwo kismaayo</p>
          <p>Basso , Somalia</p>
          <p>Tel: 252 090 7605589</p>
          <p>Email: xaan087@gmail.com</p>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-lg font-medium">Careers at Prescripto</h3>
          <p>Learn more about our teams and job openings.</p>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md text-center">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Contact