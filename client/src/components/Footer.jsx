import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-5 mb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600">
        {/* Logo iyo Qeybta Description */}
        <div>
          <div className="flex items-center space-x-2">
            <img
              src={assets.logo}
              alt="Prescripto"
              className="w-20 h-20"
            />
            <h2 className="text-xl font-semibold">Prescripto</h2>
          </div>
          <p className="mt-4 text-sm">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Qeybta Links-ka */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-start">Company</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-800">Home</a></li>
            <li><a href="/" className="hover:text-gray-800">About us</a></li>
            <li><a href="/" className="hover:text-gray-800">Contact us</a></li>
            <li><a href="/" className="hover:text-gray-800">Privacy policy</a></li>
          </ul>
        </div>

        {/* Qeybta Contact Information */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
          <p>
            090 7605589
          </p>
          <p className="mt-2">xaaan@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
