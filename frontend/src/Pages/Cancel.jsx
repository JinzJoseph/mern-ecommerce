import React from 'react';
import { Link } from 'react-router-dom';
import { FcCancel } from "react-icons/fc";

const Cancel = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <div className="text-center">
          <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
            <FcCancel />
          </svg>
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold">Payment cancelled!</h3>
          <p className="text-gray-600 my-2">Your payment process was cancelled.</p>
          <p>Feel free to try again or contact support if you need assistance.</p>
          <div className="py-10 text-center">
            <Link to={"/"} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
              GO BACK 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
