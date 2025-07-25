import React from 'react';
import { Link } from 'react-router-dom';

const SuccessfulPayment = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-green-100 via-white to-blue-100 px-2">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-6 border border-gray-100 max-w-md w-full">
        <div className="flex flex-col items-center">
          <svg className="w-20 h-20 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="#d1fae5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12.5l3 3 5-5" stroke="#22c55e" strokeWidth="2.5" fill="none" />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-green-600 text-center mb-1">Payment Successful!</h1>
          <p className="text-gray-700 text-center text-base sm:text-lg">Thank you for your purchase. Your order has been placed successfully.</p>
        </div>
        <Link to="/" className="mt-2 w-full bg-gradient-to-r from-green-400 via-green-500 to-blue-500 text-white py-2 rounded-xl font-bold shadow-lg text-center hover:scale-105 transition-all duration-200">Go to Home</Link>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
