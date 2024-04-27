import React from 'react';
import SideBar, { SideBarItem } from '../sidebar/sidebar';
import Dashboard from './dashboard';
import AddCollege from './addCollege';
import Settings from './settings';
import LoginPage from './login';
import { Route, Routes, Navigate  } from 'react-router-dom';
import ErrorPage from '../../404'; // Ensure correct path to your ErrorPage component

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import TuneIcon from '@mui/icons-material/Tune';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import LogoutIcon from '@mui/icons-material/Logout';

const CAPadminPage = () => {
  const handleLogout = () => {
    // Perform logout actions, e.g., clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("adminID");
    <Navigate to="../" />
  };

  return (
    <div className='grid grid-cols-3 gap-0 min-h-screen'>
      <div className='fixed h-full'>
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
            onClick={handleLogout}
          />
        </SideBar>
      </div>
        
      <div className='col-span-3 overflow-auto pl-96'>

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
