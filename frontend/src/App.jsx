import './App.css';
import { BrowserRouter } from 'react-router-dom';


import { Route, Routes } from 'react-router-dom';

// CAP ADMIN PAGES
import CAPadminPage from './components/capadmin/capadmin';
import DashboardPage from './components/capadmin/dashboard';
import AddCollege from './components/capadmin/addCollege';
import SettingsPage from './components/capadmin/settings';
import LoginPage from './components/capadmin/login';

// College Portal Pages
import CollegPortalPage from './components/collegeportal/admin/collegeadmin';
import CollegePortalDashboard from './components/collegeportal/admin/collegeadmin';
import CollegePortalSettingsPage from './components/collegeportal/admin/settings';
import CollegePortalProfileSettingsPage from './components/collegeportal/admin/profileSettings';
import CollegePortalDepartmentPage from './components/collegeportal/admin/department';
import CollegePortalAddDepartmentPage from './components/collegeportal/admin/addDepartment';

import ErrorPage from './404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <div>LOGIN PAGE</div> } />
        
        {/* CAP ADMIN ROUTES */}
        <Route path='/adminlogin' element={ <LoginPage/> } />
        <Route path='CAPADMIN' element={ <CAPadminPage/> } >
          <Route path='dashboard' element={ <DashboardPage/> } />
          <Route path='addCollege' element={ <AddCollege/> } />
          <Route path='settings' element={ <SettingsPage/> } />
        </Route>   
        
        {/* COLLEGE PORTAL ROUTES */}
        <Route path='CollegePortal' element={ <CollegPortalPage/> } >
          <Route path='dashboard' element={ <CollegePortalDashboard/> } />
          <Route path='deptManagement' element={ <AddCollege/> } />
          <Route path='billing' element={ <SettingsPage/> } />
          <Route path='settings' element={ <CollegePortalSettingsPage/> } />
          <Route path='profileSettings' element={ <CollegePortalProfileSettingsPage/> } />
          <Route path='department' element={ <CollegePortalDepartmentPage/> } />
          <Route path='addDepartment' element={ <CollegePortalAddDepartmentPage/> } />
        </Route>

        {/* EXAMINER PORTAL ROUTES */}

        {/* ERROR ROUTE */}
        <Route path='*' element={ <ErrorPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;