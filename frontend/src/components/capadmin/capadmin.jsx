import React from 'react';
import SideBar, { SideBarItem } from '../sidebar/sidebar';
import Dashboard from './dashboard';
import AddCollege from './addCollege';
import Settings from './settings'; // Import the Settings component
import { Outlet, Route, Routes } from 'react-router-dom';
import ErrorPage from '../../404'; // Ensure correct path to your ErrorPage component

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import TuneIcon from '@mui/icons-material/Tune';
import DomainAddIcon from '@mui/icons-material/DomainAdd';

const CAPadminPage = () => {
  return (
    <div className='grid grid-rows-3 grid-flow-col'>
      <div className='flex row-span-3'>
        <SideBar>
          <SideBarItem  
            icon={<DashboardIcon />}
            text="Dashboard"
            alert
            to="../CAPADMIN/dashboard"
          />
          <SideBarItem 
            icon={<DomainAddIcon />}
            text="AddCollege"
            alert
            to="../CAPADMIN/addCollege"
          />
          <SideBarItem 
            icon={<TuneIcon />}
            text="Settings"
            alert
            to="../CAPADMIN/settings"
          />
        </SideBar>
      </div>
        
      <div className='page row-span-3 col-span-3'>

        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addCollege" element={<AddCollege />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default CAPadminPage;
