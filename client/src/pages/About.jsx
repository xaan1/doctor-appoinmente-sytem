
import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 md:px-20 mb-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">ABOUT US</h2>

        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <img
            src={assets.about_image}
            alt="Doctors"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div className="text-left md:w-1/2 space-y-4">
            <p>
              Welcome to Prosperity, Your Trusted Partner in Managing Your Healthcare Needs Conveniently And Efficiently.
              We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
            <p>
              Prosperity is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest innovations to improve your experience and deliver superior service.
              Whether you're booking your first appointment or managing ongoing care, Prosperity is here to support you every step of the way.
            </p>
            <h3 className="font-semibold text-gray-700">Our Vision</h3>
            <p>
              Our vision at Prosperity is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}


      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">WHY CHOOSE US</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h4 className="text-lg font-semibold text-gray-700">EFFICIENCY</h4>
            <p>Simplified Appointment Scheduling and Timely Reminders.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h4 className="text-lg font-semibold text-gray-700">CONVENIENCE</h4>
            <p>Access To Thousands Of Trusted Healthcare Providers.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h4 className="text-lg font-semibold text-gray-700">PERSONALIZATION</h4>
            <p>Tailored Recommendations and Reminders Based On Your Health Needs.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About