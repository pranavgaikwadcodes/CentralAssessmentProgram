import React from 'react';
import { NavLink } from 'react-router-dom';

const InitialSelectPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-8 font-inter">CENTRAL ASSESSMENT PROGRAM</h1>
      <div className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-lg p-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <NavLink to="adminlogin">
            <div className="bg-blue-500 text-white p-10 rounded-md text-center font-inter text-xl font-semibold hover:bg-blue-600 transition duration-300 ease-in-out">
                CAP ADMIN
            </div>
          </NavLink>

          <NavLink to="CollegePortal/dashboard">
            <div className="bg-teal-500 text-white p-10 rounded-md text-center font-inter text-xl font-semibold hover:bg-teal-600 transition duration-300 ease-in-out">
                COLLEGE PORTAL
            </div>
          </NavLink>

          <NavLink to="CollegePortal/dashboard">
            <div className="bg-orange-400 text-white p-10 rounded-md text-center font-inter text-xl font-semibold hover:bg-orange-500 transition duration-300 ease-in-out">
                DEPARTMENT PORTAL
            </div>
          </NavLink>

          <NavLink>
            <div className="bg-yellow-500 text-white p-10 rounded-md text-center font-inter text-xl font-semibold hover:bg-yellow-600 transition duration-300 ease-in-out">
                EXAMINER PORTAL
            </div>
          </NavLink>

        </div>
      </div>
    </div>
  );
};

export default InitialSelectPage;
