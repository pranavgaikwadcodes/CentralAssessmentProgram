import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <>
      <div className='m-10 mr-20 content flex flex-col'>

        <div className="header flex justify-between items-center">
          <span className={`font-inter font-semibold text-4xl mr-96`}>Examiner / Moderator Dashboard</span>

        </div>

        <div className="body flex flex-col">

          <div className="grid grid-cols-5 gap-1 mt-32 ">
            <div className=" col-span-1 total-college-registered-card card font-inter m-2 p-5
          bg-white drop-shadow-2xl cursor-pointer flex flex-col justify-between h-36">
              <div className="heading text-xl	font-normal	">Bundles Examined</div>
              <div className="value font-semibold text-4xl text-text-blue pt-1.5">10</div>
            </div>

            <div className="col-span-1 total-college-registered-card card font-inter m-2 p-5
          bg-white drop-shadow-2xl cursor-pointer flex flex-col justify-between">
              <div className="heading text-xl	font-normal	">Bundles Moderated</div>
              <div className="value font-semibold text-4xl text-text-blue pt-1.5">4</div>
            </div>

            <div className="col-span-1 total-college-registered-card card font-inter m-2 p-5
          bg-white drop-shadow-2xl cursor-pointer flex flex-col justify-between">
              <div className="heading text-xl	font-normal	">Total Bundle</div>
              <div className="value font-semibold text-4xl text-text-blue pt-1.5">--</div>
            </div>
          </div>
        </div>

      </div>
      <Outlet />
    </>
  );
};

export default DashboardPage;
