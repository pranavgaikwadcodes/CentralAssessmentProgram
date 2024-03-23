import React from 'react';
import SideBar, { SideBarItem } from '../../sidebar/sidebar';
import { Route, Routes } from 'react-router-dom';

import CollegePortalDashboard from './dashboard';
import SubjectsPage from './subjects';


// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import TuneIcon from '@mui/icons-material/Tune';
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AddSubjectPage from './addSubject';

const CollegeAdmin = () => {
    return (
        <div className='grid grid-cols-3 gap-0 min-h-screen'>
            <div className='fixed h-full'>
                <SideBar>
                    <SideBarItem  
                        icon={<DashboardIcon />}
                        text="Dashboard"
                        alert
                        to="../DepartmentPortal/dashboard"
                    />
                    <SideBarItem 
                        icon={<GroupsIcon />}
                        text="Teachers"
                        alert
                        to="../DepartmentPortal/teachers"
                    />
                    <SideBarItem 
                        icon={<LibraryBooksIcon />}
                        text="Subjects"
                        alert
                        to="../DepartmentPortal/subjects"
                    />
                    <SideBarItem 
                        icon={<AutoAwesomeMotionIcon />}
                        text="Bundles"
                        alert
                        to="../DepartmentPortal/bundles"
                    />
                    <SideBarItem 
                        icon={<TuneIcon />}
                        text="Settings"
                        alert
                        to="../DepartmentPortal/settings"
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
                    <Route path="/subjects" element={<SubjectsPage />} />                    
                    <Route path="/addSubject" element={<AddSubjectPage />} />                    
                </Routes>
            </div>
        </div>
    );
}

export default CollegeAdmin;
