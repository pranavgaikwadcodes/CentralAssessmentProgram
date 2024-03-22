import React from 'react';
import SideBar, { SideBarItem } from '../../sidebar/sidebar';
import { Route, Routes } from 'react-router-dom';
import './collegeportal.css';

import ErrorPage from '../../../404';
import CollegePortalDashboard from './dashboard';
import SettingsPage from './settings';
import ProfileSettingsPage from './profileSettings';
import DepartmentPage from './department';
import AddDepartmentPage from './addDepartment';

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import TuneIcon from '@mui/icons-material/Tune';

const CollegeAdmin = () => {
    return (
        <div className='grid grid-cols-3 gap-0 min-h-screen'>
            <div className='fixed h-full'>
                <SideBar>
                    <SideBarItem  
                        icon={<DashboardIcon />}
                        text="Dashboard"
                        alert
                        to="../CollegePortal/dashboard"
                    />
                    <SideBarItem 
                        icon={<BusinessIcon />}
                        text="Department Management"
                        alert
                        to="../CollegePortal/department"
                    />
                    <SideBarItem 
                        icon={<AccountBalanceWalletIcon />}
                        text="Billing System"
                        alert
                        to="../CollegePortal/billing"
                    />
                    <SideBarItem 
                        icon={<TuneIcon />}
                        text="Settings"
                        alert
                        to="../CollegePortal/settings"
                    />
                    <SideBarItem 
                        icon={<LogoutIcon />}
                        text="Logout"
                        alert
                        to="../"
                    />
                </SideBar>
            </div>
            
            <div className='col-span-3 overflow-auto pl-96'>
                <Routes>
                    <Route path="/dashboard" element={<CollegePortalDashboard />} />
                    <Route path="/department" element={<DepartmentPage />} />
                    <Route path="/addDepartment" element={<AddDepartmentPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/profileSettings" element={<ProfileSettingsPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default CollegeAdmin;
