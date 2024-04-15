import React from 'react'
import { NavLink } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';

const BundlesPage = () => {
  return (
    <div className='m-10 mr-20 content flex flex-col'>

      <div className="header flex justify-between items-center">
        <span className={`font-inter font-semibold text-4xl mr-96`}>BUNDLES MANAGEMENT</span>
        
        <NavLink to="../addBundle">
          <button className={`bg-button-blue rounded-md pl-3 pr-3 pt-2 pb-2 text-white font-inter font-semibold flex items-center hover:bg-button-blue-hover`}>
            <AddIcon sx={{ fontSize: 18 }} />
            <span className="ml-2">Add Bundle</span>
          </button>
        </NavLink>
      </div>
      
      <div className="body">
        <div className="total-college-registered-card card font-inter m-2 p-5
         bg-white drop-shadow-2xl w-44 mt-32 cursor-pointer">
            <div className="heading text-xl	font-normal	">Total Bundles</div>
            <div className="value font-semibold text-4xl text-text-blue pt-1.5">35</div>
        </div>
      </div>

    </div>
  );
}

export default BundlesPage