import React from 'react';
import SideBar, { SideBarItem } from '../sidebar/sidebar';
import Dashboard from './dashboard';
import AddCollege from './addCollege';
import Settings from './settings';
import LoginPage from './login';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../../404'; // Ensure correct path to your ErrorPage component

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import TuneIcon from '@mui/icons-material/Tune';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import LogoutIcon from '@mui/icons-material/Logout';

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
          <SideBarItem 
            icon={<LogoutIcon />}
            text="Logout"
            alert
            to="../"
          />
        </SideBar>
      </div>
        
      <div className='page row-span-3 col-span-3'>

        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addCollege" element={<AddCollege />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default CAPadminPage;
