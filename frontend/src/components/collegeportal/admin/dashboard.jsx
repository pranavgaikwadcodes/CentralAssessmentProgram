import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <>
    <div className='m-10 mr-20 content flex flex-col'>

      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>College Admin Dashboard</span>
        
      </div>
      
      <div className="body flex flex-col">
        
        <div className="grid grid-cols-5 gap-1 mt-32 ">
          <div className=" col-span-1 total-college-registered-card card font-inter m-2 p-5
          bg-white drop-shadow-2xl cursor-pointer flex flex-col justify-between h-36">
              <div className="heading text-xl	font-normal	">Total Bundles</div>
              <div className="value font-semibold text-4xl text-text-blue pt-1.5">45</div>
          </div>

          <div className="col-span-1 total-college-registered-card card font-inter m-2 p-5
          bg-white drop-shadow-2xl cursor-pointer flex flex-col justify-between">
              <div className="heading text-xl	font-normal	">Total Departments</div>
              <div className="value font-semibold text-4xl text-text-blue pt-1.5">10</div>
          </div>
          <div className="col-span-1 total-college-registered-card card font-inter m-2 p-5
          bg-white drop-shadow-2xl cursor-pointer flex flex-col justify-between">
              <div className="heading text-xl	font-normal	">Bundle Status</div>
              <div className="value font-semibold text-4xl text-text-blue pt-1.5">--</div>
          </div>

          <div className="col-span-2 total-college-registered-card card font-inter m-2 p-5
          bg-white drop-shadow-2xl w-96 cursor-pointer flex flex-col justify-between ">
              <div className="heading text-xl	font-normal	">Total Teachers and HOD’s</div>
              <div className="value font-semibold text-4xl text-text-blue pt-1.5">12</div>
          </div>
        </div>

        <div className="grid grid-rows-2 grid-flow-col grid-cols-4 gap-1 mt-4">

          <div className="row-span-2 col-span-1 total-college-registered-card card font-inter m-2 p-5
          bg-white drop-shadow-2xl cursor-pointer flex flex-col justify-between ">
              <div className="heading text-xl	font-normal	">Total Students in each year</div>
              <div className="value font-semibold text-4xl text-text-blue pt-1.5 ">
                <h1><span>FE</span> : <span>70</span></h1>
                <h1><span>SE</span> : <span>80</span></h1>
                <h1><span>TE</span> : <span>80</span></h1>
                <h1><span>BE</span> : <span>80</span></h1>
              </div>
          </div>
          
          <div className="col-span-1 total-college-registered-card card font-inter m-2 p-5
          bg-white drop-shadow-2xl cursor-pointer flex flex-col justify-between">
              <div className="heading text-xl	font-normal	">Total Bills Created</div>
              <div className="value font-semibold text-4xl text-text-blue pt-1.5">--</div>
          </div>
        </div>
        
      </div>

    </div>
    <Outlet/>
    </>
  );
};

export default DashboardPage;
