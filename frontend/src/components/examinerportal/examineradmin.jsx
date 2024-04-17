import React from 'react';
// import SideBar, { SideBarItem } from '../../sidebar/sidebar';
import SideBar, { SideBarItem } from '../sidebar/sidebar';
import { Route, Routes } from 'react-router-dom';

import ExaminerDashboard from './dashboard';
import ProfilePage from './profile';
import IssueCardPage from './issueCard';


// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';


const ExaminerAdmin = () => {
    return (
        <div className='grid grid-cols-3 gap-0 min-h-screen'>
            <div className='fixed h-full'>
                <SideBar>
                    <SideBarItem  
                        icon={<DashboardIcon />}
                        text="Dashboard"
                        alert
                        to="../ExaminerPortal/dashboard"
                    />
                    <SideBarItem 
                        icon={<PersonIcon />}
                        text="Profile"
                        alert
                        to="../ExaminerPortal/profile"
                    />
                    <SideBarItem 
                        icon={<AssignmentIndIcon />}
                        text="Card"
                        alert
                        to="../ExaminerPortal/issueCard"
                    />
                    <SideBarItem 
                        icon={<AccountBalanceWalletIcon />}
                        text="Payments"
                        alert
                        to="../ExaminerPortal/payment"
                    />
                    <SideBarItem 
                        icon={<LogoutIcon />}
                        text="Logout"
                        alert
                        to="../examinerlogin"
                    />
                </SideBar>
            </div>
            
            <div className='col-span-3 overflow-auto pl-96'>
                <Routes>
                    <Route path="/dashboard" element={<ExaminerDashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/issueCard" element={<IssueCardPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default ExaminerAdmin;
